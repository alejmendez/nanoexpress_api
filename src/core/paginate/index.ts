import {
  Repository,
  FindConditions,
  SelectQueryBuilder,
  ObjectLiteral,
  FindOperator,
  ILike,
  Brackets,
  Equal,
  MoreThan,
  MoreThanOrEqual,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Not,
  Between,
} from "typeorm";
import { values, mapKeys } from "lodash";
import { stringify } from "querystring";
import ServiceUnavailableException from "../../exceptions/ServiceUnavailableException";

type Column<T> = Extract<keyof T, string>;
type Order<T> = [Column<T>, "ASC" | "DESC"];
type SortBy<T> = Order<T>[];

export interface PaginateQuery {
  page?: number;
  limit?: number;
  sortBy?: [string, string][];
  searchBy?: string[];
  search?: string;
  filter?: { [column: string]: string | string[] };
  path: string;
}

export class Paginated<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: SortBy<T>;
    searchBy: Column<T>[];
    search: string;
    filter?: { [column: string]: string | string[] };
  };
  links: {
    first?: string;
    previous?: string;
    current: string;
    next?: string;
    last?: string;
  };
}

export interface PaginateConfig<T> {
  sortableColumns: Column<T>[];
  searchableColumns?: Column<T>[];
  maxLimit?: number;
  defaultSortBy?: SortBy<T>;
  defaultLimit?: number;
  where?: FindConditions<T> | FindConditions<T>[];
  filterableColumns?: { [key in Column<T>]?: FilterOperator[] };
}

export enum FilterOperator {
  EQ = "$eq",
  GT = "$gt",
  GTE = "$gte",
  IN = "$in",
  NULL = "$null",
  LT = "$lt",
  LTE = "$lte",
  BTW = "$btw",
  NOT = "$not",
}

export const OperatorSymbolToFunction = new Map<
  FilterOperator,
  (...args: any[]) => FindOperator<string>
>([
  [FilterOperator.EQ, Equal],
  [FilterOperator.GT, MoreThan],
  [FilterOperator.GTE, MoreThanOrEqual],
  [FilterOperator.IN, In],
  [FilterOperator.NULL, IsNull],
  [FilterOperator.LT, LessThan],
  [FilterOperator.LTE, LessThanOrEqual],
  [FilterOperator.BTW, Between],
  [FilterOperator.NOT, Not],
]);

export function isOperator(value: unknown): value is FilterOperator {
  return values(FilterOperator).includes(value as any);
}

export function getFilterTokens(raw: string): (string | null)[] {
  const tokens = [];
  const matches = raw.match(/(\$\w+):/g);

  if (matches) {
    const value = raw.replace(matches.join(""), "");
    tokens.push(
      ...matches.map((token): string => token.substring(0, token.length - 1)),
      value
    );
  } else {
    tokens.push(raw);
  }

  if (tokens.length === 0 || tokens.length > 3) {
    return [];
  } else if (tokens.length === 2) {
    if (tokens[1] !== FilterOperator.NULL) {
      tokens.unshift(null);
    }
  } else if (tokens.length === 1) {
    if (tokens[0] === FilterOperator.NULL) {
      tokens.unshift(null);
    } else {
      tokens.unshift(null, FilterOperator.EQ);
    }
  }

  return tokens;
}

/*
export interface PaginateQuery {
  page?: number;
  limit?: number;
  sortBy?: [string, string][];
  searchBy?: string[];
  search?: string;
  filter?: { [column: string]: string | string[] };
  path: string;
}
*/

function parseFilter<T>(query: PaginateQuery, config: PaginateConfig<T>) {
  const filter: { [columnName: string]: FindOperator<string> } = {};
  if (!query.filter) {
    return filter;
  }
  const filterableColumns: any = config.filterableColumns || {};

  for (const column of Object.keys(query.filter)) {
    if (!(column in filterableColumns)) {
      continue;
    }
    const allowedOperators = filterableColumns[column];
    const input = query.filter[column];
    const statements = !Array.isArray(input) ? [input] : input;
    for (const raw of statements) {
      const tokens = getFilterTokens(raw);
      if (tokens.length === 0) {
        continue;
      }
      let [op2, op1, value] = tokens;
      value = value || "";

      if (!isOperator(op1) || !allowedOperators.includes(op1)) {
        continue;
      }
      if (isOperator(op2) && !allowedOperators.includes(op2)) {
        continue;
      }

      if (isOperator(op1)) {
        const fn = OperatorSymbolToFunction.get(op1);
        if (fn) {
          switch (op1) {
            case FilterOperator.BTW:
              filter[column] = fn(...value.split(","));
              break;
            case FilterOperator.IN:
              filter[column] = fn(value.split(","));
              break;
            default:
              filter[column] = fn(value);
              break;
          }
        }
      }
      if (isOperator(op2)) {
        const fn = OperatorSymbolToFunction.get(op2);
        if (fn) {
          filter[column] = fn(filter[column]);
        }
      }
    }
  }
  return filter;
}

