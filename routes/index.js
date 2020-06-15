const express = require("express");
const router = express.Router();

const {
  read: findUsers,
  readOne: findUser,
  deleteOne: deleteUser,
} = require("../controllers/user");
const { register, login } = require("../controllers/auth");
const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/uploader");
const {
  readEpisodes: findEpisodes,
  readEpisode: findEpisode,
  readFilms: findFilms,
  readFilm: findFilm,
  createFilm: addFilm,
  deleteFilm,
  editFilm,
} = require("../controllers/film");
const {
  readCategory: findCategory,
  createCategory: addCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/category");
const {
  readTransactions: findTransactions,
  createTransaction: addTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transaction");
const {
  createEpisode: addEpisode,
  editEpisode,
  deleteEpisode,
} = require("../controllers/episode");

//Authentication users
router.post("/register", register);
router.post("/login", login);

//User Routes
router.get("/users", auth, findUsers);
router.get("/user/:id", auth, findUser);
router.delete("/user/:id", auth, deleteUser);

//Category Routes
router.get("/categories", findCategory);
router.post("/category", auth, addCategory);
router.patch("/category/:id", auth, editCategory);
router.delete("/category/:id", auth, deleteCategory);

//Film Routes
router.get("/films", findFilms);
router.get("/film/:id", findFilm);
router.get("/film/:id/episodes", findEpisodes);
router.get("/episode/:id", findEpisode);
router.post("/film", auth, addFilm);
router.patch("/film/:id", auth, editFilm);
router.delete("/film/:id", auth, deleteFilm);

//Transactions Routes
router.get("/transactions", auth, findTransactions);
router.post("/transaction", auth, upload, addTransaction);
router.patch("/transaction/:id", auth, editTransaction);
router.delete("/transaction/:id", auth, deleteTransaction);

//Episode Routes
router.post("/episode", auth, addEpisode);
router.patch("/episode/:id", auth, editEpisode);
router.delete("/episode/:id", auth, deleteEpisode);

//Other routes
router.get("*", (req, res) => {
  res.status(404).send({ error: "404 Not Found" });
});

module.exports = router;
