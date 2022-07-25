const express = require('express');

const router = express.Router();
const helloRoute = require("../controllers/helloControllers")


router.get('/api/', helloRoute.helloController);

module.exports = router;