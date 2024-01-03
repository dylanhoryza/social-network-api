const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThoughtById,
  deleteThoughtById,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

module.exports = router;