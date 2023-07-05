require('dotenv').config();
const { Sequelize } = require('sequelize');
// TODO reemplazar por env variable como la v1
const ejecucionTest = process.env.EJECUCION_TEST;
const baseName =  ejecucionTest ? process.env.BASE_TEST : process.env.BASE_DEV;
const paramsBase =
  (ejecucionTest)
    ? {
        dialect: 'mariadb',
        host: 'localhost',
        logging: false
      }
    : {
        dialect: 'mariadb',
        host: 'localhost'        
      };

const sequelize = new Sequelize(baseName, 'root', 'root', paramsBase);

async function syncDatabase() {
  try {
    await sequelize.sync();
    if(!ejecucionTest){
        console.log('Base de datos sincronizada');
    }
  } catch (err) {
    console.error('Error al sincronizar la base de datos:', err);
  }
}

module.exports = {
  sequelize,
  syncDatabase
};
