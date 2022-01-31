import express from 'express'
import { Regist } from '../MongooseModels/regist'
import { logger } from '../logger'
import { Error } from 'mongoose'

const router = express.Router()

router.get('/', (req, res) => {
  logger.info('Hey')
  
  res.send('Test')
})

router.post('/form', (req, res) => {
  console.log(req.body)

  // if (!req.body.vaseId) {
  //   res.status(400).send({ error: 'Missing vaseId' })
  // }

  const regist = new Regist({
    vaseId: req.body.vaseId,
    country: req.body.coutry,
    city: req.body.city,
    text: req.body.text
  })

  regist.save()
    .then(() => logger.info('Created reg'))
    .catch((error : Error) => {
      logger.error(`${error.name} - ${error.message}`)
      res.status(500).send('Error saving regist')
    })
})

router.get('/all', (req, res) => {
  Regist.find({}, (error, found) => {
    if (!error) {
      res.json(found)
      return
    }
    logger.error(error)
    res.status(500).send('An error occured')
  })
})

export { router }
