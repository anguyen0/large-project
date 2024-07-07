export interface RequestDetails {
  method: string;
  url: string;
  ip_address?: string;
  user_agent?: string;
  code?: number;
}

export type LogType = 'INFO' | 'DEBUG' | 'ERROR';

// Updated LoggerFunction type
export type LoggerFunction = {
  (
    type: LogType,
    message: string,
    details?: RequestDetails,
    logToConsole?: boolean
  ): void;
};
