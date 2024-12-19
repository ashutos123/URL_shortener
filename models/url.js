const mongoose=require("mongoose");

const urlschema=new mongoose.Schema({//schema making
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true,

    },
    visitHistory:[{timestamp:{type:Number}}],
},
{timestamps:true}

);
const url=mongoose.model("url",urlschema);
module.exports=url;














