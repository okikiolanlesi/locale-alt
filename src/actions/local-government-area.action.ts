import IResponse from "@interfaces/action-response.interface";
import LocalGovernmentArea from "../models/local-government-area.model";
import ApiFeatures from "../services/features.service";

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
}
export default LocalGovernmentAreaAction;
