require('dotenv').config()
const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const { json } = require('body-parser')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
global.atob = require("atob");
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


// app.post('/add',(req,res)=>{
//     const data = req.body
//     // console.log(`${data.password} @@@ ${process.env.ACCESS_TOKEN_SECRET}`)
//     if(data.password === process.env.ACCESS_TOKEN_SECRET ){

//         const result = data.number1+data.number2
//         res.status(200).send(result.toString());
//     }else{
//         const result=`You don't have the right permissions`
//         res.status(403).send(result.toString());
//     }
// })

// app.post('/sub',(req,res)=>{
//     console.log("entering /sub route")
//     const data = req.body
//     const token = data.token
//     const jwtSignature = token.split('.')[2]
//     console.log("im hererr")

//     // const signaturIsValid = verifyFunction.verify(process.env.PUB_KEY,jwtSignature,'base64')
//     // const signaturIsValid = jwt.verify(token,process.env.PUB_KEY)
//     jwt.verify(token, process.env.PUB_KEY + '.', { algorithms: ['RS256'] }, function (err, payload) {
//         if(err){
//             console.log(err)
//         }else{
//             console.log(payload)
//         }
//         // if token alg != RS256,  err == invalid signature
//     });
//     const decodedJWT = parseJwt(token)
//     console.log("decoded JWT: ", decodedJWT)
//     const result = data.number1-data.number2
//     console.log("blahblah")
//     res.status(200).send(result.toString());
// })

// app.post('/mult',(req,res)=>{
//     const data = req.body
//     console.log(`${data.password} @@@ ${process.env.ACCESS_TOKEN_SECRET}`)
//     if(data.password === process.env.ACCESS_TOKEN_SECRET ){

//         console.log(req.body)
//         const result = data.number1*data.number2
//         res.status(200).send(result.toString());
//     }else{
//         const result=`You don't have the right permissions`
//         res.status(403).send(result.toString());
//     }
// })

// app.post('/div',(req,res)=>{
//     const data = req.body
//     console.log(`${data.password} @@@ ${process.env.ACCESS_TOKEN_SECRET}`)
//     if(data.password === process.env.ACCESS_TOKEN_SECRET ){
//         console.log(req.body)
//         const result = data.number1/data.number2
//         res.status(200).send(result.toString());
//     }else{
//         const result=`You don't have the right permissions`
//         res.status(403).send(result.toString());
//     }
// })


app.post('/calc', (req, res) => {
    console.log("entering /sub route")
    const data = req.body
    const token = data.token
    const action = data.action
    const jwtSignature = token.split('.')[2]
    console.log("im hererr")

    // const signaturIsValid = verifyFunction.verify(process.env.PUB_KEY,jwtSignature,'base64')
    // const signaturIsValid = jwt.verify(token,process.env.PUB_KEY)
    jwt.verify(token, process.env.PUB_KEY + '.', { algorithms: ['RS256'] }, function (err, payload) {
        if (err) {
            console.log(err)
        } else {
            console.log(payload)
        }
        // if token alg != RS256,  err == invalid signature
    });
    const decodedJWT = parseJwt(token)
    console.log("decoded JWT: ", decodedJWT)

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
        default:
        // code block
    }
    res.status(200).send(result.toString());
})


const port = 4001
app.listen(port, () => {
    console.log(`running on port ${port}`)
})