require('dotenv').config();
const express = require ('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet')
const rateLimit =require('express-rate-limit')
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const createServer = require('./socket')


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('combined'));
}


app.use(rateLimit({
    windowMs: 1000 * 60 * 1,
    max: 1000,
    message: {message: 'too many requests'}
}))


app.use(cors())
app.use(helmet())
app.use(express.json())


app.use('/auth',(req,res,next)=>{
    console.log("auth route test")
})

const server = createServer(app)



const port = process.env.PORT || 7000;
  server.listen(port, () => {
    console.log("Server is running on port ",port);
  });
   




