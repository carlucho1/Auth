// Importa el módulo express
const express = require('express');
// importa el controlador de autenticación
const authController = require('../controllers/authController');
// Importa el middleware de autenticación
const authMiddleware = require('../middlewares/authMiddleware');

// Crea un nuevo enrutador de express
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);
/* Cuando se realiza una solicitud POST a /auth/register se ejecuta la función register del controlador de autenticación */

// Ruta para inicir sesión de un usuario
router.post('/login', authController.login);
/* Cuando se realiza una solicitud POST a auth/login se ejecuta la función login del controlador de autenticación */

// Ruta protegida de ejemplo
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).send(`Hello user ${req.userId}`);
});

/* Cuando se realiza una solicitud GET a /auth/protected se ejecuta el middleware de autenticación primero. Si la autenticación es exitosa, se ejecuta la función que envía un mensaje de saludo con el ID del usuario */

// Exporta el enrutador para que pueda ser utilizado en otros archivos
module.exports = router;