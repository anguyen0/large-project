export default interface ErrorResponse {
  timestamp: number;
  message: string;
  code: number;
  fields: string[];
}
