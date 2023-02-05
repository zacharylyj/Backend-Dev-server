//Class : DAAA/FT/1B/01
//Group : nil (no group)
//Admission Number : P2201861
//Name : Zachary Leong Yao Jie

var dbConfig = require('./databaseConfig');
var jwt = require('jsonwebtoken')
var config = require('../config/config')

var user = {
    //////////////////////////////////////////////////////////////////////////
    //login
    loginStaff: function (email, password, callback) {
        var dbConn = dbConfig.getConnection();
        var sql2 = "select count(*) from staff where email=? and password=?";
        dbConn.query(sql2, [email, password], function (err, results) {
            if (results == undefined) {
                return callback(err, null);
            }
            else {
                if (results[0]['count(*)'] == 1) {
                    var sql = "select * from staff where email=? and password=?";
                    dbConn.query(sql, [email, password], function (err, results) {
                        if (err) {
                            console.log(err);
                            return callback(err, null);
                        }
                        else {
                            dbConn.end();
                            return callback(err, results)
                        }
                    })
                }
                else {
                    return callback(new Error('not found'), null);
                }
            }
        });
    },
    //////////////////////////////////////////////////////////////////////////
    //flim cat endpoint
    flimcat: function (callback) {
        var dbConn = dbConfig.getConnection();

        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = "select name from category";
                dbConn.query(sql, function (err, results) {
                    dbConn.end();
                    return callback(err, results);
                });
            }
        });
    },
    //////////////////////////////////////////////////////////////////////////
    //UPDATE staff endpoint

    updateStaff: function (object, actor_id, callback) {
        var dbConn = dbConfig.getConnection();
        var { first_name, last_name } = object;
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                if (last_name == undefined) {
                    var sql = "update actor set first_name=? where actor_id=?";
                    var params = [first_name, actor_id];
                }
                else if (first_name == undefined) {
                    var sql = "update actor set last_name=? where actor_id=?";
                    var params = [last_name, actor_id];
                }
                else {
                    var sql = "update actor set first_name=?, last_name=? where actor_id=?";
                    var params = [first_name, last_name, actor_id];
                }
                dbConn.query(sql, params, function (err, results) {
                    dbConn.end();
                    return callback(err, results);
                });
            }
        });
    },
    //////////////////////////////////////////////////////////////////////////
    //get flim title thingy
    filmcard: function (cat_id, callback) {
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {
                var sql = "select f.rental_rate, f.film_id, f.title, fc.category_id, f.rating, f.release_year, f.length as duration FROM film as f INNER JOIN film_category as fc ON f.film_id = fc.film_id INNER JOIN category as c ON fc.category_id = c.category_id where c.category_id =? limit 1";
                dbConn.query(sql, [cat_id], function (err, results) {
                    dbConn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    console.log(results);
                    return callback(null, results);
                });
            }
        });
    },
    //////////////////////////////////////////////////////////////////////////
    //get flim cat
    getFlim_content: function (film_id, callback) {
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = "select f.film_id, f.title, c.name, f.release_year, f.description, f.rating, a.first_name, a.last_name from film as f  inner join film_category as fc on f.film_id = fc.film_id inner join category as c on fc.category_id = c.category_id inner join film_actor as fa on f.film_id = fa.film_id inner join actor as a on fa.actor_id = a.actor_id where f.film_id=?";
                dbConn.query(sql, [film_id], function (err, results) {
                    dbConn.end();
                    return callback(err, results);
                });
            }
        });
    },
    //////////////////////////////////////////////////////////////////////////
    //search
    getSearch: function (object, callback) {
        console.log(object)
        console.log('object')
        var { searchStr, sliderprice } = object
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = `SELECT * FROM film WHERE title LIKE '%${searchStr}%' AND rental_rate BETWEEN 0 AND ${sliderprice};`;
                dbConn.query(sql, function (err, results) {
                    dbConn.end();
                    return callback(err, results);
                });
            }
        });
    },

    //////////////////////////////////////////////////////////////////////////
    //8th endpoint
    addCustomer: function (store_id, first_name, last_name, email, addressList, callback) {
        var dbConn = dbConfig.getConnection();
        var [address, address2, district, city_id, postal_code, phone] = addressList;
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                let sql = `insert into address (address, address2, district, city_id, postal_code, phone) VALUES (?,?,?,?,?,?)`;
                dbConn.query(sql, [address, address2, district, city_id, postal_code, phone], function (err, results) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    let sql1 = `insert into customer (store_id, first_name, last_name, email, address_id) VALUES (?,?,?,?,?)`;
                    let address_id = results.insertId;
                    dbConn.query(sql1, [store_id, first_name, last_name, email, address_id], function (err, results) {
                        dbConn.end();
                        if (err) {
                            console.log(err);
                            return callback(err, null);
                        }
                        console.log(results);
                        return callback(null, results);
                    });
                });
            }
        });
    },

    //////////////////////////////////////////////////////////////////////////
    //3rd endpoint
    addActor: function (object, callback) {
        var dbConn = dbConfig.getConnection();
        var { first_name, last_name } = object;
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = "insert into actor(first_name, last_name) Values(?,?)";
                dbConn.query(sql, [first_name, last_name], function (err, results) {

                    dbConn.end();
                    return callback(err, results);


                });
            }
        });
    },


    //////////////////////////////////////////////////////////////////////////
    //1st endpoint
    getActor: function (actor_id, callback) {
        var dbConn = dbConfig.getConnection();

        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = "select actor_id, first_name, last_name from actor where actor_id=?";
                dbConn.query(sql, [actor_id], function (err, results) {
                    dbConn.end();
                    return callback(err, results);
                });
            }
        });
    },
    //////////////////////////////////////////////////////////////////////////
    //2nd endpoint
    getActors: function (limit, offset, callback) {
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {

                var sql = "select actor_id, first_name, last_name from actor limit ? offset ?";
                dbConn.query(sql, [limit, offset], function (err, results) {
                    dbConn.end();
                    return callback(err, results);

                });
            }
        });
    },

    //////////////////////////////////////////////////////////////////////////
    //4th endpoint
    updateActor: function (object, actor_id, callback) {
        var dbConn = dbConfig.getConnection();
        var { first_name, last_name } = object;
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                if (last_name == undefined) {
                    var sql = "update actor set first_name=? where actor_id=?";
                    var params = [first_name, actor_id];
                }
                else if (first_name == undefined) {
                    var sql = "update actor set last_name=? where actor_id=?";
                    var params = [last_name, actor_id];
                }
                else {
                    var sql = "update actor set first_name=?, last_name=? where actor_id=?";
                    var params = [first_name, last_name, actor_id];
                }
                dbConn.query(sql, params, function (err, results) {
                    dbConn.end();
                    return callback(err, results);
                });
            }
        });
    },
    //////////////////////////////////////////////////////////////////////////
    //5th endpoint
    deleteActor: function (actor_id, callback) {
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                var sql = "delete from film_actor where actor_id = ?";
                dbConn.query(sql, [actor_id], function (err, results) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                });
                let sql1 = "delete from actor where actor_id = ?";
                dbConn.query(sql1, [actor_id], function (err, results) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    return callback(null, results);
                });
                dbConn.end();
            }
        });
    },

    //////////////////////////////////////////////////////////////////////////
    //6th endpoint

    //////////////////////////////////////////////////////////////////////////
    //7th endpoint
    innerjoin2: function (customer_id, start_date, end_date, callback) {
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {
                var sql = "select f.title, p.amount, p.payment_date from film as f inner join inventory as i on f.film_id = i.film_id inner join rental as r on i.inventory_id = r.inventory_id inner join payment as p on r.rental_id = p.rental_id where p.customer_id = ? and p.payment_date between ? and ?";
                dbConn.query(sql, [customer_id, start_date, end_date], function (err, results) {
                    dbConn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    console.log(results);
                    return callback(null, results);
                });
            }
        });
    },

    //////////////////////////////////////////////////////////////////////////
    //9th endpoint
    addStaff: function (first_name, last_name, address_id, email, store_id, active, username, password, callback) {
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                let sql2 = "select count(*) from staff where email =?";
                dbConn.query(sql2, [email], function (err, results) {
                    if (results[0]['count(*)'] == 0) {
                        let sql = `insert into staff (first_name, last_name, address_id, email, store_id, active, username, password) VALUES (?,?,?,?,?,?,?,?)`;
                        dbConn.query(sql, [first_name, last_name, address_id, email, store_id, active, username, password], function (err, results) {
                            if (err) {
                                console.log(err);
                                return callback(err, null);
                            }
                            let sql1 = `insert into store (manager_staff_id, address_id) VALUES (?,?)`;
                            let staff_id = results.insertId;
                            dbConn.query(sql1, [staff_id, address_id], function (err, results) {
                                dbConn.end();
                                if (err) {
                                    console.log(err);
                                    return callback(err, null);
                                }
                                return callback(null, results);
                            });
                        });
                    } else {
                        return callback(new Error('Email already in use'), null);
                    }
                });
            }
        });
    },

    //////////////////////////////////////////////////////////////////////////
    //10th endpoint
    addflim: function (title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features, inventory, callback) {
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                let sql2 = "select count(*) from film where title=?";
                dbConn.query(sql2, [title], function (err, results) {
                    if (results[0]['count(*)'] == 0) {
                        let sql = `insert into film (title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
                        dbConn.query(sql, [title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features], function (err, results) {
                            if (err) {
                                console.log(err);
                                return callback(err, null);
                            }
                            var film_id = results.insertId;

                            function insertValues(inventory) {
                                let result = ' ';
                                for (let i = 0; i < inventory.length; i++) {
                                    const [id, numItr] = inventory[i];
                                    for (let k = 0; k < numItr; k++) {
                                        result += `(${film_id}, ${inventory[i][0]}),`;
                                    }
                                }
                                return result;
                            }
                            var sql1 = `insert into inventory (film_id, store_id) VALUES`;
                            sql1 += insertValues(inventory);
                            sql1 = sql1.slice(0, -1);
                            dbConn.query(sql1, function (err, results) {
                                dbConn.end();
                                if (err) {
                                    console.log(err);
                                    return callback(err, null);
                                }
                                console.log(results);
                                return callback(null, results);
                            });


                        });
                    } else {
                        return callback(new Error('Title in use'), null);
                    }
                });
            }
        });
    }
};
module.exports = user;