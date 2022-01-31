import express from 'express'
import { Regist } from '../MongooseModels/regist'
import { logger } from '../logger'
import { Error } from 'mongoose'

const router = express.Router()

router.get('/', (req, res) => {
  logger.info('Hey')
  res.send('Test')
})

/**
 * Save a new regist to the DB
 */
router.post('/form', (req, res) => {
  // Example logger to view things. If parameter is a json object must convert to string
  logger.silly('Body ' + JSON.stringify(req.body))

  // TODO: must confirm required
  // if (!req.body.vaseId) {
  //   logger.warn('Received request without vaseId')
  //   res.status(400).send({ error: 'Missing vaseId' })
  // }

  const regist = new Regist({
    vaseId: req.body.vaseId,
    country: req.body.country,
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

/**
 * Route responsible for getting all the regists in the DB
 */
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

/**
 * Route responsible for getting regists according to a filter
 * TODO: Define how the filters will be
 */
router.get('/filter', (req, res) => {
  // TODO: Must add filters
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
