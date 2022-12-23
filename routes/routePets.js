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

module.exports = router;
