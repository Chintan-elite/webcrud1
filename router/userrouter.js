const router = require("express").Router()
const { log } = require("console")
const User = require("../model/users")
 const multer = require("multer")
 const fs  =require("fs")

 var storage = multer.diskStorage({    
         destination: function (req, file, cb)
         {
  
            cb(null, "./public/upload")
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + "-" + Date.now()+".jpg")
        }
      })
    

var upload = multer({
        storage: storage 
})


router.get("/",(req,resp)=>{
    resp.redirect("login")
})

router.get("/registration",(req,resp)=>{
    resp.render("registration")
})

router.get("/login",(req,resp)=>{
    resp.render("login")
})

router.post("/do_register",upload.single("img"),async(req,resp)=>{
    
    try {
        //schema object
        const user = new User({
            uname : req.body.uname,
            email : req.body.email,
            pass : req.body.pass,
            img : req.file.filename
        })
        const data =   await user.save()
        
        resp.render("registration",{msg : "Registration successfully done!!!"})
    } catch (error) {
        console.log(error)
    }


})

router.get("/view",async(req,resp)=>{
    try {
        const data = await User.find();
        resp.render("view",{udata:data})
    } catch (error) {
        console.log(error);
    }
    
})

router.get("/delete",async(req,resp)=>{
    const did = req.query.did
    try {
        const data = await User.findByIdAndDelete(did);
        fs.unlinkSync("./public/upload/"+data.img)
        resp.redirect("view")
    } catch (error) {
        console.log(error);
    }
})

router.get("/edit",async(req,resp)=>{
    const eid = req.query.eid
    try {
        const data = await User.findOne({_id:eid})
        resp.render("update",{udata:data})
    } catch (error) {
        console.log(error);
    }
})

router.post("/do_update",upload.single("img"),async(req,resp)=>{
    
    try {
        //schema object
        
        const data =   await User.findByIdAndUpdate(req.body._id,{
            uname : req.body.uname,
            email : req.body.email,
            pass : req.body.pass,
            img : req.file.filename
        });
        fs.unlinkSync("./public/upload/"+data.img)
        //resp.render("update",{msg : "Update successfully done!!!"})
        resp.redirect("view")
    } catch (error) {
        console.log(error)
    }


})

module.exports = router