const mongoose = require("mongoose");

const DB =process.env.DATABASE;

mongoose.connect(DB ,{useNewUrlParser:true,// useCreateIndex:true,// useUnifiedTopology:true,// useFindAndModify :false
}).then(()=>{
    console.log("connetion sucessfull")
}).catch((err)=>{
    console.log(err + "no connection");
})
