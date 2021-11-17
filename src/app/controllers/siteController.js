const { query, request } = require('express');
var config = require('../controllers/index');
const sql = require('mssql/msnodesqlv8');
// const sqlReq = new sql.Request()
const ps = new sql.PreparedStatement()

class SiteController {
    index(req, res, next) {
        res.render('home')
    }

    register(req, res, next) {
        res.render('register');
    }

    timkiem(req, res, next) {
        sql.connect(config, function (err) {
            if (err) {
                console.log('Co loi: ' + err);
            }
            let sqlReq = new sql.Request();
            sqlReq
                .query('Select * from ACCOUNT')
                .then((data) => {
                    console.table(data.recordset);
                    res.send('00');
                })
                .catch((err) => {
                    res.send(err);
                });
        });
    }

    login(req, res, next) {
        res.render('login');
    }

    signup(req, res, next){
        sql.connect(config, function(err){
            let sqlReq = new sql.Request();
            if(err){
                console.log('Co loi: ' + err)
            }
            sqlReq
            .input('username', sql.NVarChar, req.body.username)
            .input('password', sql.NVarChar, req.body.password)
            .query("insert into ACCOUNT (username, password, l_name, f_name) values (@username, @password, 'phong', 'le')")
                .then(() =>{
                    res.send('Ok')
                })
                .catch((err) =>{
                    console.log('CL '+ err)
                })
        })
    }

    test(req, res, next){

        sql.connect(config, function(err){
            let sqlReq = new sql.Request();
            if(err){
                console.log('Co loi: ' + err)
            }
            sqlReq
            .input('username', sql.NVarChar, 'PhuongNghi')
            .query("insert into ACCOUNT (username, password, l_name, f_name) values (@username, '123456', 'phong', 'le')")
                .then(() =>{
                    res.send('Ok')
                })
                .catch((err) =>{
                    console.log('CL '+ err)
                })
        })
    }
}

module.exports = new SiteController();
