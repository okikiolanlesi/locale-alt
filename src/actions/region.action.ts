import Region from "../models/region.model";
import IResponse from "../interfaces/action-response.interface";
import ApiFeatures from "../services/features.service";

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
}
export default RegionAction;
