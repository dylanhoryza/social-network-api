const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res, next) => {
  res.status(404).send('Wrong route!');
});


module.exports = router;