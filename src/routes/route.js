const router = require('express').Router();
const {sparepart,user,service, verifyUser,employee,customer,supplier, inventory, transaksi}   = require('../controllers');

router.post('/transaksi/add', verifyUser, transaksi.addDataTransaksi);
router.post('/transaksi/getUserByEmail', verifyUser, transaksi.getDataUserByEmail);
router.get('/transaksi', verifyUser, transaksi.getListTransaction);
router.get('/transaksi/getInvoice', verifyUser, transaksi.getInvoice);
router.post('/transaksi/confirm', verifyUser, transaksi.paymentConfirmation);
router.get('/transaksi/invoice', verifyUser, transaksi.invoice);
router.get('/transaksi/report', verifyUser, transaksi.report);
router.get('/inventory/listsupplier', verifyUser, inventory.getListSupplier);
router.get('/inventory', verifyUser, inventory.getDataInventory);
router.get('/inventory/:id', verifyUser, inventory.getDataInventoryByID);
router.post('/inventory/add', verifyUser, inventory.addDataInventory);
router.post('/inventory/edit', verifyUser, inventory.editDataInventory);
router.get('/inventory/delete/:id', verifyUser, inventory.deleteDataInventory);



router.get('/supplier', verifyUser, supplier.getDataSupplier);
router.get('/supplier/:id', verifyUser, supplier.getDataSupplierByID);
router.post('/supplier/add', verifyUser, supplier.addDataSupplier);
router.post('/supplier/edit', verifyUser, supplier.editDataSupplier);
router.get('/supplier/delete/:id', verifyUser, supplier.deleteDataSupplier);


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