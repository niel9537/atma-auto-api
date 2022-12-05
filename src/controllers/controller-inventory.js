const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=>{
    console.error(err);
});


module.exports = {
    //getAllSpareparts
    // uploadImg,
    getDataInventory(req,res){
         pool.getConnection(function(err,connection){
            if(err)throw err;
             connection.query(
                `
                SELECT * FROM inventories;
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
    getDataInventoryByID(req,res){
        let id = req.params.id;
        console.log('Inventory ID',id);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM inventories WHERE inventory_id = ?;
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
    addDataInventory(req,res){
        let data = {
            supplier_id : req.body.supplier_id,
            inventory_name : req.body.inventory_name,
            inventory_price : req.body.inventory_price,
            inventory_quantity : req.body.inventory_quantity,
            inventory_createdat : req.body.inventory_createdat
        }
        console.log('Inventory Data',data);

        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO inventories SET ?;
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
    editDataInventory(req,res){
        let dataEdit = {
            supplier_id : req.body.supplier_id,
            inventory_name : req.body.inventory_name,
            inventory_price : req.body.inventory_price,
            inventory_quantity : req.body.inventory_quantity,
            inventory_createdat : req.body.inventory_createdat
        }
        let id = req.body.inventory_id
        console.log('Inventory ID',dataEdit);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE inventories SET ? WHERE inventory_id = ?;
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
    deleteDataInventory(req,res){
        let id = req.body.id
        console.log('Inventory ID',id);
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM inventories WHERE inventory_id = ?;
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
    },
    getListSupplier(req,res){
        pool.getConnection(function(err,connection){
           if(err)throw err;
            connection.query(
               `
               SELECT supplier_id,supplier_name FROM suppliers;
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
   }
}