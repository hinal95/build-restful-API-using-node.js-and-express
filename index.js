const express = require('express')
const app = express();


let user = [
    
       { id: "1", firstname:"hinal", lastname:"nagar",hobby:"cooking"},
       { id: "2", firstname:"bob", lastname:"jain",hobby:"dancing"},
       { id: "3", firstname:"karthik", lastname:"nagar",hobby:"gamer"}
        
    
]

// middleware to parse json

app.use(express.json());

//validation middleware

function ValidateUser(req,res,next){
  const {firstname,lastname,hobby} = req.body;
  if( !firstname || !lastname || !hobby){
    return res.status(400).json({message:"data is not found"})
  }
  next();
}

// retrieve data
app.get('/user',(req,res)=>{
    res.send(user)
})

app.get('/user/:id',(req,res)=>{
    const id = req.params.id;
    const users = user.find(u=>u.id === id);
    if(!users){
        return res.status(401).json({message:"user not found"})
    }
    res.status(200).json(users)
})


// add user using post
app.post('/user',(req,res)=>{
    const {firstname,lastname,hobby} = req.body;
    const newUser ={
        id: Math.random()*10,
        firstname:firstname,
        lastname:lastname,
        hobby:hobby,
    }
    user.push(newUser)
    res.send(user);
})

// update user using put
app.put('/user/:id',(req,res)=>{
    const id = req.params.id;
    const userId = user.find(u=>u.id === id);
    if(!userId){
        return res.status(402).json({message:"no user with same id exist"})
    }
    const keys = Object.keys(req.body);
    keys.forEach((key)=>{
        userId[key] =req.body[key]
    })
    res.send(userId)
})

// delete user using delete
app.delete('/user/:id',(req,res)=>{
    const id  = req.params.id;
    const users = user.find((users)=>users.id == id);
    if(!users){
        return res.status(404).json({message:"user not found"});
    }
    const filterUser = user.filter((users)=>users.id != id );
    res.send(filterUser);
})

// start server 
const PORT = 8000;
app.listen(PORT,()=>{
    console.log(`server is running ${PORT} `)
})