const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=>{
    console.error(err);
});


module.exports = {
    //getAllSpareparts
    // uploadImg,
    getDataCustomer(req,res){
         pool.getConnection(function(err,connection){
            if(err)throw err;
             connection.query(
                `
                SELECT * FROM users WHERE user_role IN ('4') ;
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
    // //getServiceByID
    getDataCustomerByID(req,res){
        let id = req.params.id;
        console.log('Customer ID',id);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM users WHERE user_id = ? AND user_role IN ('4');
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
    addDataCustomer(req,res){
        // console.log('Service Content Type',req.get('Content-Type'));
        // console.log('Service',req.body);
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let data = {
            user_name : req.body.user_name,
            user_email : req.body.user_email,
            user_password : req.body.user_password,
            user_fullname : req.body.user_fullname,
            user_address : req.body.user_address,
            user_phonenumber : req.body.user_phonenumber,
            user_role : 4,
            user_createdat : year + "-" + month + "-" + date,
            user_status : 1,
        }
        console.log('Customer Data',data);

        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO users SET ?;
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

    editDataCustomer(req,res){
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let dataEdit = {
            user_name : req.body.user_name,
            user_email : req.body.user_email,
            user_password : req.body.user_password,
            user_fullname : req.body.user_fullname,
            user_address : req.body.user_address,
            user_phonenumber : req.body.user_phonenumber,
            user_role : 4,
            user_createdat : year + "-" + month + "-" + date,
            user_status : 1,
        }
        let id = req.body.user_id
        console.log('Customer ID',dataEdit,id);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE users SET ? WHERE user_id = ?;
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
    deleteDataCustomer(req,res){
        let id = req.params.id
         console.log('Customer ID',id);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM users WHERE user_id = ?;
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