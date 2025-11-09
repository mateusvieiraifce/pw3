const Produto = require('../models/Produto.js');
const Sequelize = require('sequelize');

module.exports = class ProdutoController {
    // Listar todos os produtos
    static async listAll(req, res) {
        try {
            const produtos = await Produto.findAll();
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar produtos' });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const produto = await Produto.findByPk(id);
            if (produto) {
                res.status(200).json(produto);
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            const produto = await Produto.findByPk(id);
            if (produto) {
                await produto.destroy();
                res.status(204).json({ message: 'Produto apagado com sucesso!' });
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar produto' });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        try {
            const produto = await Produto.findByPk(id);
            if (produto) {
                const { name, preco, estoqueMinimo } = req.body;
                produto.name = name;
                produto.preco = preco;
                produto.estoqueMinimo = estoqueMinimo;
                await produto.save();
                res.status(200).json(produto);
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    }

    static async create(req, res) {
        const { name, preco, estoqueMinimo } = req.body;
        try {
            const newProduto = await Produto.create({ name, preco, estoqueMinimo });
            res.status(201).json(newProduto);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar produto' });
        }
    }
}