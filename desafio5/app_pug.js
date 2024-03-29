const express = require("express");
const Contenedor = require("./class/contenedor");

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

const productos = new Contenedor(__dirname + "/data/productos.json");
productos.init();

app.set('views', './views/pug')
app.set('views engine', 'pug')

app.get('/', (req, res) => {
    let content = productos.content
    return res.render('index.pug', {content})
})

app.post("/productos", (req, res) => {
    productos.save(req.body)
    let content = productos.content
    return res.render('productos.pug', {content});
});

app.get("/productos", (req, res) => {
    let content = productos.content
    console.log(content)
    return res.render('productos.pug', {content});
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}/ para vista PUG`);
})