const { Film, Category, Episode } = require("../models");

exports.readEpisodes = async (req, res) => {
  try {
    const { id: filmId } = req.params;
    const film = await Film.findOne({
      where: { id: filmId },
      include: [
        {
          model: Category,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Episode,
          attributes: {
            exclude: ["FilmId", "filmId", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["categoryId", "CategoryId", "createdAt", "updatedAt"],
      },
    });
    return res.send({ data: { film } });
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.readEpisode = async (req, res) => {
  try {
    const { id } = req.params;
    const episode = await Episode.findOne({
      where: { id },
      attributes: { exclude: ["FilmId", "filmId", "createdAt", "updatedAt"] },
    });
    if (!episode)
      return res.status(400).send({
        status: `Failed`,
        message: `Episode with id : ${id} not found`,
      });
    return res.status(200).send({ status: "Success", data: episode });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.readFilms = async (req, res) => {
  try {
    const film = await Film.findAll({
      include: {
        model: Category,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      attributes: {
        exclude: ["categoryId", "CategoryId", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send({ status: "Success", data: film });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.readFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findOne({
      where: { id },
      include: {
        model: Category,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      attributes: {
        exclude: ["categoryId", "CategoryId", "createdAt", "updatedAt"],
      },
    });
    if (!film)
      return res.status(400).send({
        status: `Failed`,
        message: `Film with id : ${id} not found`,
      });
    return res.status(200).send({ status: "Success", data: film });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.createFilm = async (req, res) => {
  try {
    await Film.create(req.body);
    const filmCreated = await Film.findOne({
      where: { title: req.body.title },
      include: {
        model: Category,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      attributes: {
        exclude: ["id", "categoryId", "CategoryId", "createdAt", "updatedAt"],
      },
    });
    return res.status(200).send({ status: "Success", data: filmCreated });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.editFilm = async (req, res) => {
  try {
    const { id } = req.params;
    await Film.update(req.body, { where: { id } });
    const filmUpdated = await Film.findOne({
      where: { id },
      include: {
        model: Category,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      attributes: {
        exclude: ["categoryId", "CategoryId", "createdAt", "updatedAt"],
      },
    });
    if (!filmUpdated)
      return res.status(400).send({
        status: "Failed",
        Message: `Film with id : ${id} not found`,
      });
    return res.status(200).send({ status: "Success", data: filmUpdated });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.deleteFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.destroy({ where: { id } });
    if (!film)
      return res.status(400).send({
        status: `Failed`,
        message: `Film with id : ${id} not found`,
      });
    return res.status(200).send({
      status: "Success",
      message: `Film with id : ${id} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
