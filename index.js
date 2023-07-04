const express = require ('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require ('express-session');
const UserModel = require("./models/user");

const port = 3000;

const app = express();

const mongoose = require("mongoose")
var connectionUrl = "mongodb+srv://NazwaF535210101:Kebayakan12@ovo.vhh0gub.mongodb.net/"


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

app.get( '/index', (req,res) =>{
    res.render('index',{title: 'index' });
});

app.post("/api/login", (req, res) => {
    const { phoneNumber } = req.body;
  
    UserModel.findOne({ phoneNumber })
      .then((user) => {
        if (user) {
            res.redirect('/index');
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
        res.status(500).send({ message: "Gagal mendaftarkan pengguna" });
      });
  });
  



app.listen(3000);
console.log('Server runs at port 3000...');