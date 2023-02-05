//Class : DAAA/FT/1B/01
//Group : nil (no group)
//Admission Number : P2201861
//Name : Zachary Leong Yao Jie

var express = require('express');
var bodyParser = require('body-parser');
var userDB = require('../model/user');
var verificationLib = require('../auth/verifyToken');
var jwt = require('jsonwebtoken')
var config = require('../config/config')

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());
//////////////////////////////////////////////////////////////////////////
//login
app.post('/staff', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    userDB.loginStaff(email, password, function (err, results) {
        console.log(err)
        if (err) {
            if (err.message === 'not found') {
                res.status(403);
                res.type('application/json');
                res.send(`{"incorrect_data":"Email or Password is incorrect"}`);
            }
            else {
                res.status(500);
                res.type('application/json');
                res.send(`{"error_msg":"Internal server error"}`);
            }
        }
        else {
            if (results[0] !== undefined) {
                console.log("Fetching key and payload");
                var payload = { "staff_id": results[0].staff_id, "first_name": results[0].first_name, "last_name": results[0].last_name, "address_id": results[0].address_id, "email": results[0].email, "store_id": results[0].store_id, "username": results[0].username, "password": results[0].password, "last_update": results[0].last_update };

                jwt.sign(payload, config.secretKey, { expiresIn: 86400 }, function (err, jwtKey) {
                    var message = { "JWT": jwtKey, "payload": payload }
                    if (err) {
                        res.status(401);
                        res.type('application/json');
                        res.send(err);

                    }
                    else {
                        res.status(200);
                        res.type('application/json');
                        res.send(message);
                    }
                });
            }
            else {
                console.log(err)
            }
        }


    });
});
//////////////////////////////////////////////////////////////////////////
//get flim cat     
app.get('/film_catergories', verificationLib.verifyToken, function (req, res) {
    userDB.flimcat(function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type('application/json');
            res.send(`{"error_msg":"Internal server error"}`);

        } else {
            res.status(200);
            res.type('application/json');
            res.send(results);
        }
    });
});
//////////////////////////////////////////////////////////////////////////
//UPDATE staff endpoint
app.put('/staff/:id', verificationLib.verifyToken, function (req, res) {
    var staff_id = req.params.id;

    userDB.updateStaff(req.body, staff_id, function (err, results) {
        if (err) {
            console.log(err);
            res.type('application/json');
            res.send(`{"error_msg":"Internal server error"}`);
        }
        else {
            if (results.affectedRows >= 1) {
                res.status(200);
                res.type('application/json');
                res.send(`{"success_msg": "record updated"}`);
            }

            else {
                res.status(204);
                res.send();
            }

        }
    });
});
//////////////////////////////////////////////////////////////////////////
//get flim title thingy
app.get("/film_categories/:category_id/films", verificationLib.verifyToken, function (req, res) {
    const category_id = req.params.category_id;
    userDB.filmcard(category_id, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500);
            res.send({ "Message": "Internal server error" });
        } else {
            res.status(200);
            res.send(result);
        }
    });
});
//////////////////////////////////////////////////////////////////////////
//get flim cat
app.get('/flim_content/:film_id', verificationLib.verifyToken, function (req, res) {
    const film_id = req.params.film_id;
    userDB.getFlim_content(film_id, function (err, results) {
        if (err) {
            res.status(500);
            res.type('application/json');
            res.send(`{"error_msg":"Internal server error"}`);

        } else {
            res.status(200);
            res.type('application/json');
            res.send(results);

        }
    });
});
//////////////////////////////////////////////////////////////////////////
//search
app.get('/film_search', function (req, res) {
    var searchStr = req.query.searchStr
    var sliderprice = req.query.sliderprice;
    object = { searchStr, sliderprice }
    console.log('object')
    console.log(object)
    userDB.getSearch(object, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type('application/json');
            res.send(`{"error_msg":"Internal server error"}`);

        } else {
            res.status(200);
            res.type('application/json');
            res.send(results);
        }
    });
});
//////////////////////////////////////////////////////////////////////////
//8th endpoint
app.post('/customers', verificationLib.verifyToken, function (req, res) {
    if (req.body.address2 == undefined) {
        var address2 = null;
    }
    else {
        address2 = req.body.address.address_line2;
    }
    if (req.body.store_id == null ||
        req.body.first_name == null ||
        req.body.last_name == null ||
        req.body.email == null ||
        req.body.address.address_line1 == null ||
        req.body.address.district == null ||
        req.body.address.city_id == null ||
        req.body.address.postal_code == null ||
        req.body.address.phone == null
    ) {
        res.status(400);
        res.type('application/json');
        res.send(`{"error_msg":"missing data"}`);
    }
    addressList = [req.body.address.address_line1, address2, req.body.address.district, req.body.address.city_id, req.body.address.postal_code, req.body.address.phone];
    userDB.addCustomer(
        req.body.store_id,
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        addressList,
        function (err, results) {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(409);
                    res.type('application/json');
                    res.send(`{"error_msg":"data already exists"}`);
                } else {
                    res.status(500);
                    res.type('application/json');
                    res.send(`{"error_msg":"Internal server error"}`);
                }
            }
            else {
                res.status(201);
                res.type('application/json');
                res.send(`{"customer_id": "${results.insertId}"}`);
            }
        });
});

//////////////////////////////////////////////////////////////////////////
//3rd endpoint
app.post('/actors', verificationLib.verifyToken, function (req, res) {

    if (req.body.first_name == null || req.body.last_name == null) {
        res.status(400);
        res.type('application/json');
        res.send(`{"error_msg":"missing data"}`);
    }
    userDB.addActor(req.body, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type('application/json');
            res.send(`{"error_msg":"Internal server error"}`);
        }
        else {
            res.status(201);
            res.type('application/json');
            res.send(`{"actor_id": "${results.insertId}"}`);
        }
    });
});


module.exports = app;