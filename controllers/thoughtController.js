const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);

      await User.findByIdAndUpdate(
        req.body.userId, 
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );

      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update thought by its ID
  async updateThoughtById(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        {_id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThoughtById(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

      if (!deletedThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
    // Add a thought reaction
    async addThoughtReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Remove thought reaction
    async removeThoughtReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
};