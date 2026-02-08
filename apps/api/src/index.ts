import { connectDB } from './config/db.config.js'
import { createServer } from './server.js'

const port = process.env.PORT || 5001

async function start() {
  try {
    await connectDB()
    const server = createServer()
    server.listen(port, () => {
      console.log(`api running on ${port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

start()
