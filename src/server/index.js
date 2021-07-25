var path = require('path')
const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

console.log(__dirname)


let baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key='
let lang = '&lang=en&url='
  

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

// Adding the POST route

app.post('/add', async (req, res) => {
    const key = process.env.API_KEY;
    const result = await fetch(baseURL + key + lang + req.body)
    try {
        const data = await result.json();
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log("Error: ", error);
    }
})