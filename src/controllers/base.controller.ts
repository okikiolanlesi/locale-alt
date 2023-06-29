import { IData } from "@interfaces/action-response.interface";
import { Response } from "express";

class BaseController {
  successResponse(res: Response, dataToSend: IData) {
    interface IPayload extends IData {
      status: string;
    }

    const payload: IPayload = {
      status: "success",
    };

    Object.keys(dataToSend).forEach((key) => {
      payload[key] = dataToSend[key];
    });

    return res.status(payload.code || 200).json(payload);
  }
}

export default BaseController;
