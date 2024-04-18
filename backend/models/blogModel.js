const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,  
    },
    category:{
        type:String,
        required:true,  
    },
    numViews:{
        type:Number,
        deafult:0,
    },
    isLiked:{
        type:Boolean,
        default:false
    },
    isDisliked:{
        type:Boolean,
        default:false
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        //ref:user,
    },],
    dislikes:[{
        type:mongoose.Schema.Types.ObjectId,
        //ref:user,
    },],
    
    images:[],

    author:{
        type:String,
       
    },
      },
    {
      toJSON:{
        virtuals:true,
      },
      toObject:{
        virtuals:true,
      },
      timestamps:true
});

//Export the model
module.exports = mongoose.model('Blog', BlogSchema);