const mysql = require('mysql');

module.exports=()=>{
    var con= mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'Guitarra2896@',
        database:'escolastico'
    });
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
    return con;
}