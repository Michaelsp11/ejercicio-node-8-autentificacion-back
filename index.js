require("dotenv").config();
const debug = require("debug")("usuariosApp:principal");
const conectarBD = require("./db");
require("./servidor");

conectarBD();
