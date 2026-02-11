import { Router } from 'express'
import { chatRoutes } from './chat.routes'

export const router: Router = Router()

router.use('/api/chat', chatRoutes)
