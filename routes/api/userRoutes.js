const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUserById)
  .delete(deleteUserById);

  router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
