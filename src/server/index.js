var path = require('path')
const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Adding the  GET route
app.get('/all', function (req, res) {
    res.send(projectData);
})
// Adding the POST route
app.post('/add', function (req, res) {
    dataEntry = {
        score_tag: req.body.score_tag,
        agreement: req.body.agreement,
        subjectivity: req.body.subjectivity,
        confidence: req.body.confidence,
        irony: req.body.irony
    }
    projectData = dataEntry;
    res.send(projectData);
})
