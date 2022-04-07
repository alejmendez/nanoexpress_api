import { Paginated } from "@core/paginate";
import { Person } from "../entities/person.entity";
import PersonResponse from "./PersonResponse.dto";

export default class PersonListResponse extends Paginated<PersonResponse> {
  constructor(paginated: Paginated<Person>) {
    super();
    const data = paginated as any;
    this.data = data.data.map((user: any) => new PersonResponse(user));
    this.meta = data.meta;
    this.links = data.links;
  }
}
