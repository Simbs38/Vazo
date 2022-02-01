import { createLogger, transports, format } from 'winston'

const consoleFormat = format.combine(
  format.timestamp({
    format: 'YY-MM-DD HH:MM:SS'
  }),
  format.printf((info) => {
    return `${info.timestamp} - [${info.level.toUpperCase().padEnd(5)}] - ${info.message}`
  }),
  format.colorize({
    all: true
  })
)

const fileFormat = format.combine(
  format.timestamp({
    format: 'YY-MM-DD HH:MM:SS'
  }),
  format.printf((info) => {
    return `${info.timestamp} - [${info.level.toUpperCase().padEnd(5)}] - ${info.message}`
  })
)

const logger = createLogger({
  transports: [
    new transports.Console({ level: 'silly', format: consoleFormat }),
    new transports.File({ filename: 'src/server/log/server.log ', level: 'warn', format: fileFormat })
  ]
})

export { logger }
