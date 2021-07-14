const Usuario = require("../modelos/Usuario");
const Item = require("../modelos/Item");

const listarAllItems = async () => {
  const items = await Item.find({});
  return items;
};
const listarItems = async (idUsuario) => {
  const usuario = await Usuario.findOne({
    _id: idUsuario,
  }).populate("items");
  return usuario.items;
};

module.exports = {
  listarAllItems,
  listarItems,
};
