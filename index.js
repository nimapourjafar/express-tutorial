const express = require("express");
const path = require("path");
const members = require("./Members")
const logger = require("./middleware/logger")

const app = express();

app.use(logger)

app.get("/api/members", (req, res) => {
    res.json(members);
});

app.get("/api/members/:id",(req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));   
    }else{
        res.status(400).json({msg:"Member not found"})
    }
})

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
