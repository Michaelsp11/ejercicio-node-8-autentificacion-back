const Usuario = require("../modelos/Usuario");

const getIdUsuario = async (usuario, passwordUsuario) => {
  const usuarioBD = await Usuario.findOne({
    nombre: usuario,
    contrasenya: passwordUsuario,
  });
  return usuarioBD ? usuarioBD._id : null;
};
module.exports = {
  getIdUsuario,
};
