const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport({
    service:'gmail',
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'convergence.arr@gmail.com',
        pass: 'gvxsrgnehfawmgro',
    },
    secure: true,
}));

module.exports = {
    //forget password
    forgetpassword(req,res){
        let user_name = req.body.user_name;
        pool.getConnection(function(err,connection){
            if(err)throw err;
             connection.query(
                `
                SELECT * FROM users WHERE user_name = ? ;
                `
                ,[user_name],
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
                                expiredAt : '500 minute'
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
    },
    register(req,res){
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
            user_role : req.body.user_role,
            user_createdat : year + "-" + month + "-" + date,
            user_status : 1,
        }
        console.log('Service Data',data);

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

    sendmail(req,res){
        const {to, subject, text } = req.body;
        const mailData = {
            from: 'atmaauto.official@gmail.com',
            to: to,
            subject: subject,
            text: text,
            html: '<b><img src="https://hawkemedia.com/wp-content/uploads/Email-Gif.gif" height = 100 width =100  /> Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
        };

        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                return console.log(error);
            }
            res.status(200).send({ message: "Mail send", message_id: info.messageId });
        });
    }
}