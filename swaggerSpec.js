/**
 * @swagger
 * securitySchemesy:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

/**
 * @swagger
 * tags:
 *   name: Carreras
 *   description: Endpoints relacionados con carreras.
 */

/**
 * @swagger
 * /carreras:
 *   get:
 *     summary: Obtiene todas las carreras
 *     tags: [Carreras]
 *     responses:
 *       200:
 *         description: Lista de carreras obtenida exitosamente
 *       500:
 *         description: Error al obtener las carreras
 */

/**
 * @swagger
 * /carreras/{id}:
 *   get:
 *     summary: Obtiene una carrera por ID
 *     tags: [Carreras]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la carrera a buscar
 *     responses:
 *       200:
 *         description: Carrera encontrada exitosamente
 *       404:
 *         description: Carrera no encontrada
 *       500:
 *         description: Error al buscar la carrera
 */

/**
 * @swagger
 * /carreras:
 *   post:
 *     summary: Crea una nueva carrera
 *     tags: [Carreras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Nombre de la carrera
 *     responses:
 *       200:
 *         description: Carrera creada exitosamente
 *       500:
 *         description: Error al crear la carrera
 */

/**
 * @swagger
 * /carreras/{id}:
 *   delete:
 *     summary: Elimina una carrera por ID
 *     tags: [Carreras]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la carrera a eliminar
 *     responses:
 *       200:
 *         description: Carrera eliminada exitosamente
 *       404:
 *         description: Carrera no encontrada
 *       500:
 *         description: Error al buscar o eliminar la carrera
 */

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints relacionados con usuarios.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       500:
 *         description: Error al obtener los usuarios
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a buscar
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al buscar el usuario
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               dni:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: Nombre del usuario
 *               lastname: Apellido del usuario
 *               dni: DNI del usuario
 *               email: Correo electrónico del usuario
 *               password: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *       500:
 *         description: Error al crear el usuario
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al buscar o eliminar el usuario
 */

/**
 * @swagger
 * tags:
 *   name: Inscripción
 *   description: Endpoints relacionados con las inscripciones.
 */

/**
 * @swagger
 * /inscripcion/carrera/{carreraId}/usuario/{userId}:
 *   post:
 *     summary: Realiza la inscripción de un usuario a una carrera
 *     tags: [Inscripción]
 *     parameters:
 *       - in: path
 *         name: carreraId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la carrera a la que se desea inscribir
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario que desea inscribirse
 *     responses:
 *       200:
 *         description: Inscripción exitosa
 *       404:
 *         description: Usuario o carrera no encontrados
 *       500:
 *         description: Error al intentar realizar la inscripción
 */


/**
 * @swagger
 * tags:
 *   name: Autenticacion
 *   description: Endpoints relacionados con las autenticaciones.
 */

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Autenticación de usuario
 *     tags: [Autenticacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: correo@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *       400:
 *         description: Credenciales incorrectas
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al generar token
 */

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Endpoints relacionados con los logs de la aplicación.
 */

/**
 * @swagger
 * /activity-logs:
 *   get:
 *     summary: Obtiene todos los logs
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Lista de logs obtenida exitosamente
 *       500:
 *         description: Error al obtener los logs
 */

/**
 * @swagger
 * /activity-logs/{id_usuario}:
 *   get:
 *     summary: Obtiene los logs por ID de usuario
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario para filtrar los logs
 *     responses:
 *       200:
 *         description: Logs encontrados exitosamente
 *       500:
 *         description: Error al obtener los logs por ID de usuario
 */

/**
 * @swagger
 * /activity-logs/{metodo_http}:
 *   get:
 *     summary: Obtiene los logs por método HTTP
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: metodo_http
 *         schema:
 *           type: string
 *         required: true
 *         description: Método HTTP para filtrar los logs
 *     responses:
 *       200:
 *         description: Logs encontrados exitosamente
 *       500:
 *         description: Error al obtener los logs por método HTTP
 */

/**
 * @swagger
 * /activity-logs/ip/{direccion_ip}:
 *   get:
 *     summary: Obtiene los logs por dirección IP
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: direccion_ip
 *         schema:
 *           type: string
 *         required: true
 *         description: Dirección IP para filtrar los logs
 *     responses:
 *       200:
 *         description: Logs encontrados exitosamente
 *       500:
 *         description: Error al obtener los logs por dirección IP
 */

/**
 * @swagger
 * /activity-logs/url/{url_peticion}:
 *   get:
 *     summary: Obtiene los logs por endpoint de URL
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: url_peticion
 *         schema:
 *           type: string
 *         required: true
 *         description: Endpoint de URL para filtrar los logs
 *     responses:
 *       200:
 *         description: Logs encontrados exitosamente
 *       500:
 *         description: Error al obtener los logs por endpoint de URL
 */

/**
 * @swagger
 * /activity-logs/fecha/{fecha_exacta}:
 *   get:
 *     summary: Obtiene los logs por fecha exacta
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: fecha_exacta
 *         schema:
 *           type: string
 *         required: true
 *         description: |
 *           Fecha exacta para filtrar los logs (formato: yyyy-mm-dd)
 *     responses:
 *       200:
 *         description: Logs encontrados exitosamente
 *       500:
 *         description: Error al obtener los logs por fecha exacta
 */

/**
 * @swagger
 * /activity-logs/fecha/{fecha_inicio}/{fecha_fin}:
 *   get:
 *     summary: Obtiene los logs entre dos fechas
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: fecha_inicio
 *         schema:
 *           type: string
 *         required: true
 *         description: |
 *           Fecha de inicio para filtrar los logs (formato: yyyy-mm-dd)
 *       - in: path
 *         name: fecha_fin
 *         schema:
 *           type: string
 *         required: true
 *         description: |
 *           Fecha de fin para filtrar los logs (formato: yyyy-mm-dd)
 *     responses:
 *       200:
 *         description: Logs encontrados exitosamente
 *       500:
 *         description: Error al obtener los logs entre dos fechas
 */

/**
 * @swagger
 * /activity-logs/duracion/{duracion_min}/{duracion_max}:
 *   get:
 *     summary: Obtiene los logs por rango de duración
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: duracion_min
 *         schema:
 *           type: integer
 *         required: true
 *         description: Duración mínima para filtrar los logs
 *       - in: path
 *         name: duracion_max
 *         schema:
 *           type: integer
 *         required: true
 *         description: Duración máxima para filtrar los logs
 *     responses:
 *       200:
 *         description: Logs encontrados exitosamente
 *       500:
 *         description: Error al obtener los logs por rango de duración
 */

/**
 * @swagger
 * /activity-logs/{id}:
 *   delete:
 *     summary: Elimina un log por ID
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del log a eliminar
 *     responses:
 *       200:
 *         description: Log eliminado exitosamente
 *       404:
 *         description: Log no encontrado
 *       500:
 *         description: Error al eliminar el log
 */


module.exports = {
  swaggerDefinition: {
      openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API Documentation for your project',
    },
  },
  apis: [
    './routes/carreras.js',
    './routes/user.js',
    './routes/inscripcion.js',
    './routes/auth.js',
    './routes/activityLogs.js',
  ],
};
