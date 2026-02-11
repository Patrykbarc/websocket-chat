import { Request, Response } from 'express'

import { getDB } from '../config/db.config'
import { sampleMessages } from './constants/sample-messages'

export const populateChatMessages = async (req: Request, res: Response) => {
  try {
    await getDB().collection('messages').insertMany(sampleMessages)

    res.status(200).json({ message: 'Chat messages populated successfully' })
  } catch (error) {
    console.error('Error populating chat messages:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
