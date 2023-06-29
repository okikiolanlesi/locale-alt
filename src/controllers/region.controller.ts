import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import BaseController from "./base.controller";
import RegionAction from "../actions/region.action";

class RegionController extends BaseController {
  protected region: RegionAction;
  constructor() {
    super();
    this.region = new RegionAction();
  }

  getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { err, data } = await this.region.index(req.query);

      if (err) {
        return next(err);
      }

      if (data) {
        return this.successResponse(res, data);
      }
    }
  );
}

export default new RegionController();
