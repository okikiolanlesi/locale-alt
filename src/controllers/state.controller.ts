import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import BaseController from "./base.controller";
import StateAction from "../actions/state.action";

class StateController extends BaseController {
  protected state: StateAction;
  constructor() {
    super();
    this.state = new StateAction();
  }

  getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { err, data } = await this.state.index(req.query);

      if (err) {
        return next(err);
      }

      if (data) {
        return this.successResponse(res, data);
      }
    }
  );

  getOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { err, data } = await this.state.show(req.params.id);

      if (err) {
        return next(err);
      }

      if (data) {
        return this.successResponse(res, data);
      }
    }
  );
}

export default new StateController();
