//ORM cfg
const { sequelize, syncDatabase } = require('../config/database');

//Express cfg
const configureExpress = require('../config/express');
const app = configureExpress();

//Modelos - definicion
const User = require('../models/user');
const Carrera = require('../models/carrera');
const UsuarioCarrera = require('../models/usuario_carrera');
const ActivityLogs = require('../models/activity_logs');

//Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Universidad API',
      version: '1.0.0',
      description: 'App para los usuarios de la Universidad (primer version para Alumnos), para que puedan consultar sus carreras,sus materias, inscribirse a carreras/materias y más.',
    },
  },
  apis: ['swaggerSpec.yaml'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Rutas
const usersRouter = require('../routes/user');
const carrerasRouter = require('../routes/carreras');
const inscripcionesRouter = require('../routes/inscripcion');
const authRouter = require('../routes/auth');
const activityLogsRouter = require('../routes/activityLogs');

//Routing sin agrupamiento
app.get('/', (req, res) => {
    res.send('API-V2');
});
app.get('/healthcheck', (req, res) => {
    res.send('Status OK');
});

// Asignacion de rutas
app.use('/users', usersRouter);
app.use('/carreras', carrerasRouter);
app.use('/inscripcion', inscripcionesRouter);
app.use('/auth', authRouter);
app.use('/activity-logs', activityLogsRouter);

// Iniciar el servidor post sync de la db
syncDatabase()
    .then(() => {
  // Iniciar el servidor solo después de sincronizar la base de datos
  app.listen(3000, () => {
            console.log('Servidor escuchando en el puerto 3000');
  });
});