export async function paginate<T>(
  query: PaginateQuery,
  repo: Repository<T> | SelectQueryBuilder<T>,
  config: PaginateConfig<T>
): Promise<Paginated<T>> {
  let page = query.page || 1;
  const limit = Math.min(
    query.limit || config.defaultLimit || 20,
    config.maxLimit || 100
  );
  const sortBy = [] as SortBy<T>;
  const searchBy: Column<T>[] = [];
  const path = query.path;

  function isEntityKey(
    entityColumns: Column<T>[],
    column: string
  ): column is Column<T> {
    return !!entityColumns.find((c) => c === column);
  }

  if (config.sortableColumns.length < 1)
    throw new ServiceUnavailableException();

  if (query.sortBy) {
    for (const order of query.sortBy) {
      if (
        isEntityKey(config.sortableColumns, order[0]) &&
        ["ASC", "DESC"].includes(order[1])
      ) {
        sortBy.push(order as Order<T>);
      }
    }
  }

  if (!sortBy.length) {
    sortBy.push(
      ...(config.defaultSortBy || [[config.sortableColumns[0], "ASC"]])
    );
  }

  if (config.searchableColumns) {
    if (query.searchBy) {
      for (const column of query.searchBy) {
        if (isEntityKey(config.searchableColumns, column)) {
          searchBy.push(column);
        }
      }
    } else {
      searchBy.push(...config.searchableColumns);
    }
  }

  if (page < 1) page = 1;

  let [items, totalItems]: [T[], number] = [[], 0];

  let queryBuilder: SelectQueryBuilder<T>;

  if (repo instanceof Repository) {
    queryBuilder = repo
      .createQueryBuilder("e")
      .take(limit)
      .skip((page - 1) * limit);

    for (const order of sortBy) {
      queryBuilder.addOrderBy("e." + order[0], order[1]);
    }
  } else {
    queryBuilder = repo.take(limit).skip((page - 1) * limit);

    for (const order of sortBy) {
      queryBuilder.addOrderBy(repo.alias + "." + order[0], order[1]);
    }
  }

  if (config.where) {
    const where: any = config.where || {};
    queryBuilder.andWhere(new Brackets((qb) => qb.andWhere(where)));
  }

  if (!query.search) {
    query.search = "";
  }

  if (searchBy.length) {
    const search: ObjectLiteral[] = [];
    for (const column of searchBy) {
      search.push({ [column]: ILike(`%${query.search}%`) });
    }
    queryBuilder.andWhere(new Brackets((qb) => qb.andWhere(search)));
  }

  if (query.filter) {
    const filter = parseFilter(query, config);
    queryBuilder.andWhere(new Brackets((qb) => qb.andWhere(filter)));
  }

  [items, totalItems] = await queryBuilder.getManyAndCount();

  let totalPages = totalItems / limit;
  if (totalItems % limit) totalPages = Math.ceil(totalPages);

  const sortByQuery = sortBy
    .map((order) => `&sortBy=${order.join(":")}`)
    .join("");
  const searchQuery = query.search ? `&search=${query.search}` : "";

  const searchByQuery =
    query.searchBy && searchBy.length
      ? searchBy.map((column) => `&searchBy=${column}`).join("")
      : "";

  const filterQuery = query.filter
    ? "&" +
      stringify(
        mapKeys(query.filter, (_param, name) => "filter." + name),
        "&",
        "=",
        { encodeURIComponent: (str) => str }
      )
    : "";

  const options = `&limit=${limit}${sortByQuery}${searchQuery}${searchByQuery}${filterQuery}`;

  const buildLink = (p: number): string => path + "?page=" + p + options;

  const results: Paginated<T> = {
    data: items,
    meta: {
      itemsPerPage: limit,
      totalItems,
      currentPage: page,
      totalPages: totalPages,
      sortBy,
      search: query.search,
      searchBy: query.search ? searchBy : [],
      filter: query.filter,
    },
    links: {
      first: page == 1 ? undefined : buildLink(1),
      previous: page - 1 < 1 ? undefined : buildLink(page - 1),
      current: buildLink(page),
      next: page + 1 > totalPages ? undefined : buildLink(page + 1),
      last:
        page == totalPages || !totalItems ? undefined : buildLink(totalPages),
    },
  };

  return Object.assign(new Paginated<T>(), results);
}
