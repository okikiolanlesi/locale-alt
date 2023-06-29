import Region from "../models/region.model";
import IResponse from "../interfaces/action-response.interface";
import ApiFeatures from "../services/features.service";
import AppError from "../utils/AppError";

class RegionAction {
  index = async (params: any): Promise<IResponse> => {
    try {
      const features = new ApiFeatures(Region.find(), params)
        .filter()
        .limitFields()
        .sort();

      const regions = await features.query;

      return {
        data: {
          message: "Regions fetched successfully",
          code: 200,
          data: regions,
        },
      };
    } catch (err) {
      return { err };
    }
  };

  show = async (id: string): Promise<IResponse> => {
    try {
      const lga = await Region.findById(id).populate({
        path: "states",
        select: "name slug -region",
      });

      if (!lga) {
        throw new AppError("Region not found", 400);
      }

      return {
        data: {
          message: "Region fetched successfully",
          code: 200,
          data: lga,
        },
      };
    } catch (err) {
      return { err };
    }
  };
}
export default RegionAction;
