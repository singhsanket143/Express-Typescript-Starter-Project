import winston from "winston";
import { MongoDB } from "winston-mongodb";
("winston-mongodb");
import { getCorrelationId } from "../utils/helpers/request.helpers";
import DailyRotateFile from "winston-daily-rotate-file";
import { serverConfig } from ".";

const mongoFormat = winston.format.combine(
	winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
	winston.format(({ level, message, timestamp, ...data }) => {
		// as observed , everything other than info.level and info.message will be put under metadata field
		const transformedInfo = {
			level,
			message,
			timestamp,
			correlationId: getCorrelationId(),
			data,
		};
		return transformedInfo;
	})(),
	winston.format.json()
);

const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss"  }), // how the timestamp should be formatted
		winston.format.json(), // Format the log message as JSON
        // define a cutom print
		winston.format.printf( ({  level, message, timestamp, ...data }) => {
            const output = { 
                level,
                message, 
                timestamp, 
                correlationId: getCorrelationId(), 
                data 
            };
            return JSON.stringify(output);
        })
	),
	transports: [
		new winston.transports.Console(),
		new DailyRotateFile({
			filename: "logs/%DATE%-app.log", // The file name pattern
			datePattern: "YYYY-MM-DD", // The date format
			maxSize: "20m", // The maximum size of the log file
			maxFiles: "14d", // The maximum number of log files to keep
		}),
		new MongoDB({
			db: serverConfig.MONGO_URI,
			collection: "logs",
			format: mongoFormat,
		}),
	],
});

export default logger;
