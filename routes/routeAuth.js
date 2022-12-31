const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../database/models/User");
const { schemaLogin, schemaRegister } = require("./controllers/schemasJoi");

const router = Router();

router.post("/register", async (req, res) => {
  const saltGen = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, saltGen);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const { error } = schemaRegister.validate(req.body);
    if (error) return res.json({ error: error.details[0].context });

    const existentUser = await User.findOne({ email: req.body.email });
    if (existentUser)
      return res.json({ error: "este email ya esta registrado" });

    const savedUser = await user.save();
    return res.json({
      error: null,
      data: savedUser,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.json({ error: error.details[0].context });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ error: "Credenciales no validas" });

    const passwordValidate = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValidate)
      return res.json({ error: "Credenciales no validas" });

    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
      },
      `${process.env.TOKEN_SECRET}`
    );

    res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

module.exports = router;
