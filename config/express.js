const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const mysql = require('mysql2')

module.exports = () => {
    const app = express();

    // Define the port *before* using it
    const port = process.env.PORT || config.get('server.port'); // Get from config or env

    app.get('/user/', (req, res) => {
        // console.log("fetching user with id: " + req.params.id);

        const conn = mysql.createConnection({
            host: 'localhost', // Or your host
            user: 'root', // Or your user
            password: process.env.MYSQL_PASSWORD,  // From environment variable
            database: 'lbta_mysql' // Replace with your database name
        });

        conn.connect((err) => { // Added connection check
            if (err) {
                console.error("Error connecting to database:", err);
                res.status(500).send("Error connecting to database"); // Send error response
                return; // Stop further execution
            }

            conn.query("SELECT * FROM users", (err, rows, fields) => {
                if (err) {
                    console.error("Error querying database:", err);
                    res.status(500).send("Error querying database"); // Send error response
                    return; // Stop further execution
                }

                console.log("Users fetched successfully");
                res.json(rows);
            });
        });
    });

    // SETANDO VARIÁVEIS DA APLICAÇÃO (This is fine)
    app.set('port', port); // Use the defined 'port' variable

    // MIDDLEWARES
    app.use(bodyParser.json());

    require('../api/routes/customerServ')(app);

    return app;
};