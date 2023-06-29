export interface IData {
  code?: number;
  message?: string;
  data?: any;
  metadata?: any;
}

export default interface IResponse {
  err?: any;
  data?: IData;
}
