export interface RequestDetails {
  method: string;
  url: string;
  ip_address?: string;
  user_agent?: string;
  code?: number;
}

export type LogType = 'INFO' | 'DEBUG' | 'ERROR';

export type LoggerFunction = {
  (type: LogType, message: string): void;
  (type: LogType, message: string, details: RequestDetails): void;
};
