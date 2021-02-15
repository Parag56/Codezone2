const express=require('express')
const { check } = require('express-validator')
const userController=require('../controllers/user-controller')
const router=express.Router()
router.post('/signup', [check('name').not().isEmpty(),check('email').normalizeEmail().isEmail(),check('password').isLength({ min: 5 })],userController.signup)
router.post('/login',userController.login)
router.get('/:uid',userController.getuser)
router.post("/forgotpassword",userController.forgotpassword)
router.get('/changepassword/:hash',(req,res,next)=>{
    let id=req.params.hash 
    res.render('index',{userid:id})
})
router.post("/resetpassword",userController.resetpassword)
router.get("/activate/user/:hash",userController.verifyuser)
module.exports=router