var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const NodeVersion = process.versions;
  res.render('index', { data: { nodeVerison: NodeVersion.node, title: "Azure Webapp példa alkalmazás" } });
});

module.exports = router;
