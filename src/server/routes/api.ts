import express from 'express'
import { Regist } from '../MongooseModels/regist'
import { logger } from '../logger'
import { Error } from 'mongoose'

const router = express.Router()

router.get('/', (_, res) => {
  logger.info('Hey')
  res.send('Test')
})

/**
 * Save a new regist to the DB
 */
router.post('/form', (req, res) => {
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

  res.status(200).send('Created register')
})

/**
 * Route responsible for getting all the regists in the DB
 */
router.get('/all', (_, res) => {
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
 * Route responsible for getting regists by a given filter
 * If wrong filtertype is given an error is returned
 */
router.get('/filter/:filterType/:filterValue', (req, res) => {
  // Get schema properties
  const RegistProperties = Regist.schema.paths

  // Confirm that filtertype is a property of Regist
  if (!(req.params.filterType in RegistProperties)) {
    logger.warn('Wrong filtertype \'' + req.params.filterType + '\'')
    res.status(400).send('Wrong filtertype')
    return
  }
  // TODO: must confirm type
  const queryParam : Record<string, unknown> = {}
  queryParam[req.params.filterType] = req.params.filterValue

  // Search for the given filters
  Regist.find(queryParam, (error, found) => {
    if (!error) {
      res.json(found)
      return
    }
    logger.error(error)
    res.status(500).send('An error occured')
  })
})

export { router }
