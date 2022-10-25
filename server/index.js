require("dotenv").config()
require('../server/config/db')
const express = require('express')
const http = require('http');
const app = express()
const server = http.createServer(app)
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const socketio = require('socket.io')
const io = socketio(server)
const swaggerDocs = require("./routes/utils/swagger");

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
      chatRoute = require('./routes/api/chat')
      paymentRoute = require('./routes/api/payment')

      // Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

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
app.use('/api', chatRoute)
app.use('/api', paymentRoute)

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
    swaggerDocs(app);
})

module.exports = {
    io
}