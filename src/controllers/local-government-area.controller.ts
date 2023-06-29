import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import BaseController from "./base.controller";
import LocalGovernmentAreaAction from "../actions/local-government-area.action";

class LocalGovernmentAreaController extends BaseController {
  protected lga: LocalGovernmentAreaAction;
  constructor() {
    super();
    this.lga = new LocalGovernmentAreaAction();
  }

  getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { err, data } = await this.lga.index(req.query);

      if (err) {
        return next(err);
      }

      if (data) {
        return this.successResponse(res, data);
      }
    }
  );
}

export default new LocalGovernmentAreaController();
