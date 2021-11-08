const express = require("express")
const router = express.Router();

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
        console.log(user)
         await user.save();
          
         res.status(201).json("user create sucessfully")

    } catch (error) {
        res.status(500).json({ error: "server error" })


    }

})


module.exports = router;
