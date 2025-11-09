const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController.js');

router.get('/produtos', ProdutoController.listAll);
router.get('/produtos/:id', ProdutoController.getById);
router.post('/produtos', ProdutoController.create);
router.put('/produtos/:id', ProdutoController.update);
router.delete('/produtos/:id', ProdutoController.delete);

module.exports = router;