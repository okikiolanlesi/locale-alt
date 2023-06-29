import IResponse from "../interfaces/action-response.interface";
import ApiFeatures from "../services/features.service";
import State from "../models/state.model";

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
}
export default StateAction;
