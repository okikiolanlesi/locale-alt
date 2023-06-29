import IResponse from "@interfaces/action-response.interface";
import LocalGovernmentArea from "../models/local-government-area.model";
import ApiFeatures from "../services/features.service";
import AppError from "../utils/AppError";

class LocalGovernmentAreaAction {
  index = async (params: any): Promise<IResponse> => {
    try {
      const features = new ApiFeatures(LocalGovernmentArea.find(), params)
        .filter()
        .limitFields()
        .sort();

      const lgas = await features.query;

      return {
        data: {
          message: "Local government areas fetched successfully",
          code: 200,
          data: lgas,
        },
      };
    } catch (err) {
      return { err };
    }
  };

  show = async (id: string): Promise<IResponse> => {
    try {
      const lga = await LocalGovernmentArea.findById(id);

      if (!lga) {
        throw new AppError("Local government area not found", 400);
      }

      return {
        data: {
          message: "Local government area fetched successfully",
          code: 200,
          data: lga,
        },
      };
    } catch (err) {
      return { err };
    }
  };
}
export default LocalGovernmentAreaAction;
