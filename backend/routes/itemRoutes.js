const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');

router.get('/', getItems);
router.get('/search', getItems);
router.get('/:id', getItemById);
router.post('/', auth, createItem);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);

module.exports = router;
