const { engine } = require("express-handlebars");
const express = require('express');
const path = require("path");
const session = require('express-session');

const app = express();

const products = [
    {id: 1, name: "Ноутбук", price: 2500, category: "Переферия", description: "Удобная клавиатура"},
    {id: 1, name: "Мышка", price: 500, category: "Переферия", description: "Тихая"}
];

const users = [];

app.engine("handlebars", engine({extname: '.handlebars', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views', 'layouts'), partialsDir: path.join(__dirname, 'views', 'partials')}));

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "../public")));

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: false
    })
);

app.get("/", (req,res) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    res.render("home", {
        title: "Главная страница",
        user: req.session.user
    });
});

app.get("/about", (req,res) => {
    res.render("about", {
        title: "0 нас",
        description: "Мы создаём учебный магазин"
    });
});

app.get('/register', (req, res) => {
    res.render('register', {
      title: 'Регистрация',
      error: null,
    });
  });
  
  app.post('/register', (req, res) => {
    const { username, email, password, passConf } = req.body;
  
    if (!username || !email || !password || !passConf) {
      return res.render('register', {
        title: 'Регистрация',
        error: 'Заполните все поля.',
      });
    }
  
    if (password !== passConf) {
      return res.render('register', {
        title: 'Регистрация',
        error: 'Пароли не совпадают.',
      });
    }
  
    const userExists = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  
    if (userExists) {
      return res.render('register', {
        title: 'Регистрация',
        error: 'Пользователь с таким email уже существует.',
      });
    }
  
    users.push({
      username,
      email: email.toLowerCase(),
      password,
    });
  
    res.redirect('/login');
  });

app.get("/login", (req,res) => {
    res.render("login", {
        title: "Вход в аккаунт",
        error: null
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        (item) =>
            item.email.toLowerCase() === email.toLowerCase() &&
            item.password === password
    );

    if (!user) {
        return res.render('login', {
            title: 'Вход',
            error: 'Неверный email или пароль.',
        });
    }

    req.session.user = {
        username: user.username,
        email: user.email,
    };

    res.redirect('/');
});

app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

app.get("/products", (req,res) => {
    res.render("products", {
        title: "Товары",
        products: products
    });
});

app.get("/products/cheap", (req,res) => {
    const cheapProducts = products.filter(product => product.price < 3000);
    res.render("products", {
        title: "недорогие товары",
        products:cheapProducts
    });
});

module.exports = app;

//export default app;

// app.listen(3000, () => {
//     console.log("Сервер запущен: http://localhost:3000");
// });
