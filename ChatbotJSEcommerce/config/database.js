const mongoose=require('mongoose');


const connectDB=()=>{
    mongoose.connect("",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((e)=>{
        console.log(e)
    })
}

module.exports=connectDB;