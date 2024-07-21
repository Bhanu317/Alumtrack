var con=require("./connection");
var express=require('express');
var app=express();
app.use(express.json());



app.set('view engine','ejs');

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
});
app.get('/styles.css',function(req,res){
    res.sendFile(__dirname+"/"+'/styles.css')
});

app.get('/search',function(req,res){
    res.sendFile(__dirname+'/search.html')
});
app.get('/styles1.css',function(req,res){
    res.sendFile(__dirname+"/search"+'/styles1.css')
});
app.get('/about',function(req,res){
    res.sendFile(__dirname+'/about.html')
});
app.get('/styles3.css',function(req,res){
    res.sendFile(__dirname+'/styles3.css')
});
app.get('/styles2.css',function(req,res){
    res.sendFile(__dirname+'/styles2.css')
});
app.get('/contact',function(req,res){
    res.sendFile(__dirname+'/contact.html')
});
app.get('/styles4.css',function(req,res){
    res.sendFile(__dirname+'/styles4.css')
});


app.get('/students',function(req,res){

    var SERIAL_NUMBER=req.query.SERIAL_NUMBER;
    var FIRST_NAME=req.query.FIRST_NAME;
    var LAST_NAME=req.query.LAST_NAME;
    var DEGREE=req.query.DEGREE;
    var BRANCH=req.query.BRANCH;
    var YEAR_OF_PASSING=req.query.YEAR_OF_PASSING;
    var CURRENT_OCCUPATION=req.query.CURRENT_OCCUPATION;
    var CURRENT_DESIGNATION=req.query.CURRENT_DESIGNATION;
    var CONTACT_NUMBER=req.query.CONTACT_NUMBER;
    var EMAIL=req.query.EMAIL;
    var CCOUNTRY_OR_CITY=req.query.CCOUNTRY_OR_CITY;
    var CURRENT_ORGANIZATION_WITH_ADDRESS=req.query.CURRENT_ORGANIZATION_WITH_ADDRESS;

    
        

        var sql1="SELECT * FROM academic_information a INNER JOIN personal_information p ON a.SERIAL_NUMBER=p.SERIAL_NUMBER INNER JOIN professional_information q ON q.SERIAL_NUMBER=p.SERIAL_NUMBER where FIRST_NAME LIKE '%"+FIRST_NAME+"%' AND LAST_NAME LIKE '%"+LAST_NAME+"%' AND DEGREE LIKE '%"+DEGREE+"%' AND BRANCH LIKE '%"+BRANCH+"%' AND YEAR_OF_PASSING LIKE '%"+YEAR_OF_PASSING+"%' AND CCOUNTRY_OR_CITY LIKE '%"+CCOUNTRY_OR_CITY+"%'";
        con.query(sql1,function(error,result){
            if(error) console.log(error);
            console.log(result);
            res.render(__dirname+"/students",{students:result});
            //console.log(result);
        });
    
});

app.get('/searchs',function(req,res){
    var SERIAL_NUMBER=req.query.SERIAL_NUMBER;
    var FIRST_NAME=req.query.FIRST_NAME;
    var LAST_NAME=req.query.LAST_NAME;
    var DEGREE=req.query.DEGREE;
    var BRANCH=req.query.BRANCH;
    var YEAR_OF_PASSING=req.query.YEAR_OF_PASSING;
    var CURRENT_OCCUPATION=req.query.CURRENT_OCCUPATION;
    var CURRENT_DESIGNATION=req.query.CURRENT_DESIGNATION;
    var CONTACT_NUMBER=req.query.CONTACT_NUMBER;
    var EMAIL=req.query.EMAIL;
    var CCOUNTRY_OR_CITY=req.query.CCOUNTRY_OR_CITY;
    var CURRENT_ORGANIZATION_WITH_ADDRESS=req.query.CURRENT_ORGANIZATION_WITH_ADDRESS;

    ql1=FIRST_NAME.length;
    ql2=LAST_NAME.length;
    ql3=DEGREE.length;
    ql4=BRANCH.length;
    ql5=YEAR_OF_PASSING.length;
    ql6=CCOUNTRY_OR_CITY.length;
    
        
    var sql="SELECT  FIRST_NAME, LAST_NAME, DEGREE, BRANCH, YEAR_OF_PASSING, CURRENT_OCCUPATION, CURRENT_DESIGNATION, CURRENT_ORGANIZATION_WITH_ADDRESS, CONTACT_NUMBER, EMAIL, CCOUNTRY_OR_CITY FROM academic_information a INNER JOIN personal_information p ON a.SERIAL_NUMBER=p.SERIAL_NUMBER INNER JOIN professional_information q ON q.SERIAL_NUMBER=p.SERIAL_NUMBER where FIRST_NAME LIKE '%"+FIRST_NAME+"%' AND LAST_NAME LIKE '%"+LAST_NAME+"%' AND (DEGREE LIKE '%"+DEGREE+"%' or DEGREE IS null) AND (BRANCH LIKE '"+BRANCH+"%' or BRANCH IS null) AND (YEAR_OF_PASSING LIKE '%"+YEAR_OF_PASSING+"%' or YEAR_OF_PASSING IS null) AND (CCOUNTRY_OR_CITY LIKE '%"+CCOUNTRY_OR_CITY+"%' or CCOUNTRY_OR_CITY IS null)";
        con.query(sql,function(error,result){
            if(error) console.log(error);
            
        
            res.render(__dirname+"/students",{students:result});
            if(typeof document!=='undefined')
            {
                document.getElementById("f").reset();
            }
                
    })
})






app.listen(7000);