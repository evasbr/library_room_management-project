const express = require('express');
const { seeAllRoom } = require('../controllers/index');

const router = express.Router();

router.get('/all', seeAllRoom);

module.exports = router;
