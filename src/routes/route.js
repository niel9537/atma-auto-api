const router = require('express').Router();
const {sparepart,user, verifyUser}   = require('../controllers');

router.get('/sparepart', verifyUser, sparepart.getDataSparepart);
router.get('/sparepart/:id', verifyUser, sparepart.getDataSparepartByID);
router.post('/sparepart/add', verifyUser,sparepart.uploadImg, sparepart.addDataSparepart);
router.post('/sparepart/edit', verifyUser, sparepart.editDataSparepart);
router.post('/sparepart/delete', verifyUser, sparepart.deleteDataSparepart);
router.post('/auth/login', user.login);
module.exports = router;