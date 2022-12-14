const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);
var multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadImg = multer({storage: storage}).single('sparepart_image');
pool.on('error',(err)=>{
    console.error(err);
});


module.exports = {
    //getAllSpareparts
    uploadImg,
    getDataSparepart(req,res){
         pool.getConnection(function(err,connection){
            if(err)throw err;
            console.log(req.body);
             connection.query(
                `
                SELECT * FROM spareparts;
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
    //getSparepartByID
    getDataSparepartByID(req,res){
        let id = req.params.id;
        console.log('Sparepart ID',id);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM spareparts WHERE sparepart_id = ?;
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
    //addSparepart
    addDataSparepart(req,res){
        let data = {
            sparepart_code : req.body.sparepart_code,
            sparepart_place : req.body.sparepart_place,
            sparepart_merk : req.body.sparepart_merk,
            sparepart_type : req.body.sparepart_type,
            sparepart_stock : req.body.sparepart_stock,
            sparepart_price : req.body.sparepart_price,
            sparepart_image : req.body.sparepart_image
        }
        console.log('Sparepart Data',data);

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
                    status: 'success',
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
            sparepart_type : req.body.sparepart_type,
            sparepart_stock : req.body.sparepart_stock,
            sparepart_price : req.body.sparepart_price,
            sparepart_image : req.body.sparepart_image
        }
        let id = req.body.sparepart_id
        console.log('Sparepart Data',dataEdit);
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
                    'status': 'success',
                    success: true,
                    message: 'Data Successfully Saved',
                });
            });
            connection.release();
        })
    },
    // Delete data karyawan
    deleteDataSparepart(req,res){
        let id = req.params.id
        console.log('Sparepart ID',id);
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
                    status : 'success',
                    success: true,
                    message: 'Data Successfully Deleted'
                });

            });
            connection.release();
        })
    }
}