import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()
const port = process.env.PORT || 3000

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// custom middleware
const log = (req, res, next) => {
  console.log('logging')
  next() // next _with_ an argument is treated like an error
}

router.get('/', (req, res) => {
  res.send({ data: 'root router' })
})

app.use('api', router)
app.get('/data', [log, log], (req, res) => {
  res.send({ data: [1, 2, 3, 4] })
})

app.post('/data', (req, res) => {
  res.sendStatus(200)
})

export const start = () => {
  app.listen(port, () => {
    console.log(`server running @${port}`)
  })
}
