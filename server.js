import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js';
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(morgan('dev'))

app.use(express.json())


app.use('/uploads', uploadRoutes)


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
    res.send("API is running!")
})

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

// Listening to server
app.listen(PORT, () => console.log(`Server is running on: http://localhost:${PORT}`));