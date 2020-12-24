require('dotenv').config()
const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const app = express()
const fs = require('fs')
const jwt = require('jsonwebtoken')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const users = [
    {username:"username1",
    password:"password1234"}
]

app.get('/login',(req,res)=>{
    const data = req.body
    const user = users.find(u=>u.username === req.body.userName && u.password === req.body.password)
    if (user){
        console.log(`(line 19) login data: `)
        console.log("Date",Date.now())
        var privateKey = fs.readFileSync('../keys/private.key');
        // >>>>>>> https://www.npmjs.com/package/jsonwebtoken <<<<<<< here!!!!!
        // const token = jwt.sign({username:req.body.userName,TTL:Date.now()+(2*60*1000)},process.env.PRIV_KEY, {algorithm: "RS256"})
        var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
        res.status(200).send(token.toString())
    }
    else{   
        res.status(401).send("Username or Password are invalid or missing")
    }
})

const port = 4000
app.listen(port, ()=>{
    console.log(`running on port ${port}`)
})