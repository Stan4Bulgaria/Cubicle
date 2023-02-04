const router = require('express').Router();
const homeController = require('../controllers/homeController');
const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryController');
const { route } = require('../controllers/accessoryController');
router.get('/', homeController.getHomePage)
router.get('/about', homeController.getAboutPage);
router.get('/create', cubeController.getCreatCube);
router.post('/create', cubeController.postCreateCube);
router.get('/details/:cubeId' , cubeController.getDetails);
router.get('/details/:cubeId/attach',cubeController.getAttachAccessory);
router.post('/details/:cubeId/attach',cubeController.postAttachAccessory);
router.use('/accessory', accessoryController);
module.exports = router;