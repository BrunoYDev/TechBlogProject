const express = require('express');
const router = express.Router();

router.get('/categories', (req,res) => {
    res.send('Categories route')
});

router.get('/admin/categories/new', (req,res) => {
    res.send('Create new Categorie route')
});

module.exports = router;