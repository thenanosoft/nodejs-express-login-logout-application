const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const { v4:uuidv4 } = require("uuid")

const router = require("./routes")

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret: uuidv4(),
    resave: 'false',
    saveUninitialized: true
}));

app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use("/routes", router)

app.get("/", (req, res) => {
    res.render('base',{title: "Login System"});
})

app.listen(port, () => console.log(`Listening to the server on http://localhost:${port}`));