const router = require('express').Router();
const homeController = require('../controllers/homeController');
const cubeController = require('../controllers/cubeController');
router.get('/', homeController.getHomePage)
router.get('/about', homeController.getAboutPage);

router.get('/create', cubeController.getCreatCube);
router.post('/create', cubeController.postCreateCube);
router.get('/details/:cubeId' , cubeController.getDetails);
module.exports = router;