import app from './app'
import { PORT } from './config/port'


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})