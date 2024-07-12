// Importa el módulo jsonwebtoken para manejar JWT
const jwt = require("jsonwebtoken");
// Importa el módulo bcrypts para cifrar contraseñas
const bcrypt = require("bcrypt");
// Importa el modelo de usuarios (array de usuarios)
const users = require("../models/userModel");
// Importa la configurción (clave secreta y duración del token)
const config = require("../config/config");

// Conexión a la BD (tabla users)
var db = require("../db");


// ***** Función para registrar un nuevo usuario *****
exports.register = (req, res) => {
  // Extrae el nombre de usuario y la contraseña del cuerpo de la solicitud
  const { username, email, password } = req.body;
  console.log("Paso 1" + req.body);
  // Cifra la contraseña usando bcrypt
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Crea un nuevo objeto de usuario con un ID único en la Base de datos users

  // const newUser = { id: users.length + 1, username, password: hashedPassword };
  let query =
    'insert into users (username, email, password) values("' +
    req.body.username + '","' + req.body.email + '",' + req.body.hashedPassword + '")';

  // Agrega el nuevo usuario al array de usuarios
  // users.push(newUser);

  db.query(query, function (error, results, fields) {
    
    if (error) throw error;
    res.json({ data: results });
    console.log(req.body);
    console.log(results);
  });

  console.log(users);
  // Genera un token JWT para el nuevo usuario
  const token = jwt.sign({ id: newUser.id }, config.secretKey, {
    expiresIn: config.tokenExpiresIn,
  });
  // Envía el token como respuesta al cliente
  res.status(201).send({ auth: true, token });
};

// ***** Función para iniciar sesión de un usuario *****
exports.login = (req, res) => {
  // Extrae el nombre de usuario y la contraseña del cuerpo de la solicitud
  const { username, password } = req.body;
  // Busca el usuario en el array de usuarios por nombre de usuario
  const user = users.find((u) => u.username === username);
  // Si el usuario no se encuentra devuelve un error 404
  if (!user) return res.status(404).send("User not found.");
  // Compara la contraseña proporcionada con la contraseña cifrada almacenada
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid)
    return res.status(401).send({ auth: false, token: null });
  // Genero un JWT usando el ID del usuario
  const token = jwt.sign({ id: user.id }, config.secretKey, {
    expiresIn: config.tokenExpiresIn,
  });
  // Envío el token al cliente con el estado 200 (OK)
  res.status(200).send({ auth: true, token });
};