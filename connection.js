var mysql =require("mysql");

var con =mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "root123",
    database:"alumni_database"
});

con.connect(function(error){
    if(error) throw error;
});
module.exports=con;

