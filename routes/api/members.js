const express = require('express')
const members = require("../../Members")
const uuid = require('uuid')
const router = express.Router()

router.get("/", (req, res) => {
    res.json(members);
});

router.get("/:id",(req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));   
    }else{
        res.status(400).json({msg:"Member not found"})
    }
})


router.post('/',(req,res)=>{
    const newMember ={
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status:"active"
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg:"Please include info"})
    }

    members.push(newMember)
    res.json(members)
})

router.put("/:id",(req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        const updateMember = req.body
        members.forEach(member=>{
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name
                member.email = updateMember.email ? updateMember.email : member.email

                res.json({msg: member.name})
            }
        })
    }else{
        res.status(400).json({msg:"Member not found"})
    }
})

router.delete("/:id",(req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json({members: members.filter(member => member.id !== parseInt(req.params.id))}); 
         
    }else{
        res.status(400).json({msg:"Member not found"})
    }
})


module.exports = router