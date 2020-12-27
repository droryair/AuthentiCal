require('dotenv').config()
const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const { json } = require('body-parser')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
global.atob = require("atob");
const fs = require('fs')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const verifyFunction = crypto.createVerify('RSA-SHA256')


function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};


app.post('/calc', (req, res) => {
    const data = req.body
    const token = req.headers.token
    const action = data.action
    
    let result
    switch (action) {
        case 'add':
            result = data.number1 + data.number2
            break;
        case 'sub':
            result = data.number1 - data.number2
            break;
        case 'mult':
            result = data.number1 * data.number2
            break;
        case 'div':
            result = data.number1 / data.number2
            break;
        default:
            result = data.number1 + data.number2
    }
    const PUB_KEY = fs.readFileSync('../keys/public.key');
    jwt.verify(token, PUB_KEY, { algorithms: ['RS256'] }, function (err, payload) {
        // if token alg != RS256,  err == invalid signature
        if (err) {
            console.log(err)
            res.status(403).send("token is not verified")
        } else {
            console.log(payload)
            res.status(200).send(`You have been verified. the result of your calculation is: \n ${result.toString()}`);
        }
    });
    const decodedJWT = parseJwt(token)
    console.log("decoded JWT: ", decodedJWT)
})


const port = 4001
app.listen(port, () => {
    console.log(`running on port ${port}`)
})