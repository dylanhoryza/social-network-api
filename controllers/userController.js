const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update user by its ID
  async updateUserById(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        {_id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete user by its ID
  async deleteUserById(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);

      if (!deletedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a friend to a specific User
  async addFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        {_id: req.params.userId},
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(friend);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        {_id: req.params.userId},
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.json({message: `${friend.username} was deleted`});
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
