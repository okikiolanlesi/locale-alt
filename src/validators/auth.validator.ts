import * as Joi from "joi";
import BaseValidator from "./base.validator";

export default class AuthValidator extends BaseValidator {
  async validateRegister(req) {
    const schema = Joi.object({
      email: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    });
    const { error, value } = schema.validate(req);
    if (error) {
      console.log(error);
      return {
        error: this.mapErrors(error),
        data: null,
      };
    }
    return {
      error: null,
      data: value,
    };
  }
}
