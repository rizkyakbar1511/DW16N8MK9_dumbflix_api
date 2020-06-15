const jwt = require('jsonwebtoken');

exports.auth = (req,res,next) => {
    const header = req.header("Authorization");
    if(!header) return res.status(401).send({message: "Access denied!"})
    const token = header.replace("Bearer ", "");
    if(!token) return res.status(401).send({message: "Access denied!"})

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);

        req.user = verified;
        next()
    } catch (error) {
        res.status(400).send({message: "Invalid Token"})
    }
}