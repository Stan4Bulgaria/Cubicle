const router = require('express').Router();
const homeController = require('../controllers/homeController');
const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryController');
const authController = require('../controllers/authController');
const { route } = require('../controllers/accessoryController');
const authentification = require('../middlewares/authMiddleware');
router.get('/', homeController.getHomePage)
router.get('/about', homeController.getAboutPage);
router.get('/create',authentification.isAuthenticated, cubeController.getCreatCube);
router.post('/create',authentification.isAuthenticated, cubeController.postCreateCube);
router.use('/', authController);

router.get('/details/:cubeId' , cubeController.getDetails);
router.get('/details/:cubeId/attach',cubeController.getAttachAccessory);
router.post('/details/:cubeId/attach',cubeController.postAttachAccessory);
router.use('/accessory',authentification.isAuthenticated, accessoryController);

router.get('/edit/:cubeId',authentification.isAuthenticated, cubeController.getEditCube);
router.get('/delete/:cubeId',authentification.isAuthenticated ,cubeController.getDeleteCube);

router.post('/edit/:cubeId', cubeController.postEditCube);
router.post('/delete/:cubeId', cubeController.postDeleteCube);
module.exports = router;