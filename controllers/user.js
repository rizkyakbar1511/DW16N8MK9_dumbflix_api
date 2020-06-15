const {User} = require('../models');

exports.read = async (req,res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } });
        return res.status(200).send({status:"Success",data: users});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: "Internal Server Error"});
    }
}

exports.create = async (req,res) => {
    try {
        const user = await User.create(req.body);
        return res.status(200).send({status:"Success",data: user});
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "Internal Server Error"});
    }
}

exports.readOne = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] }
        });
        return res.status(200).send({status:"Success",data: user});
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "Internal Server Error"});
    }
}

exports.deleteOne = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await User.destroy({ where:{ id } })
        if(!user) return res.status(400).send({
            status : `Failed`,
            message: `User with id : ${id} not found`
        })
        return res.status(200).send({status:"Success",message: `User with id : ${id} deleted successfully`});
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "Internal Server Error"});
    }
}