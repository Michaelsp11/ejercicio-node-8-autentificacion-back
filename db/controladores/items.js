const Usuario = require("../modelos/Usuario");

const listarItems = async (idUsuario) => {
  const usuario = await Usuario.findOne({
    _id: idUsuario,
  }).populate("items");
  return usuario.items;
};
