const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router();
const jwt = require("jsonwebtoken")
require("../db/conn")
const userData = require("../model/userSchema")

router.get("/", (req, res) => {

    res.status(200)
    res.send("hello world")

});

//promises to use

// router.post("/register", (req, res) => {   

//     const { name, email, phone, work, password, cpassword } = req.body;



//     if (!name || !email || !phone || !work || !password || !cpassword) {

//         return res.status(422).json({ error: "plz filled the flied properly " })
//     }


//     userData.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {

//                 return res.status(422).json({ error: "email already exist" })
//             }

//             const user = new userData({ name, email, phone, work, password, cpassword })
//             user.save().then(()=>{ 
//                 res.status(201).json("user create sucessfully")
//             }).catch((err)=> res.status(500).json({error:"server error"}))

//         }).catch((err)=> res.status(500).json({error:"server error"}))
// })


//register root
router.post("/register", async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;



    if (!name || !email || !phone || !work || !password || !cpassword) {

        return res.status(422).json({ error: "plz filled the flied properly " })
    }

    try {

        const userExist = await userData.findOne({ email: email })

        if (userExist) {
            return res.status(422).json({ error: "email already exist" })
        }

        const user = new userData({ name, email, phone, work, password, cpassword })

        //password match

        if (password === cpassword) {

            //bcrypt password go to schema
            // console.log(user)
            await user.save();

            res.status(201).json("user create sucessfully")

        }
        else {

            return res.status(422).json({ error: "Password does not match" })
        }




    } catch (error) {
        res.status(500).json({ error: "server error" })


    }

})

//signin root

router.post("/signin", async (req, res) => {

    try {
        let token ;

        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "please filled the data" })
        }

        const userlogin = await userData.findOne({ email: email }) // match email from db
        if (userlogin) {
    
            //password compare
            const ismatch = await bcrypt.compare(password, userlogin.password);

            //user authenticaton jwt token  schema
            token = await userlogin.generateAuthToken();
            console.log(token)

            //store token in cookie later on
            // res.cookie('jwtoken',token,{
            //     expires:new Date(Date.now()+25802000000),
            //     httpOnly:true
            // });

            if (ismatch) {
                return res.status(200).json({ message: "user signin successfully" })
            } else {
                return res.status(400).json({ error: "invalid credential " })
            }
        }
        else {
            return res.status(400).json({ error: "invalid credential " })
        }

    } catch (error) {
        res.status(500).send("server error")
    }

});


module.exports = router;
