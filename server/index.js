require("dotenv").config()
require('../server/config/db')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

      // Routes
const indexRoute = require('./routes/api'),
      authRoute = require('./routes/api/auth'),
      productRoute = require('./routes/api/product'),
      storeRoute = require('./routes/api/store'),
      wishlistRoute = require('./routes/api/wishlist'),
      orderRoute = require('./routes/api/order'),
      categoryRoute = require('./routes/api/category'),
      postRoute = require('./routes/api/post'),
      reviewRoute = require('./routes/api/review')

      // Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './view')))

if(process.env.NODE_ENV === 'development') {
    app.use(cors())
}

// Routes
app.use('/api', indexRoute)
app.use('/api', authRoute)
app.use('/api', productRoute)
app.use('/api', storeRoute)
app.use('/api', wishlistRoute)
app.use('/api', orderRoute)
app.use('/api', categoryRoute)
app.use('/api', postRoute)
app.use('/api', reviewRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})