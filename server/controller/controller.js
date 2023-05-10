const userdb = require('../model/model');
var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:'Content can not be empty!'});
        return;
    }


    
    //new user
const user = new Userdb({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status
})

//save user in the database
user 
    .save(user)
    .then(data=>{
        // res.send(data)
        res.redirect('/add-user')
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || 'Some error occured while creating a create operation'
        });
    });



}






// retrieve and return all users / retrive and return a single user
exports.find = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;

        userdb.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message: 'Not found user with id' + id})
            }else {
                res.send(data)
            }

        })
        .catch(err=>{
            re.status(500).send({message: 'Error retrieving user with id' + id})
        })
    }else {

    Userdb.find()
    .then(user =>{
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({message: err.message || 'Error Occured while retrieving user information'})
    })
}
}


//update a new identified user by user id
exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message: 'Data to update can not be empty'})
    }

    const id = req.params.id;
    userdb.findByIdAndUpdate(id, req.body/{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Update User with ${id}. Maybe user not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err=> {
        res.status(500).send({message:'Error Update user Information'})
    })

}

//delete a user with a specified user id in the request
exports.delete=(req,res)=>{
    
}