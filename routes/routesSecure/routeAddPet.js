const { Router } = require("express");
const Pet = require("../../database/models/Pet");
const router = Router();

router.post("/new-pet", async (req, res) => {
  console.log(req.user);
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
