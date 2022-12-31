const { Router } = require("express");
const Pet = require("../../database/models/Pet");
const router = Router();
const joiSchemaPet = require("./schemaJoi");

router.post("/new-pet", async (req, res) => {
  console.log(req.user);
  const { name, age, temperament, type } = req.body;
  try {
    if (!name || !age || !type)
      return res.json({
        error: "faltan datos para agrar una mascota",
      });

    const { error } = joiSchemaPet.validate({ name, age, type });
    if (error) return res.json({ error: error.details[0].context });
    const newPet = await Pet.create({ name, age, temperament, type });
    res.send({
      error: null,
      data: newPet,
    });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

module.exports = router;
