import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import { router as apiRouter } from './routes/api'
import { logger } from './logger'

dotenv.config()
const app = express()

const options : cors.CorsOptions = {
  origin: ['http://localhost:8080']
}

app.set('port', process.env.PORT || 3000)
app.use(cors(options))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Configure routers
app.use('/api', apiRouter)

// Configure mongo connection
mongoose.connect('mongodb+srv://test:root@cluster0.ocuei.mongodb.net/Vaso?retryWrites=true&w=majority')

app.listen(app.get('port'), () => {
  logger.info(
    `App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`
  )
  logger.info('Press CTRL-C to stop')
})

export default app
