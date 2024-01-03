const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUserById,
  deleteUserById,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = router;
