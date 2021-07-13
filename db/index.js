require("dotenv").config();
const debug = require("debug")("usuariosApp:db:conexion");
const chalk = require("chalk");
const mongoose = require("mongoose");

const conectarBD = () => {
  mongoose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        debug(chalk.red("No se ha podido conectar a la base de datos"));
        debug(chalk.red(err.message));
        return;
      }
      debug(chalk.yellow("Conectado a la base de datos"));
    }
  );
};

module.exports = conectarBD;
