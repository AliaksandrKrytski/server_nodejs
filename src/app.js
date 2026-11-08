const { engine } = require("express-handlebars");
const path = require("path");

const app = express();

app.engine("handlebars", engine());

app.set("view engine", "handlebars");

app.set(
    "views",
    path.join(__dirname, "views")
);

app.use(express.static(
    path.join(__dirname, "../public")
));

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

export default app;

// app.listen(3000, () => {
//     console.log("Сервер запущен: http://localhost:3000");
// });
