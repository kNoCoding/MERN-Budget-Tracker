require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected!')
    }).catch(err => {
        console.error('MongoDB connection error:', err)
        process.exit()
    });

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})