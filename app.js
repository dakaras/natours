const express = require('express')
const { get } = require('https')
const morgan = require('morgan')
const tourRouter  = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json()) //middleware allows you to add body in request
app.use(express.static(`${__dirname}/public`))

app.use((req,res, next) => {
    console.log('hello from middleware')
    next()
})

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString()
    next()
})

// app.get(`/api/v1/tours`, getAllTours)
// app.post(`/api/v1/tours`, createTour)
// app.get(`/api/v1/tours/:id`, getTour)
// app.patch(`/api/v1/tours/:id`, updateTour)
// app.delete(`/api/v1/tours/:id`, deleteTour)

app.use('/api/v1/tours', tourRouter)
app.use(`/api/v1/users`, userRouter)

module.exports = app