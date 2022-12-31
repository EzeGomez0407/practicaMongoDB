const { Router } = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../database/models/User");

const router = Router();

const schemaRegister = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string()
    .min(12)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().min(8).required(),
});

const schemaLogin = Joi.object({
  email: Joi.string()
    .min(12)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().min(8).required(),
});

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
    if (error) throw new Error(error);

    const existentUser = await User.findOne({ email: req.body.email });
    if (existentUser) throw new Error("este email ya esta registrado");

    const savedUser = await user.save();
    return res.json({
      succes: "Cuenta creada, inicia sesion",
      data: savedUser,
    });
  } catch (error) {
    return res.status(400).json("Este error viene del catch: " + error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = schemaLogin.validate(req.body);
    if (error) throw new Error(error);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Credenciales no validas");

    const passwordValidate = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValidate)
      return res.status(400).json("Credenciales no validas");

    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
      },
      process.env.TOKEN_SECRET
    );

    res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
  } catch (error) {
    return res.status(400).json("Este error viene del catch: " + error.message);
  }
});

module.exports = router;
