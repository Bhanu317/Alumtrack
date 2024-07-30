var con=require("./connection");
var express=require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

var app=express();
app.use(express.json());



app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'Bhanuraghu',
  resave: false,
  saveUninitialized: true,
}));

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
app.get('/adminlogin',function(req,res){
    res.sendFile(__dirname+'/login.html')
});


// Middleware to check if the user is authenticated
const checkAuth = (req, res, next) => {
    if (req.session.isAdmin) {
      next();
    } else {
      res.redirect('/');
    }
  };

  app.get('/register',checkAuth,function(req,res){
    res.sendFile(__dirname+'/register.html')
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
            res.render(__dirname+"/students",{students:result,isAdmin: req.session.isAdmin});
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
            
        
            res.render(__dirname+"/students",{students:result,isAdmin: req.session.isAdmin});
            if(typeof document!=='undefined')
            {
                document.getElementById("f").reset();
            }
                
    })
})

/*const adminCredentials = {
    id: 'admin@123.com',
    password: 'admin123@'
};

// Admin login route
app.post('/admin/login', (req, res) => {
    const { id, password } = req.body;

    if (id === adminCredentials.id && password === adminCredentials.password) {
        res.status(200).json({ message: 'Authenticated successfully!' });
    } else {
        res.status(401).json({ message: 'Invalid ID or password' });
    }
});*/

// Route to handle login logic
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Admin credentials
  const adminEmail = 'admin@123.com';
  const adminPassword = 'admin123@';

  if (email === adminEmail && password === adminPassword) {
    req.session.isAdmin = true;
    res.redirect('/');
  } else {
    res.send('Invalid credentials');
  }
});



// Home route
app.get('/', checkAuth, (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

app.post('/register',checkAuth,(req,res)=>{
    const {
        SERIAL_NUMBER,
        FIRST_NAME,
        LAST_NAME,
        DEGREE,
        BRANCH,
        YEAR_OF_PASSING,
        CURRENT_OCCUPATION,
        CURRENT_DESIGNATION,
        CONTACT_NUMBER,
        EMAIL,
        CCOUNTRY_OR_CITY,
        CURRENT_ORGANIZATION_WITH_ADDRESS
    } = req.body;

    if (!SERIAL_NUMBER || !FIRST_NAME || !LAST_NAME || !DEGREE || !BRANCH || !YEAR_OF_PASSING ||
        !CURRENT_OCCUPATION || !CURRENT_DESIGNATION || !CONTACT_NUMBER || !EMAIL || !CCOUNTRY_OR_CITY || !CURRENT_ORGANIZATION_WITH_ADDRESS) {
        return res.status(400).send('All fields are required.');
    }

    const sql1 = "INSERT INTO personal_information (SERIAL_NUMBER, FIRST_NAME, LAST_NAME, CONTACT_NUMBER, EMAIL, CCOUNTRY_OR_CITY) VALUES (?, ?, ?, ?, ?, ?)";
    const sql2 = "INSERT INTO academic_information (SERIAL_NUMBER, BRANCH, DEGREE, YEAR_OF_PASSING) VALUES (?, ?, ?, ?)";
    const sql3 = "INSERT INTO professional_information (SERIAL_NUMBER, CURRENT_OCCUPATION, CURRENT_DESIGNATION, CURRENT_ORGANIZATION_WITH_ADDRESS) VALUES (?, ?, ?, ?)";

    con.beginTransaction(err => {
        if (err) {
            return res.status(500).send('Transaction error: ' + err);
        }

        con.query(sql1, [SERIAL_NUMBER, FIRST_NAME, LAST_NAME, CONTACT_NUMBER, EMAIL, CCOUNTRY_OR_CITY], (error, results) => {
            if (error) {
                return con.rollback(() => {
                    res.status(500).send('Error inserting data into personal_information: ' + error);
                });
            }

            con.query(sql2, [SERIAL_NUMBER, BRANCH, DEGREE, YEAR_OF_PASSING], (error, results) => {
                if (error) {
                    return con.rollback(() => {
                        res.status(500).send('Error inserting data into academic_information: ' + error);
                    });
                }

                con.query(sql3, [SERIAL_NUMBER, CURRENT_OCCUPATION, CURRENT_DESIGNATION, CURRENT_ORGANIZATION_WITH_ADDRESS], (error, results) => {
                    if (error) {
                        return con.rollback(() => {
                            res.status(500).send('Error inserting data into professional_information: ' + error);
                        });
                    }

                    con.commit(err => {
                        if (err) {
                            return con.rollback(() => {
                                res.status(500).send('Transaction commit error: ' + err);
                            });
                        }
                        //alert("data saved successfully");
                        res.status(200).send('Data inserted successfully');
                        //res.send(alert("Data inserted successfully"));
                        //res.redirect('/register');
                    });
                });
            });
        });
    });
})




app.listen(7000);