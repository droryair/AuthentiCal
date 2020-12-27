# Auth-Project

a simple back-end authentication project, using JWT.  
this is a calculator, that only autheniticated users can use.  

________________________________________________________________
:computer:The Technologies I used in this project:  
<kbd>
<img src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/256/full/nodejslogo.png" alt="Node JS Logo"  height="50">
</kbd>
 <kbd>
<img src="https://www.vitoshacademy.com/wp-content/uploads/2015/04/JS.png" alt="JS Logo"  height="50">
</kbd>
 <kbd>
<img src="https://buttercms.com/static/images/tech_banners/ExpressJS.png" alt="Express Logo"  height="50">
</kbd>
 <kbd>
<img src="https://jwt.io/img/logo-asset.svg" alt="JWT Logo"  height="50">
</kbd>


_________________________________________________________________
:arrow_forward: how to run:  

- start the three servers in different terminals: user-server, auth-server, calc-server.  
- send two requests to the user-server:  
 1. GET request to: http://localhost:3000/login , with body (JSON).
   - the body needs to include: "userName" ,  "password". 
     - userName: "username1".  
     - password: "password1234". 
   - the app will check if the user exists, and if so- will print your token.  
  - copy the token you received.  
  
    
 2. GET request to: http://localhost:3000/calc , with headers and body (JSON).
   - the headers needs to include: "token".  
     - token: paste from the previous sesponse.  
   - the body needs to include:"number1" , "number2" , "action".  
     - number1, number2: any numbers you want to calculate.    
     - action (optional): "add" / "sub" / "mult" / "div".  default:"add".  
   - the app wil check your token, and the existance of at least "number1" and "number2" , and will print the result.  
________________________________________________________________

## Examples using Postman:

### First request:  
<kbd>  
<img src="https://github.com/droryair/Auth-Project/blob/master/assets/firstRequest.PNG" alt="First Request Example" height="400">   
</kbd>  
  
    
### Second request:    
#### Headers:  
<kbd>  
<img src="https://github.com/droryair/Auth-Project/blob/master/assets/SecondeRequest-Headers.PNG" alt="Second Request-Headers Example" height="300"> 
 </kbd>    
   
 #### Body:  
<kbd>  
<img src="https://github.com/droryair/Auth-Project/blob/master/assets/secondRequest-Body.PNG" alt="Second Request-Body Example" height="400">  
</kbd>

________________________________________________________________

### files in "keys" folder:  
-private.key  
-public.key  

________________________________________________________________

- :memo: to do:  
 - [ ] timeout for tokens
 - [ ] front-end
 
