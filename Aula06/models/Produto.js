const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    estoqueMinimo: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    tableName: 'Produtos',
    timestamps: false
});

// Sincronizar o modelo com o banco de dados
// Sincronizar o modelo com o banco de dados
(async () => {
    await Produto.sync();
    console.log('Modelo User sincronizado com o banco de dados.');
})();

module.exports = Produto;