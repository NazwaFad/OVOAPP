const express = require ('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require ('express-session');
const UserModel = require("./models/user");

const port = 3000;

const app = express();

const mongoose = require("mongoose")
var connectionUrl = "mongodb://127.0.0.1:27017/ovo"


app.use(express.json());
app.use(express.static(__dirname + '/public'));

mongoose.connect(connectionUrl);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
    extended:true
}));



app.use(express.static('public'));

app.use(session({
    secret: 'some secret key',
    cookie: {}
}));


app.get( '/', (req,res) =>{
    res.render('login',{title: 'Login' });
});

app.get( '/register', (req,res) =>{
    res.render('register',{title: 'register' });
});

app.post("/api/login", (req, res) => {
    const user= {
      phoneNumber: req.body.phoneNumber
    }
    UserModel.findOne({ phoneNumber: user.phoneNumber })
      .then((user) => {
        if (user) {
          const saldo = user.saldo;
          res.render('index', { title: 'index', saldo: saldo });
        } else {
            const alertMessage = "Data tidak ditemukan! Silahkan login kembali";
            const script = `<script>alert('${alertMessage}'); window.location.href = '/';</script>`;
            res.send(script);
          }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
      });
  });
  
  
  app.post("/api/register", (req, res) => {
    const { phoneNumber } = req.body;
    const SaveUser = new UserModel({ phoneNumber });
    SaveUser.save()
      .then(() => {
        const alertMessage = "Data Berhasil Disimpan, Silahkan Login";
        res.send(`<script>alert('${alertMessage}'); window.location.href = '/';</script>`);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Gagal mendaftarkan akun" });
      });
  });
  



app.listen(3000);
console.log('Server runs at port 3000...');