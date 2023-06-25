const express = require('express');

function configureExpress() {
    const app = express();
    app.use(express.json());
    return app;
}

module.exports = configureExpress;
