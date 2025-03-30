import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import userRouter from './routes/userRoute'
import loginRouter from './routes/loginRoute'
import equalityCheckRouter from './routes/equalityCheck'
import historicCheckRouter from './routes/historicRouter'
import { authenticateToken } from './middlewares/authenticateToken'
import swaggerDocs from './config/swaggerConfig'

dotenv.config()

const app = express()
const PORT = process.env.port || 3333

app.use(cors())
app.use(express.json())

app.use('/api', userRouter)
app.use('/api', loginRouter)
app.use('/api', authenticateToken, equalityCheckRouter)
app.use('/api', authenticateToken, historicCheckRouter)

app.get('/health', (req, res) => {
	res.status(200).json({
		status: 'healthy',
		timestamp: new Date().toISOString(),
	})
})

swaggerDocs(app)

app.listen(PORT, () => {
	console.log(`🚀 Servidor rodando na porta ${PORT}`)
})

export default app
