const { Router } = require("express");
const Pet = require("../database/models/Pet");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();

    return res.send(pets);
  } catch (error) {
    console.log(error.messagge);
    res.send("ha ocurrido un error");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findById(id);
    return res.send(pet);
  } catch (error) {
    console.log(error.message);
    return res.send(error.message);
  }
});

module.exports = router;
