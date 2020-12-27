require('dotenv').config()
const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())



app.get(`/calc`, async (req, res) => {
  const token = req.headers.token

  if (token) {
    console.log(`(line 20) token: ${token}`)
    if(req.body.number1 === undefined || req.body.number2 === undefined  ){ 
      // 'action' has default of 'add'. see calc-server, lines 34-49. 
      // token error: line 47.
      res.status(401).send("one of the data items is not found, or is misspeld")
    }else{
      console.log(req.body)
    }
    
    const headers = {
      token: token
    }
    const data = {
      number1:req.body.number1, 
      number2: req.body.number2,
      action: req.body.action
            // token: token
    }
    axios({
      method: 'post',
      url: `http://localhost:4001/calc`,  //calc-server
      data: data,
      headers: headers
    })
      .then(function (response) {
        console.log(response.data);
        res.status(200).send((response.data).toString());
      })
      .catch(function (error) {
        console.log("there's an error: ", error.response.data);
        res.status(401).send(error.response.data)
      });
  } else {
    res.status(401).send("Token not found")
  }
})




app.get(`/login`, async (req,res)=>{
// const logIn = async () => {
  let token
  // const loginData = {
  //   userName: "username1",
  //   password: "password1234",
  // }
  const loginData = {
    userName: req.body.userName,
    password: req.body.password,
  }
  try {
    await axios({
      method: 'get',
      url: `http://localhost:4000/login`, //auth-server
      data: loginData
    })
      .then(function (response) {
        token = response.data
        res.status(200).send(`Welcome, ${req.body.userName}. Your token is: ${token}`)
      })
      .catch(function (error) {
        console.log(`(line 41) error: ${error}`)
        res.sendStatus(400)
      })
  } catch (error) {
    console.log(`(line 45) error: ${error}`)
  }

  return token
// }
})



// app.post(`/login`, async (req,res)=>{
//   const loginData = {
//     userName: req.body.username,
//     password: req.body.password
//   }
// })









const port = 3000
app.listen(port, function () {
  console.log(`running on port ${port}`)
})