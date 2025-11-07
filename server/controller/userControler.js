const User=require('../model/userModel')

//login controller

const login =async(req,res)=>{
try{
    const {email,password}= req.body
    const user=await User.findOne({email,password})

    if(!user){
        res.status(200).json({
            message:"The user does not exist",
            success:false
        })
        return
    }
    res.status(200).json({
        message:"User logged in successfully",
        success:true,
        user
    })
}catch(error){
    console.log("Login error:", error)
    res.status(500).json({
        message:"error in logging in",
        success:false,
        error: error.message
    })
}
}


const register=async(req,res)=>{
    try{
        const newUser=new User(req.body)
        await newUser.save()
        res.status(201).json({
            message:"user created successfully",
            success:true,
            newUser
        })

    }catch(error){
        console.log("Registration error:", error)
        res.status(500).json({
            message:"An error in registration",
            success:false,
            error: error.message
        })
    }
    

}


module.exports={login,register}