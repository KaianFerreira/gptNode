import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'

// routes import
import chat from './routes/chat'
// import book from './book/routes'
// import bookStatus from './book-status/routes'

// when node_env equalts test then load .env.test
if (String(process.env.NODE_ENV).trim() === 'test') {
	dotenv.config({ path: '.env.test' })
} else dotenv.config()

console.info('Starting server...')

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded  

// CORS
app.use(cors())

const router = express.Router()

router.get('/version', async (req, res) => {
	try {
		return res.send({ version: '1.0.0'})
	} catch (error) {
		error.component = `${req.method} /api${req.originalUrl}`
		res.status(400).send({ error: 'Internal error' })
	}
})

router.use('/chat', chat)
// router.use('/book', book)
// router.use('/book-status', bookStatus)

app.use('/data', express.static(path.join(process.cwd(), process.env.FOLDER_DATA)))
app.use('/', router)

export default app