const { engine } = require("express-handlebars");
const experss = require('express');
const path = require("path");
const session = require('express-session');

const app = express();

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
    res.render("home", {
        title: "Главная страница"
    });
});

app.get("/about", (req,res) => {
    res.render("about", {
        title: "0 нас",
        description: "Мы создаём учебный магазин"
    });
});

app.get("/register", (req,res) => {
    res.render("register", {
        title: "Регистрация"
    });
});

app.get("/login", (req,res) => {
    res.render("login", {
        title: "Вход в аккаунт"
    });
});

app.get("/products/cheap", (req,res) => {
    const cheapProducts = products.filter(product => product.price < 3000);
    res.render("product", {
        title: "недорогие товары",
        products:cheapProducts
    });
});

//export default app;

// app.listen(3000, () => {
//     console.log("Сервер запущен: http://localhost:3000");
// });
