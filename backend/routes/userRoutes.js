const express = require('express');
const { registerUser, authUser, authGoogle, authFacebook, updateProfilePicture } = require('../controllers/userControllers');
const { protectData } = require('../middlewares/authMiddleware');


const router = express.Router();


router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/google').post(authGoogle);
router.route('/facebook').post(authFacebook);
router.route('/profile').post(protectData, updateProfilePicture);



module.exports = router;