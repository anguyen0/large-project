export default interface ErrorResponse {
  timestamp: number;
  message: string;
  code: number;
  fields: {
    [key: string]: string[];
  };
}
