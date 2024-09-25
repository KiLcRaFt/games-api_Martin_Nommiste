const app = require('express')()
const port = 8080
const swaggerUi = require('swagger-ui-express')
//const swaggerDocument = require('./docs/swagger.json');
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

const games = [
    {id:1, name: "Witcher 3", price: 29.99},
    {id:2, name: "Cyberpunk 2077", price: 59.99},
    {id:3, name: "Minecraft", price: 26.99},
    {id:4, name: "CS:go", price: 0},
    {id:5, name: "Roblox", price: 0},
    {id:6, name: "GTA V", price: 29.99},
    {id:7, name: "Valorant", price: 0},
    {id:8, name: "Forza Horizon 5", price: 59.99},
]

app.get('/games', (req, res) => {
    res.send(games)
})

app.get('/games/:id', (req, res) => {
    if(typeof games[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "Game not found"})
    }
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})