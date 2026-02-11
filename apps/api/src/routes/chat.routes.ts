import { Router } from 'express'
import { populateChatMessages } from '../controllers/chat.controller'

const chatRoutes: Router = Router()

chatRoutes.post('/populate', populateChatMessages)

export { chatRoutes }
