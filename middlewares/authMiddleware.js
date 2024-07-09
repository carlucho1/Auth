// Importa el módulo jsonwebtoken para manejar JWT
const jwt = require('jsonwebtoken');
// Importa la configuración (clave secreta y duración del token)
const config = require('../config/config');

// Middleware de autenticación
module.exports = (req, res, next) => {
    // Obtiene el token del encabezado de autorización
    const authHeader = req.headers['authorization'];
    // Si no hay token en el encabezado
    if (!authHeader) return res.status(403).send({ auth: false, message: 'No se proveyó un token' });

    // Extrae el token del encabezado (formato "Bearer <token>")
    const token = authHeader.split(' ')[1];
    // Si el token no está bien formado envía una respuesta de error 403
    if (!token) return res.status(403).send({ auth: false, message: 'badformed token.' });
    // Verifica el token usando la clave secreta
    jwt.verify(token, config.secretKey, (err, decoded) => {
        // Si hay error en la verificación envía una respuesta de error 500
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // Si el token es válido, almacena el ID del usuario decodificado en la solicitud
        req.userId = decoded.id;
        console.log(req.userId);
        // Llama a la siguiente función de middleware o controlador
        next();
    });
};