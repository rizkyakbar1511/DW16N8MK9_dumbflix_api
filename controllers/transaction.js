const { Transaction, User } = require("../models");

exports.readTransactions = async (req, res) => {
    try {
      const transactions = await Transaction.findAll({
        include: {
          model: User,
          attributes: { exclude: ["createdAt", "updatedAt"] }
        },
        attributes: { exclude: ["userId","UserId","createdAt", "updatedAt"] }
      });
    
      return res.status(200).send({ data: transactions });
    } catch (error) {
      console.log(error);
      return res.status(500).send({error: "Internal Server Error"});
    }
};

exports.createTransaction = async (req,res) => {
    try {
        const transaction = await Transaction.create({...req.body, attache: req.file.filename});
        const transactionCreated = await Transaction.findOne({
          where: { id: transaction.id} ,
          include: {
            model: User,
            attributes: { exclude: ["userId","createdAt", "updatedAt"] }
          },
          attributes: { exclude: ["userId","UserId","createdAt", "updatedAt"] }
        });
        return res.status(200).send({status: "Success",data: transactionCreated});
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "Internal Server Error"})
    }
}

exports.editTransaction = async (req,res) => {
  try {
      const {id} = req.params;
      await Transaction.update(req.body,{ where:{ id } })
      const transactionUpdated = await Transaction.findOne({
        where: { id },
        include: {
          model: User,
          attributes: { exclude: ["createdAt", "updatedAt"] }
        },
        attributes: { exclude: ["userId","UserId","createdAt", "updatedAt"] }
      });
      if(!transactionUpdated) return res.status(400).send({
        Status : "Failed",
        Message: `Transaction with id : ${id} Not Found`
      })
      return res.status(200).send({status: "Success",data: transactionUpdated})
  } catch (error) {
      console.log(error)
      return res.status(500).send({error: "Internal Server Error"})
  }
}

exports.deleteTransaction = async (req,res) => {
  try {
      const {id} = req.params;
      await Transaction.destroy({ where:{ id } })
      res.status(200).send({status:"Success",message: `Transaction with id : ${id} deleted successfully`});
  } catch (error) {
      console.log(error);
      return res.status(500).send({error: "Internal Server Error"})
  }
}