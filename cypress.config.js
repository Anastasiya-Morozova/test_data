const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    db: {
      host: "db4free.net",
      user: "anastasiiamoroz",
      password: "qwerty123",
      database: "it_switcher8",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        queryDB: (query) => {
          return queryTestDB(query, config);
        },
      });
    },
  },
});

const mysql = require("mysql");
function queryTestDB(query, config) {
  const connection = mysql.createConnection(config.env.db);
  connection.connect();
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        return resolve(results);
      }
    });
  });
}
