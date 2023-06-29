import IResponse from "../interfaces/action-response.interface";
import ApiFeatures from "../services/features.service";
import State from "../models/state.model";
import AppError from "../utils/AppError";

class StateAction {
  index = async (params: any): Promise<IResponse> => {
    try {
      const features = new ApiFeatures(State.find(), params)
        .filter()
        .limitFields()
        .sort();

      const states = await features.query;

      return {
        data: {
          message: "States fetched successfully",
          code: 200,
          data: states,
        },
      };
    } catch (err) {
      return { err };
    }
  };

  show = async (id: string): Promise<IResponse> => {
    try {
      const lga = await State.findById(id).populate({
        path: "LocalGovernmentAreas",
        select: "name slug -state",
      });

      if (!lga) {
        throw new AppError("State not found", 400);
      }

      return {
        data: {
          message: "State fetched successfully",
          code: 200,
          data: lga,
        },
      };
    } catch (err) {
      return { err };
    }
  };
}
export default StateAction;
