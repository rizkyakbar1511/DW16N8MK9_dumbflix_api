const { Category } = require("../models");
const Joi = require("@hapi/joi");

exports.readCategory = async (req, res) => {
  try {
    const category = await Category.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return res.status(200).send({ status: "Success", Category: category });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const schema = Joi.object({ name: Joi.string().min(3).required() });
    const { error } = schema.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ error: { message: error.details[0].message } });

    const category = await Category.create(req.body);
    return res.status(200).send({ status: "Success", data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.editCategory = async (req, res) => {
  try {
    const schema = Joi.object({ name: Joi.string().min(3).required() });
    const { error } = schema.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ error: { message: error.details[0].message } });

    const { id } = req.params;
    await Category.update(req.body, { where: { id } });
    const categoryUpdated = await Category.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!categoryUpdated)
      return res.status(400).send({
        status: "Failed",
        Message: `Category with id : ${id} not found`,
      });
    return res.status(200).send({ status: "Success", data: categoryUpdated });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.destroy({ where: { id } });
    if (!category)
      return res.status(400).send({
        status: `Failed`,
        message: `Category with id : ${id} not found`,
      });
    return res
      .status(200)
      .send({
        status: "Success",
        message: `Category with id : ${id} deleted successfully`,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
