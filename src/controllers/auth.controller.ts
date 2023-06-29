import catchAsync from "../utils/catchAsync";
import AuthAction from "../actions/auth.action";
import { NextFunction, Request, Response } from "express";
import AuthValidator from "@validators/auth.validator";
import { extend } from "joi";
import BaseController from "./base.controller";

class AuthController extends BaseController {
  protected auth: AuthAction;
  protected validator: AuthValidator;
  constructor() {
    super();
    this.auth = new AuthAction();
    this.validator = new AuthValidator();
  }

  signUp = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const validation = await this.validator.validateRegister(req.body);
      if (validation.error) {
        console.log(validation.error);
      }

      const { err, data } = await this.auth.signUp(validation.data);

      if (err) {
        return next(err);
      }

      if (data) {
        return this.successResponse(res, data);
      }
    }
  );
}
