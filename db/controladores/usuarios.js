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
    contrasenya: passwordUsuario,
  });
  return usuarioBD? usuarioBD._id : null;
};
module.exports = {
  listarItems,
  getIdUsuario,
};
