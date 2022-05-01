const {Router} = require("express");
const authController = require('../controllers/HelperAuthController')
const router = Router();

router.get('/helper/signup', authController.signup_get);
router.post('/helper/signup', authController.signup_post);
router.get('/helper/login', authController.login_get);
router.post('/helper/login', authController.login_post);
router.post('/helper/auth', authController.auth)




module.exports = router;


