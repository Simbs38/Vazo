import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()

const app = express()

const options : cors.CorsOptions = {
  origin: ['http://localhost:8080']
}

app.set('port', process.env.PORT || 3000)
app.use(cors(options))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/api/form', (req, res) => {
  res.json({
    text: 'Hello World'
  })
})

app.listen(app.get('port'), () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('Press CTRL-C to stop\n')
})

export default app
