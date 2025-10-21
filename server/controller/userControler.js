const User=require('../model/userModel')

//login controller

const login =async(req,res)=>{
try{
    const {emailpassword}= req.body
    const user=await User.findOne({email,password})

    if(!user){
        res.status(200).json({
            message:"The user doesnot exist ",
            success:false

        })
        }
        res.status(200).json({
            message:"User logged in succssfuly"
            ,
            success:true,
            user
        })
}catch(error){
    res.status(500).json({
        message:"error in loggin in ",
        success:false,
        error
    })
}
}


const register=async(req,res)=>{
    try{
        const newUser=new User(req.body)
        newUser.save()
        res.status(201).json({
            message:"user created successfully",
            success:true,
            newUser
        })

    }catch(error){
        res.status(500).json({
            message:"An error in registration",
            success:false,
            error
        })
    }
    

}


module.exports={login,register}