require('dotenv').config()
const express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const users = [
    {username:"username1",
    password:"password1234"}
]

app.get('/login',(req,res)=>{
    const data = req.body
    const user = users.find(u=>u.username === data.userName && u.password === data.password)
    if (user){
        const privateKey = fs.readFileSync('../keys/private.key');
        // >>>>>>> https://www.npmjs.com/package/jsonwebtoken <<<<<<< here!!!!!
        const token = jwt.sign({ some: 'info' }, privateKey, { algorithm: 'RS256'});
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