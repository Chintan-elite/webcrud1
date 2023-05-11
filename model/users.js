const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({

        uname : {
            type : String
        },
        email : {
            type : String
        },
        pass : {
            type : String
        },
        joindate : {
            type : Date,
            default:Date.now()
        },
        img : {
            type : String
        }



})

userSchema.pre("save",async function(){
    try {
        
        this.pass  =await bcrypt.hash(this.pass,10)
    } catch (error) {
        
    }
})

module.exports=new mongoose.model("User",userSchema)