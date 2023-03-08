var express = require('express');
var mysql = require('mysql')
var router = express.Router();

var con = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "password",
  database : "login_mysql"
});
con.connect(function(err){
  if(err){
    throw err;
  }
  console.log('connected');
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/',(req,res)=>{

  var {user_name,pass_word} = req.body;
  
  let selection = `SELECT * FROM login_page WHERE dummy = 0 AND emailid = '${user_name}'`;
    con.query(selection,function(err,results,fields){

      console.log(results);

        data = results[0];
        let pass = data.password;
        let user = data.emailid;
    
    if(pass_word == pass)
      {
        if(user == 'admin@000'){
          res.render('adminpage');
        }
        res.render('success');
      }
      else {
        res.redirect('/')
      }
    })
})

router.get('/signup',(req,res)=>{
  res.render('registration');
});


router.post('/signedup',(req,res)=>{

  var {first_name,second_name,phone_no,email_id,password} = req.body;
  console.log(req.body);
  var sql = `INSERT INTO login_page(firstname,secondname,phoneno,emailid,password) VALUES ('${first_name}','${second_name}','${phone_no}','${email_id}','${password}')`;
  console.log(sql);

  con.query(sql,function(err,results){
    if(err){
      throw err;
    }
    else{
      res.redirect('/')
    }
  })
})

module.exports = router;
