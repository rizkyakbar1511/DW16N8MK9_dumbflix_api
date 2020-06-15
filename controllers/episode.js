const { Episode, Film, Category } = require("../models");


exports.createEpisode = async (req,res) => {
    try {
        const episode = await Episode.create(req.body);
        const episodeCreated = await Episode.findOne({
          where: {
              id: episode.id
          },
          include:{
            model: Film,
                include:{
                    model:Category,
                    attributes:{ exclude: ["createdAt","updatedAt"] },
                },
                attributes:{ exclude: ["categoryId","CategoryId","createdAt","updatedAt"] },
            },
            attributes:{ exclude: ["FilmId","filmId","createdAt","updatedAt"] },
        });
        return res.status(200).send({status: "Success",data: episodeCreated});
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "Internal Server Error"})
    }
}

exports.editEpisode = async (req,res) => {
    try {
        const {id} = req.params;
        await Episode.update(req.body,{ where: { id } })
        const episodeUpdated = await Episode.findOne({
          where: { id },
          include:{
            model: Film,
                include:{
                    model:Category,
                    attributes:{ exclude: ["createdAt","updatedAt"] },
                },
                attributes:{ exclude: ["categoryId","CategoryId","createdAt","updatedAt"] },
            },
            attributes:{ exclude: ["FilmId","filmId","createdAt","updatedAt"] },
        });
        if(!episodeUpdated) return res.status(400).send({
          status : "Failed",
          Message: `Episode with id : ${id} not found`
        })
        return res.status(200).send({status: "Success",data: episodeUpdated})
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "Internal Server Error"})
    }
}

exports.deleteEpisode = async (req,res) => {
    try {
        const {id} = req.params;
        const episode = await Episode.destroy({ where: { id } })
        if(!episode) return res.status(400).send({
          status : `Failed`,
          message: `Episode with id : ${id} not found`
        })
        return res.status(200).send({status:"Success",message: `Episode with id : ${id} deleted successfully`});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: "Internal Server Error"})
    }
}