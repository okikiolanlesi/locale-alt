import IResponse from "@interfaces/action-response.interface";

class AuthAction {
  signUp = async (body: any): Promise<IResponse> => {
    try {
      return { data: { message: "success" } };
    } catch (err) {
      return { err };
    }
  };
}
export default AuthAction;
