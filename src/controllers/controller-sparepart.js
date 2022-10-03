const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=>{
    console.error(err);
});

module.exports = {
    //getAllSpareparts
    getDataSparepart(req,res){
        pool.getConnection(function(err,connection){
            if(err)throw err;
            connection.query(
                `
                SELECT * FROM spareparts;
                `
                , function(err,results){
                if(err)throw err;
                res.send({
                    success : true,
                    message : 'Data Successfully Retrieved',
                    data    : results
                });
            });
            connection.release();
        })
    },
    //getSparepartByID
    getDataSparepartByID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM spareparts WHERE sparepart_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;
                res.send({
                    success: true,
                    message: 'Data Successfully Retrieved',
                    data: results
                });
            });
            connection.release();
        })
    },
    //addSparepart
    addDataSparepart(req,res){
        let data = {
            sparepart_code : req.body.sparepart_code,
            sparepart_place : req.body.sparepart_place,
            sparepart_merk : req.body.sparepart_merk,
            sparepart_type : req.body.sparepart_type
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO spareparts SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;
                res.send({
                    success: true,
                    message: 'Data Successfully Added',
                });
            });
            connection.release();
        })
    },
    // updateSparepart
    editDataSparepart(req,res){
        let dataEdit = {
            sparepart_code : req.body.sparepart_code,
            sparepart_place : req.body.sparepart_place,
            sparepart_merk : req.body.sparepart_merk,
            sparepart_type : req.body.sparepart_type
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE spareparts SET ? WHERE sparepart_id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;
                res.send({
                    success: true,
                    message: 'Data Successfully Saved',
                });
            });
            connection.release();
        })
    },
    // Delete data karyawan
    deleteDataSparepart(req,res){
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM spareparts WHERE sparepart_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;
                res.send({
                    success: true,
                    message: 'Data Successfully Deleted'
                });
            });
            connection.release();
        })
    }
}