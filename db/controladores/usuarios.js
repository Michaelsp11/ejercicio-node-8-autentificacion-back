const Usuario = require("../modelos/Usuario");

const listarItems = async (idUsuario) => {
  const usuario = await Usuario.findOne({
    _id: idUsuario,
  }).populate("items");
  return usuario.items;
};
const getIdUsuario = async (usuario, passwordUsuario) => {
  const usuarioBD = await Usuario.findOne({
    nombre: usuario,
    password: passwordUsuario,
  });
  return usuarioBD._id;
};
module.exports = {
  listarItems,
  getIdUsuario,
};