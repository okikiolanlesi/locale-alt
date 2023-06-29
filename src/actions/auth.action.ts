import IResponse from "@interfaces/action-response.interface";
import { randomUUID } from "crypto";
import User from "..//models/user.model";

class AuthAction {
  signUp = async (body: any): Promise<IResponse> => {
    try {
      body.apiKey = randomUUID();
      const user = await User.create(body);
      return {
        data: {
          message:
            "User registered successfully, Please note that you can only view your api key this one time, so please endeavor to keep it safe and private ",
          code: 201,
          data: user,
        },
      };
    } catch (err) {
      return { err };
    }
  };
}
export default AuthAction;
