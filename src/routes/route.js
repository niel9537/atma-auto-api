const router = require('express').Router();
const {sparepart,user,service, verifyUser,employee,customer}   = require('../controllers');



router.post('/customer/edit', verifyUser, customer.editDataCustomer);
router.get('/customer', verifyUser, customer.getDataCustomer);
router.get('/customer/:id', verifyUser, customer.getDataCustomerByID);
router.post('/customer/add', verifyUser, customer.addDataCustomer);
router.get('/customer/delete/:id', verifyUser, customer.deleteDataCustomer);


router.post('/employee/edit', verifyUser, employee.editDataEmployee);
router.get('/employee', verifyUser, employee.getDataEmployee);
router.get('/employee/:id', verifyUser, employee.getDataEmployeeByID);
router.post('/employee/add', verifyUser, employee.addDataEmployee);
router.get('/employee/delete/:id', verifyUser, employee.deleteDataEmployee);


router.get('/service', verifyUser, service.getDataService);
router.get('/service/:id', verifyUser, service.getDataServiceByID);
router.post('/service/add', verifyUser, service.addDataService);
router.post('/service/edit', verifyUser, service.editDataService);
router.get('/service/delete/:id', verifyUser, service.deleteDataService);
router.get('/sparepart', verifyUser, sparepart.getDataSparepart);
router.get('/sparepart/:id', verifyUser, sparepart.getDataSparepartByID);
router.post('/sparepart/add', verifyUser,sparepart.uploadImg, sparepart.addDataSparepart);
router.post('/sparepart/edit', verifyUser,sparepart.uploadImg, sparepart.editDataSparepart);
router.get('/sparepart/delete/:id', verifyUser, sparepart.deleteDataSparepart);
router.post('/auth/login', user.login);
router.post('/auth/register', user.register);
router.post('/auth/sendmail', user.sendmail);
router.post('/auth/forgetpassword', user.forgetpassword);
module.exports = router;