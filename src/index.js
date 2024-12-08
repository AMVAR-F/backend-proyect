import express from 'express'
import { PORT } from './config.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/use.routes.js';
import tournamentRoutes from './routes/tournament.routes.js'
import teamRoutes from './routes/team.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser)
app.use('/api',userRoutes)
app.use('/api',teamRoutes)
app.use('/api', tournamentRoutes)
app.use('/api',authRoutes)

app.listen(PORT, () => {
  console.log('server running on port', PORT)
})
