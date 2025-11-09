const express = require('express');
const sequelize = require('./config/database.js');
const User = require('./models/User.js');
const Cliente = require('./models/Cliente.js');
const Produto = require('./models/Produto.js');
const Venda = require("./models/Venda.js")
const ItemVenda = require("./models/ItemVenda.js");
const UserController = require('./controllers/UserController.js');
const VendaController = require('./controllers/VendaController.js');


Venda.belongsTo(User, { foreignKey: 'idUser' });
Venda.belongsTo(Cliente, { foreignKey: 'idCliente' });
Venda.hasMany(ItemVenda, { foreignKey: 'idVenda' });
ItemVenda.belongsTo(Venda, { foreignKey: 'idVenda' });
ItemVenda.belongsTo(Produto, { foreignKey: 'idProduto' });

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configurar cors
app.use(cors({
    origin: '*', // Permitir todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

app.use("/v1/", require("./routes/UserRoutes.js"))
app.use("/v1/", require("./routes/VendaRoutes.js"))
app.use("/v1/", require("./routes/ClienteRoutes.js"))

// ROTAS DO PRODUTOCONTROLLER
app.get('/v1/produtos', ProdutoController.listAll);
app.get('/v1/produtos/:id', ProdutoController.getById);
app.post('/v1/produtos', ProdutoController.create);
app.put('/v1/produtos/:id', ProdutoController.update);
app.delete('/v1/produtos/:id', ProdutoController.delete);

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/v1/vendas_ant/:id',   async (req, res)  => {
  const allUser =  await Venda.findByPk(req.params.id, {
    include: [
      { model: User, attributes: ['id', 'name', 'email'] },
      { model: Cliente, attributes: ['id', 'name', 'email', 'endereco'] },
      { model: ItemVenda, include: [{ model: Produto, attributes: ['id', 'name', 'preco','estoqueMinimo'] }] }
    ]
  });
  res.status(200).json({venda:allUser})
});


// Start the server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`Banco de dados SQLite sincronizado`);
    });
}).catch(err => {
    console.error('Erro ao sincronizar banco de dados:', err);
});