import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.port || 3333

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    })
})

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`)
})

export default app
