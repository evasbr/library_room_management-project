const express = require('express');
const authorization = require('../middleware/auth');

const {
  seeAllUser, findUserByEmail, updateUserInfo,
} = require('../controllers/index');
const validateUpdatedMember = require('../middleware/validation/update-member-validation');

const router = express.Router();

router.get('/all', seeAllUser);
router.get('/search/', findUserByEmail);
router.put('/:code_member', authorization, validateUpdatedMember, updateUserInfo);

module.exports = router;
