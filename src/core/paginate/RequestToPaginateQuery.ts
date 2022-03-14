import { IHttpRequest } from "nanoexpress";
import { PaginateQuery } from ".";

export const RequestToPaginateQuery = (req: IHttpRequest): PaginateQuery => {
  const body: any = req.body;
  const query: PaginateQuery = {
    page: body.page || 1,
    limit: body.limit || 10,
    sortBy: body.sortBy || [],
    searchBy: body.searchBy || [],
    search: body.search || "",
    path: req.path,
  };

  return query;
}

