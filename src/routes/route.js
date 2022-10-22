const router = require('express').Router();
const {sparepart,user,service, verifyUser}   = require('../controllers');

router.get('/service', verifyUser, service.getDataService);
router.get('/service/:id', verifyUser, service.getDataServiceByID);
router.post('/service/add', verifyUser, service.addDataService);
router.post('/service/edit', verifyUser, service.editDataService);
router.get('/service/delete/:id', verifyUser, service.deleteDataService);
router.get('/sparepart', verifyUser, sparepart.getDataSparepart);
router.get('/sparepart/:id', verifyUser, sparepart.getDataSparepartByID);
router.post('/sparepart/add', verifyUser,sparepart.uploadImg, sparepart.addDataSparepart);
router.post('/sparepart/edit', verifyUser, sparepart.editDataSparepart);
router.get('/sparepart/delete/:id', verifyUser, sparepart.deleteDataSparepart);
router.post('/auth/login', user.login);
module.exports = router;