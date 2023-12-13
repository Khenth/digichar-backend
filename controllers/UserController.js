const User = require('../models/User')




// show the list of user
const index = (req,res,next)=>{
    User.find()
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            msg: 'An error occured!'
        })
    })
}

// show single User
const show =(req,res,next)=>{
    let userId = req.body.userId
    User.findById(userId)
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            msg: 'An error occured!'
        })
    })
}

// add user in base
const Add = (req,res,next)=>{
    let user = new User({
        Username: req.body.Username,
        Email: req.body.Email,
        Password: req.body.Password,
        Image: req.body.Image,
        Genre: req.body.Genre,
        Date_Naissance: req.body.Date_Naissance,
        Role: req.body.Role,
      
    })
    if(req.files){
        let path ='' 
        req.files.forEach(function(files,index,arr){
            path = path + files.path + ','

        })
        path = path.substring(0,path.lastIndexOf(","))
        user.Image = path
    }
    user.save()
    .then(response =>{
        res.json({
            msg: 'User added successfully!'
        })
    })
    .catch(error =>{
        res.json({
            msg: 'An error occured!'
        })
    })
}


// update user
const update = (req,res,next)=>{
    let userId = req.body.userId
    let updateData = {
        Username: req.body.Username,
        Email: req.body.Email,
        Password: req.body.Password,
        Image: req.body.Image,
        Genre: req.body.Genre,
        Date_Naissance: req.body.Date_Naissance,
        Role: req.body.Role
    }
    User.findByIdAndUpdate(userId, {$set: updateData})
    .then(()=>{
        res.json({
            msg: 'User updated successfully!'
        })
    })
    .catch(error =>{
        res.json({
            msg: 'An error occured!'
        })
    })


}

// delete user
const destroy = (req,res,next)=>{
    let userId = req.body.userId
    User.findByIdAndRemove(userId)
    .then(()=>{
        res.json({
            msg: 'User deleted successfully!'
        })
    })
    .catch(error =>{
        res.json({
            msg: 'An error occured!'
        })
    })
}

module.exports = {
    index, show, Add, update, destroy
}