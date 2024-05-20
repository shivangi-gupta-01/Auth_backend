const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://1234shivangigupta:V0dk0Y59R0PMiQ6O@cluster0.qfqhvzy.mongodb.net/").then(()=>{
    console.log("connection to MongoDB successfull")
}).catch((e)=>{
    console.log(`error is ${e}`)
})


//password: V0dk0Y59R0PMiQ6O