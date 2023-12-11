const {Schema, model} = require('mongoose');

const UserSchema = Schema

({
    Username:{
        type: String,
    },
    Email:{
        type: String,   
    },
    
    Password:{
        type: String,
    },

    Image:{
        type: String,
        default:null,

    },

    Genre:{
        type: String,
        default:null,

    },

    authTokens:[{
        authToken:{
            type:String,
            required:true
        }
     }],
 

  
},  {timeStamps:true})

UserSchema.methods.toJSON = function(){
    const {__v,_id, authTokens, Password,...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema)