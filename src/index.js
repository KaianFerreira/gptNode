import app from './app.js'
import http from 'http'
import dotenv from 'dotenv'


if (String(process.env.NODE_ENV).trim() === 'test') {
	dotenv.config({ path: '.env.test' })
} else{
  dotenv.config()
  console.log('here first')
} 


const server = http.createServer(app)
const port = process.argv[2] ? process.argv[2] : process.env.PORT
server.listen(port, () => console.info(`Server listening on port ${port}`))