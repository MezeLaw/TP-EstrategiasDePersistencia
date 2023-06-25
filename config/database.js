const { Sequelize } = require('sequelize');
// TODO reemplazar por env variable como la v1
const sequelize = new Sequelize('api_v2', 'root', 'root', {
    dialect: 'mariadb',
    host: 'localhost'
});

async function syncDatabase() {
    try {
        await sequelize.sync();
        console.log('Base de datos sincronizada');
    } catch (err) {
        console.error('Error al sincronizar la base de datos:', err);
    }
}

module.exports = {
    sequelize,
    syncDatabase
};
