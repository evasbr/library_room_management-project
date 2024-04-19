const express = require('express');
const {
  seeAllUser, findUserByEmail, updateUserInfo,
} = require('../controllers/index');
const validateUpdatedMember = require('../middleware/validation/update-member-validation');

const router = express.Router();

router.get('/all', seeAllUser);
router.get('/search/', findUserByEmail);
router.put('/:code_member', validateUpdatedMember, updateUserInfo);

module.exports = router;
