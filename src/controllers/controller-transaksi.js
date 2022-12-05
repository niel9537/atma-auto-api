const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=>{
    console.error(err);
});


module.exports = {
    //getAllSpareparts
    // uploadImg,
    getInvoice(req,res){
        pool.getConnection(function(err,connection){
           if(err)throw err;
            connection.query(
               `
               SELECT t.transaction_id, t.transaction_subtotal, t.transaction_total,t.transaction_createdat,t.transaction_status,t.transaction_flag,u.user_name as customer_name, x.user_name as cashier_name, s.sparepart_merk
               FROM transactions t
               JOIN users u ON t.customer_id = u.user_id
               JOIN users x ON t.cashier_id = x.user_id
               JOIN spareparts s ON t.sparepart_id = s.sparepart_id ORDER BY t.transaction_id DESC LIMIT 1;
               `
               ,
               async function(err,results){
               if(err)throw err;
               if(results.length > 0){
                   await res.send({
                       status : 'success',
                       success: true,
                       message: 'Data Successfully Retrieved',
                       data: results
                   });
               }else {
                   await res.status(400).send({
                       status : 'fail',
                       success: true,
                       message: 'No Data Retrieved',
                       data: results
                   });
               }
           });
           connection.release();
       })
   },
    getListTransaction(req,res){
        pool.getConnection(function(err,connection){
           if(err)throw err;
            connection.query(
               `
               SELECT t.transaction_id, t.transaction_subtotal, t.transaction_total,t.transaction_createdat,t.transaction_status,t.transaction_flag,u.user_name as customer_name, x.user_name as cashier_name, s.sparepart_merk
               FROM transactions t
               JOIN users u ON t.customer_id = u.user_id
               JOIN users x ON t.cashier_id = x.user_id
               JOIN spareparts s ON t.sparepart_id = s.sparepart_id ;
               `
               ,
               async function(err,results){
               if(err)throw err;
               if(results.length > 0){
                   await res.send({
                       status : 'success',
                       success: true,
                       message: 'Data Successfully Retrieved',
                       data: results
                   });
               }else {
                   await res.status(400).send({
                       status : 'fail',
                       success: true,
                       message: 'No Data Retrieved',
                       data: results
                   });
               }
           });
           connection.release();
       })
   },
    getListSparepart(req,res){
         pool.getConnection(function(err,connection){
            if(err)throw err;
             connection.query(
                `
                SELECT * FROM spareparts ;
                `
                ,
                async function(err,results){
                if(err)throw err;
                if(results.length > 0){
                    await res.send({
                        status : 'success',
                        success: true,
                        message: 'Data Successfully Retrieved',
                        data: results
                    });
                }else {
                    await res.status(400).send({
                        status : 'fail',
                        success: true,
                        message: 'No Data Retrieved',
                        data: results
                    });
                }
            });
            connection.release();
        })
    },
    getDataUserByEmail(req,res){
        let email = req.body.user_email;
        console.log('User Email',email);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM users WHERE user_email = ?;
                `
            , [email],
            async function (error, results) {
                if(error) throw error;
                if(results.length > 0){
                    await res.send({
                        status : 'success',
                        success: true,
                        message: 'Data Successfully Retrieved',
                        data: results
                    });
                }else {
                    await res.send({
                        status : 'fail',
                        success: true,
                        message: 'No Data Retrieved',
                        data: results
                    });
                }

            });
            connection.release();
        })
    },
    addDataTransaksi(req,res){
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let data = {
            customer_id : req.body.customer_id,
            cashier_id : req.body.cashier_id,
            sparepart_id : req.body.sparepart_id,
            transaction_subtotal : req.body.transaction_subtotal,
            transaction_total : req.body.transaction_total,
            transaction_createdat : year + "-" + month + "-" + date,
            transaction_flag : req.body.transaction_flag,
            cs_id : '',
            pegawai_id : '',
            service_id : '',
            transaction_status : 1,
        }
        console.log('Transaction Data',data);

        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO transactions SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;
                res.send({
                    status: 'success',
                    success: true,
                    message: 'Data Successfully Added',
                });
            });
            connection.release();
        })
    },
    paymentConfirmation(req,res){
        let id = req.body.transaction_id
        console.log('Pembayaran ID',id);
        let data = {
            transaction_status : req.body.transaction_status
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE transactions SET ? WHERE transaction_id = ?;
                `
            , [data,id],
            function (error, results) {
                if(error) throw error;
                res.send({
                    status : 'success',
                    success: true,
                    message: 'Data Successfully Deleted'
                });

            });
            connection.release();
        })
    },
    invoice(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT t.transaction_id, t.transaction_subtotal, t.transaction_total,t.transaction_createdat,t.transaction_status,t.transaction_flag,u.user_name as customer_name, x.user_name as cashier_name, s.sparepart_merk
                FROM transactions t
                JOIN users u ON t.customer_id = u.user_id
                JOIN users x ON t.cashier_id = x.user_id
                JOIN spareparts s ON t.sparepart_id = s.sparepart_id ORDER BY t.transaction_id DESC LIMIT 1;
                `
            ,
            function (error, results) {
                if(error) throw error;
                res.send({
                    status : 'success',
                    success: true,
                    message: 'Data Successfully Deleted'
                });

            });
            connection.release();
        })
    },
    report(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT COUNT(transaction_id) as JumlahTransaksi, SUM(transaction_total) as TotalTransaksi,SUM(transaction_total) as TotalPemasukan,COUNT(t.sparepart_id) as Produk,SUM(s.sparepart_price) as Cost,SUM(s.sparepart_price) as TotalPengeluaran, 
                SUM((t.transaction_total - s.sparepart_price)) as TotalPendapatanBersih 
                FROM transactions t JOIN users u ON t.customer_id = u.user_id JOIN users x ON t.cashier_id = x.user_id JOIN spareparts s ON t.sparepart_id = s.sparepart_id WHERE t.transaction_status = 0 ;
                `
            ,
            async function (error, results) {
                if(error) throw error;
                if(results.length > 0){
                    await res.send({
                        status : 'success',
                        success: true,
                        message: 'Data Successfully Retrieved',
                        data: results
                    });
                }else {
                    await res.send({
                        status : 'fail',
                        success: true,
                        message: 'No Data Retrieved',
                        data: results
                    });
                }

            });
            connection.release();
        })
    },
}