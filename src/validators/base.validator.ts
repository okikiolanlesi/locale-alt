export default class BaseValidator {
  mapErrors(err: any) {
    const details = err.details;
    let errorResponse: any[] = [];
    details.forEach((error) => {
      errorResponse.push({
        field: error.path[0],
        error: error.message.replaceAll('"', ""),
      });
    });
    return errorResponse;
  }
}
