const mysql = require('mysql2');

const db = mysql.createPool({
   host:'mysql.aleksandr0.myjino.ru',
   user:'045931491_jtest',
   password:'SqmM5qLhy9',
   database:'aleksandr0_jtest'
});

db.getConnection(()=>{
});

module.exports = db;
