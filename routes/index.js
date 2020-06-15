const express = require("express");
const router = express.Router();

const {
  read: findUsers,
  readOne: findUser,
  deleteOne: deleteUser,
} = require("../controllers/user");
const { register, login } = require("../controllers/auth");
const { auth, previllegeCheck } = require("../middleware/auth");
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
router.get("/users", auth, previllegeCheck, findUsers);
router.get("/user/:id", auth, previllegeCheck, findUser);
router.delete("/user/:id", auth, previllegeCheck, deleteUser);

//Category Routes
router.get("/categories", findCategory);
router.post("/category", auth, previllegeCheck, addCategory);
router.patch("/category/:id", auth, previllegeCheck, editCategory);
router.delete("/category/:id", auth, previllegeCheck, deleteCategory);

//Film Routes
router.get("/films", findFilms);
router.get("/film/:id", findFilm);
router.get("/film/:id/episodes", findEpisodes);
router.get("/episode/:id", findEpisode);
router.post("/film", auth, previllegeCheck, addFilm);
router.patch("/film/:id", auth, previllegeCheck, editFilm);
router.delete("/film/:id", auth, previllegeCheck, deleteFilm);

//Transactions Routes
router.get("/transactions", auth, previllegeCheck, findTransactions);
router.post("/transaction", auth, previllegeCheck, upload, addTransaction);
router.patch("/transaction/:id", auth, previllegeCheck, editTransaction);
router.delete("/transaction/:id", auth, previllegeCheck, deleteTransaction);

//Episode Routes
router.post("/episode", auth, previllegeCheck, addEpisode);
router.patch("/episode/:id", auth, previllegeCheck, editEpisode);
router.delete("/episode/:id", auth, previllegeCheck, deleteEpisode);

//Other routes
router.get("*", (req, res) => {
  res.status(404).send({ error: "404 Not Found" });
});

module.exports = router;
