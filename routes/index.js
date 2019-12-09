const express = require('express');
const router = express.Router();


/* GET create page. */
router.get('/create', function(req, res, next) {
  const {error} = req.query;
  const token = req.csrfToken();
  console.log(req.csrfToken());
  res.render('create', {error: error, token:token});
});

module.exports = router;
