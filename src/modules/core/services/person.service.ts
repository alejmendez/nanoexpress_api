import { getRepository } from "typeorm";
import { paginate, PaginateQuery } from "@core/paginate";

import { Person } from "../entities/person.entity";
import PersonRequest from "../dto/PersonRequest.dto";
import PersonNotFound from "../exceptions/PersonNotFound";

export default class PersonService {
  protected repository: any;

  constructor() {
    this.repository = getRepository(Person);
  }

  public async findAll(query: PaginateQuery) {
    return paginate(query, this.repository, {
      sortableColumns: [
        "dni",
        "first_name",
        "last_name",
        "avatar",
        "birthday",
        "room_telephone",
        "mobile_phone",
        "website",
        "languages",
        "email",
        "nationality",
        "gender",
        "civil_status",
        "contact_options",
        "address",
        "address2",
        "postcode",
        "city",
        "state",
        "country",
        "number_children",
        "observation",
        "about",
        "blood_type",
      ],
      searchableColumns: [
        "id",
        "dni",
        "first_name",
        "last_name",
        "avatar",
        "birthday",
        "room_telephone",
        "mobile_phone",
        "website",
        "languages",
        "email",
        "nationality",
        "gender",
        "civil_status",
        "contact_options",
        "address",
        "address2",
        "postcode",
        "city",
        "state",
        "country",
        "number_children",
        "observation",
        "about",
        "blood_type",
      ],
      defaultSortBy: [["id", "DESC"]],
      filterableColumns: {},
    });
  }

  public async findOne(id: string) {
    const person = await this.repository.findOne(id);
    if (!person) {
      throw new PersonNotFound();
    }
    return person;
  }

  public async create(data: PersonRequest) {
    const person = await this.repository.create(data);
    return this.repository.save(person);
  }

  public async update(id: string, data: PersonRequest) {
    let person = await this.findOne(id);
    person = this.repository.merge(person, data);
    return this.repository.save(person);
  }

  public async remove(id: string) {
    await this.findOne(id);
    await this.repository.softDelete(id);
    return true;
  }
}
