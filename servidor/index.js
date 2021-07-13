const morganFreeman = require("morgan");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { error404, errorGeneral } = require("./errores");

const app = require("./init");
const { listarItems, getIdUsuario } = require("../db/controladores/usuarios");

const authMiddleware = (req, res, next) => {
  if (!req.header("Authorization")) {
    const nuevoError = new Error("Petición no autentificada");
    nuevoError.codigo = 403;
    return next(nuevoError);
  }
  const token = req.header("Authorization").split(" ")[1];
  try {
    const datosToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = datosToken;
    req.idUsuario = id;
    next();
  } catch (e) {
    // Token incorrecto
    if (e.message.includes("expired")) {
      const nuevoError = new Error("Token caducado");
      nuevoError.codigo = 403;
      return next(nuevoError);
    }
    next(e);
  }
};
app.use(morganFreeman("dev"));
app.use(cors());
app.use(express.json());
app.get("/items/listado", authMiddleware, async (req, res, next) => {
  const items = await listarItems(req.idUsuario);
  if (!items) {
    const nuevoError = new Error(`No se ha encontrado ningún item.`);
    nuevoError.codigo = 404;
    return next(nuevoError);
  }
  res.json(items);
});
app.put("/usuarios/login", (req, res, next) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) {
    const nuevoError = new Error("Faltan credenciales");
    nuevoError.codigo = 400;
    return next(nuevoError);
  }
  const idUsuario = getIdUsuario(usuario, password);
  if (!idUsuario) {
    const token = jwt.sign({ id: idUsuario }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });
    res.json({ token });
  } else {
    const nuevoError = new Error("Credenciales incorrectas");
    nuevoError.codigo = 403;
    next(nuevoError);
  }
});
app.use(error404);
app.use(errorGeneral);
