const router = require('express').Router();
const {sparepart,user, verifyUser}   = require('../controllers');

router.get('/sparepart', verifyUser, sparepart.getDataSparepart);
router.get('/sparepart/:id', sparepart.getDataSparepartByID);
router.post('/sparepart/add', sparepart.uploadImg, sparepart.addDataSparepart);
router.post('/sparepart/edit', sparepart.editDataSparepart);
router.post('/sparepart/delete', sparepart.deleteDataSparepart);
router.post('/auth/login', user.login);
module.exports = router;