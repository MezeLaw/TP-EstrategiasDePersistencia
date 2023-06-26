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
 * /usuarios:
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
 * /usuarios/{id}:
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
 * /usuarios:
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
 * /usuarios/{id}:
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


module.exports = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API Documentation for your project',
      },
    },
    apis: ['./routes/carreras.js', './routes/user.js'],
  };
  