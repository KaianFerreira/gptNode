import express from 'express'
import Joi from 'joi'
import { searchGPTGoogleSearch } from './model'


const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const schema = Joi.object().keys({
      message: Joi.string().required()
    })

    const { value, error } = schema.validate(req.body)
    if (error) {
      console.log(error)
      return res.status(400).json({
        code: 400,
        error: 'validation error',
        fields: ['message']
      })
    }
    console.info('POST /chat')
    
    const result = await searchGPTGoogleSearch(value.message)
    return res.status(200).json(result)

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }
})

export default router