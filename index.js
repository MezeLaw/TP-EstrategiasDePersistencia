//ORM cfg
const { sequelize, syncDatabase } = require('./config/database');

//Express cfg
const configureExpress = require('./config/express');
const app = configureExpress();

//Modelos - definicion
const User = require('./models/user');
const Carrera = require('./models/carrera')
const UsuarioCarrera = require('./models/usuario_carrera')

//Rutas
const usersRouter = require('./routes/user');
const carrerasRouter = require('./routes/carreras')
const inscripcionesRouter = require('./routes/inscripcion')

//Routing sin agrupamiento
app.get('/', (req, res) => {
    res.send('API-V2');
});
app.get('/healthcheck', (req, res) => {
    res.send('Status OK');
});

// Asignacion de rutas
app.use('/users', usersRouter);
app.use('/carreras', carrerasRouter)
app.use('/inscripcion', inscripcionesRouter)

// Iniciar el servidor post sync de la db
syncDatabase()
    .then(() => {
        // Iniciar el servidor solo después de sincronizar la base de datos
        app.listen(3000, () => {
            console.log('Servidor escuchando en el puerto 3000');
        });
    });
