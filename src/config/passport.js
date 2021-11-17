const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../app/models/Users');
const { covertoObject } = require('../util/mongoose');

const config = require('../app/controllers/index');
const sql = require('mssql/msnodesqlv8');

function localPassport() {
    passport.serializeUser((user, done) => {
        done(null, user.recordset[0].account_id);
    });

    passport.deserializeUser((id, done) => {

        sql.connect(config, function(err) {
            if(err){
                console.log('Co loi')
            }

            let sqlReq = new sql.Request();
            sqlReq
            .input('id', sql.Int, id)
            .query('Select * from ACCOUNT where account_id = @id')
                .then((user) =>{
                    done(null, user)
                })
                .catch((err) => console.log(err))
        })
        
    });

    passport.use(
        new LocalStrategy((username, password, done) => {
            sql.connect(config, function(err){
                if(err){
                    console.log('Co loi')
                }
                let sqlReq = new sql.Request();
                sqlReq
                .input('username', sql.NVarChar, username)
                .input('password', sql.NVarChar, password)
                .query('select * from ACCOUNT where username = @username and password = @password')
                    .then((user) => {
                        if(user.recordset[0].account_id == undefined){
                            console.log('Ko co user')
                        }
                        else{
                            done(null, user)
                        }

                    })
                    .catch((err) => {
                        console.log('K co user')
                        return done(null, false)
                    })
            })
        }),
    );
}
module.exports = { localPassport };
