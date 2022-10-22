const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);


module.exports = {
    //getAllSpareparts
    // uploadImg,
    getDataService(req,res){
         pool.getConnection(function(err,connection){
            if(err)throw err;
             connection.query(
                `
                SELECT * FROM services;
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
    getDataServiceByID(req,res){
        let id = req.params.id;
        console.log('Sparepart ID',id);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM services WHERE service_id = ?;
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
    addDataService(req,res){
        let data = {
            user_id : req.body.user_id,
            service_name : req.body.service_name,
            service_price : req.body.service_price,
            service_cost : req.body.service_cost,
            service_category : req.body.service_category,
        }
        // console.log('Sparepart Data',data);

        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO services SET ?;
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
    editDataService(req,res){
        let dataEdit = {
            user_id : req.body.user_id,
            service_name : req.body.service_name,
            service_price : req.body.service_price,
            service_cost : req.body.service_cost,
            service_category : req.body.service_category,
        }
        let id = req.body.service_id
        // console.log('Sparepart Data',dataEdit);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE services SET ? WHERE service_id = ?;
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
    // // Delete data Jasa
    deleteDataService(req,res){
        let id = req.params.id
        // console.log('Sparepart ID',id);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM services WHERE service_id = ?;
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