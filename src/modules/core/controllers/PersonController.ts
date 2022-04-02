import { IHttpRequest, IHttpResponse } from "nanoexpress";

import { __ } from "@core/i18n";
import { RequestToPaginateQuery } from "@core/paginate/RequestToPaginateQuery";

import PersonService from "../services/person.service";
import PersonResponse from "../dto/PersonResponse.dto";
import PersonRequest from "../dto/PersonRequest.dto";

const personService = new PersonService();
const findAll = async (req: IHttpRequest, res: IHttpResponse) => {
  const query = RequestToPaginateQuery(req);
  const persons = await personService.findAll(query);
  persons.data = persons.data.map((person: any) => new PersonResponse(person));
  return res.json(persons);
};

const findOne = async (req: IHttpRequest, res: IHttpResponse) => {
  const { id }: any = req.params;
  const person = await personService.findOne(id);
  return res.json(new PersonResponse(person));
};

const create = async (req: IHttpRequest, res: IHttpResponse) => {
  const personRequest = new PersonRequest(req.body);
  const person = await personService.create(personRequest);
  return res.status(201).json(new PersonResponse(person));
};

const update = async (req: IHttpRequest, res: IHttpResponse) => {
  const { id }: any = req.params;
  const personRequest = new PersonRequest(req.body);
  await personService.update(id, personRequest);
  return res.json({ message: __("person.person_updated_successfully") });
};

const remove = async (req: IHttpRequest, res: IHttpResponse) => {
  const { id }: any = req.params;
  await personService.findOne(id);
  await personService.remove(id);
  return res.json({ message: __("person.person_deleted_with_success") });
};

export { findAll, findOne, create, update, remove };
