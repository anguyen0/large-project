import { LoggerFunction, LogType, RequestDetails } from '../types/loggerTypes';
import fs from 'fs';
import path from 'path';

const LOG_DIRECTORY = 'logs';
const LOG_FILE = 'app.log';
const LOG_FILE_PATH = path.join(LOG_DIRECTORY, LOG_FILE);

// Ensure logs directory exists, create it if not
if (!fs.existsSync(LOG_DIRECTORY)) {
  fs.mkdirSync(LOG_DIRECTORY);
}

// Ensure log file exists, create it if not
if (!fs.existsSync(LOG_FILE_PATH)) {
  fs.writeFileSync(LOG_FILE_PATH, '');
}

const logger: LoggerFunction = (
  type: LogType,
  message: string,
  details?: RequestDetails,
  logToConsole: boolean = false
) => {
  // Create timestamp for log
  const timestamp = new Date().toISOString();

  // Create the message to log
  let logMessage = `${timestamp}: [${type}] ${message}`;

  // If the user supplied more details add them to the log
  if (details) {
    logMessage += ` -- METHOD: ${details.method} -- URL: ${details.url}`;

    if (details.ip_address)
      logMessage += ` -- IP ADDRESS: ${details.ip_address}`;
    if (details.user_agent)
      logMessage += ` -- USER AGENT: ${details.user_agent}`;
    if (details.code) logMessage += ` -- CODE: ${details.code}`;
  }

  // Log message to log file
  fs.appendFileSync(LOG_FILE_PATH, logMessage + '\n');

  // Log to console if requested
  if (logToConsole) {
    console.log(logMessage);
  }
};

export default logger;
