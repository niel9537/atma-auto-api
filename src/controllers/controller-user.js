const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);
const jwt = require('jsonwebtoken');
module.exports = {

    //login
    login(req,res){
        let email = req.body.user_email;
        let password = req.body.user_password;
        const userdata = {
            email,
            password
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM users WHERE user_email = ? and user_password = ?;
                `
            , [email,password],
            async function (error, results) {
                if(error) throw error;
                if(results.length > 0){
                    jwt.sign(userdata,'secret', {expiresIn:'1800s'},(err,token) =>{
                        if(err){
                            console.log(err);
                            res.sendStatus(304);
                            return
                        }
                        const Token = token;
                        console.log('Token ',Token);
                        res.send({
                            status : 'success',
                            success: true,
                            message: 'Data Successfully Retrieved',
                            token:[{
                                token : Token,
                                expiredAt : '30 minute'
                            }],
                            data: results

                        });
                    });
                }else {
                    await res.send({
                        status : 'fail',
                        success: true,
                        message: 'No Data Retrieved',
                        token:[{
                            token : '',
                            expiredAt : ''
                        }],
                        data: results
                    });
                }

            });
            connection.release();
        })
    }
}