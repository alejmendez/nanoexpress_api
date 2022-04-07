import { IHttpRequest, IHttpResponse } from "nanoexpress";
import { __ } from "@core/i18n";

export default (_req: IHttpRequest, res: IHttpResponse): IHttpResponse => {
  return res.status(404).json({
    message: __("entity_not_found"),
  });
};
