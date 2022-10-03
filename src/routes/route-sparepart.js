const router = require('express').Router();
const {sparepart}   = require('../controllers');

router.get('/sparepart', sparepart.getDataSparepart);
router.get('/sparepart/:id', sparepart.getDataSparepartByID);
router.post('/sparepart/add', sparepart.addDataSparepart);
router.post('/sparepart/edit', sparepart.editDataSparepart);
router.post('/sparepart/delete', sparepart.deleteDataSparepart);

module.exports = router;