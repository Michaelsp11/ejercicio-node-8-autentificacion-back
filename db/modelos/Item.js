const { Schema, model } = require("mongoose");

const ItemSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  precio: {
    type: Number,
    required: true,
  },
});

const Item = model("Item", ItemSchema, "items");

module.exports = Item;
