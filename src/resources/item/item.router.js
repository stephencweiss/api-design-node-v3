import { Router } from 'express'
import controllers from './item.controllers'

const router = Router()

router
  .route('/')
  .get(controllers.mockController)
  .post(controllers.mockController)

router
  .route('/:id')
  .get(controllers.mockController)
  .put(controllers.mockController)
  .delete(controllers.mockController)

export default router
