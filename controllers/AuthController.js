const User  =require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const register =async (req,res,next)=>{

    const exist = await User.findOne({Email: req.body.Email})

    if(exist != null)  return res.status(400).json({
        msg: "Email already exists"
    })

    bcrypt.hash(req.body.Password,10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        let user = new User({
            Username: req.body.Username,
            Email: req.body.Email,
            Password: hashedPass
        })
        user.save()
        .then(async user =>{

            let token = jwt.sign({uid:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME})
            let refreshtoken = jwt.sign({uid:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRE_TIME})

            res.json({
                msg: 'Utilisateur added successfully!',
                user,
                token,
                refreshtoken
            })
        })
        .catch(error =>{
            res.status(400).json({
                msg: 'An error occured!'
            })
        })
    })   
}

const login =(req,res,next)=>{
    var username = req.body.Username
    var password = req.body.Password

    User.findOne({$or:[{Username:username},{Email:username}]})
    .then(user =>{
        if(user){
            bcrypt.compare(password,user.Password,function(err,result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({uid:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME})
                    let refreshtoken = jwt.sign({uid:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRE_TIME})

                    res.json({
                        msg:'Login Successful!',
                        user,
                        token,
                        refreshtoken
                    })
                }else{
                    res.status(400).json({
                        msg:'Password does not matched'
                    })
                }
            })
        }else{
            res.status(400).json({
                msg: 'Utilisateur not found!'
            })  
        }
    })
}

const refreshToken = (req,res,next)=>{
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,function(err,decode){
        if(err){
            res.json({
                err
            })
        }else{
            let token = jwt.sign({name:decode.name},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME})
            let refreshtoken=req.body.refreshToken

             User.findById(decode.uid).then(user=>{

              if(user == null) return res.status(400).json({
                msg: 'Utilisateur not found!'
                })


              return  res.json({
                msg: 'Token Refreshed successfully!',
                    user,
                    token,
                    refreshtoken
                })
             }).catch(er=> res.status(400).json({
                msg: 'Utilisateur not found!'
            }))

       

           
        }
    })
}




module.exports={
    register,login,refreshToken
}

    
