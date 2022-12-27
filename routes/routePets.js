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

router.post("/new-pet", async (req, res) => {
  const { name, age, temperament, type } = req.body;
  try {
    if (!name && !age && !type)
      return new Error(
        "no se proporcionaron todos los datos para la creacion de una mascota"
      );
    const newPet = await Pet.create({ name, age, temperament, type });
    res.send(newPet);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

module.exports = router;
