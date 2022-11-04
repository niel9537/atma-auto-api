const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=>{
    console.error(err);
});


module.exports = {
    //getAllSpareparts
    // uploadImg,
    getDataSupplier(req,res){
         pool.getConnection(function(err,connection){
            if(err)throw err;
             connection.query(
                `
                SELECT * FROM suppliers;
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
    // //getServiceByID
    getDataSupplierByID(req,res){
        let id = req.params.id;
        console.log('Supplier ID',id);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM suppliers WHERE supplier_id = ?;
                `
            , [id],
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
    // //addService
    addDataSupplier(req,res){
        // console.log('Service Content Type',req.get('Content-Type'));
        // console.log('Service',req.body);
        let data = {
            supplier_name : req.body.supplier_name,
            supplier_phonenumber : req.body.supplier_phonenumber,
            supplier_address : req.body.supplier_address,
        }
        console.log('Supplier Data',data);

        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO suppliers SET ?;
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
    // // updateService
    editDataSupplier(req,res){
        let dataEdit = {
            supplier_name : req.body.supplier_name,
            supplier_phonenumber : req.body.supplier_phonenumber,
            supplier_address : req.body.supplier_address,
        }
        let id = req.body.supplier_id
        console.log('Supplier ID',dataEdit);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE suppliers SET ? WHERE supplier_id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;
                res.send({
                    'status': 'success',
                    success: true,
                    message: 'Data Successfully Saved',
                });
            });
            connection.release();
        })
    },
    // Delete Supplier
    deleteDataSupplier(req,res){
        let id = req.params.id
        console.log('Supplier ID',id);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM suppliers WHERE supplier_id = ?;
                `
            , [id],
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
    }
}