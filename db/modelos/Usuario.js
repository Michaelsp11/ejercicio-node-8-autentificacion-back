const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  contrasenya: {
    type: String,
    required: true,
  },
  items: {
    type: [Schema.Types.ObjectId],
    ref: "Item",
  },
});

const Usuario = model("Usuario", UsuarioSchema, "usuarios");

module.exports = Usuario;
