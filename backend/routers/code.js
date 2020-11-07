const express=require('express')
const codeController=require('../controllers/code-controller')
const { check } = require('express-validator')
const router=express.Router()
router.get('/:uid',codeController.getcodesusingUserId)
router.post('/createcode',check('title').not().isEmpty(),codeController.createCodes)
router.delete('/cid',codeController.deleteCodes)
module.exports=router