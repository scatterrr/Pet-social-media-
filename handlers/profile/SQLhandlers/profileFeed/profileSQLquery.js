var pg = require('pg');
var SQLStatement = require('./profileSQLStatement')
var config = {
    user: 'wah',
    database: 'social_media',
    password: 'postgres', //whatever your password is, the default is postgres or password, try both
    host: 'localhost',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

var client = new pg.Client(config);

client.connect();

function getFeedData(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.getFeedSQL,array, function (err, results) {
            if (err) {
                console.log(err);
            }

            resolve(results.rows);
        })
    })
}

function identifyUser(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.identifyUserSQL,array, function (err, results) {
            if (err) {
                console.log(err);
            }

            resolve(results.rows);
        })
    })
}

function getTextData(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.getTextFeedSQL,array, function (err, results) {
            if (err) {
                console.log(err);
            }

            resolve(results.rows);
        })
    })
}

function getPhotoData(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.getPhotoFeedSQL,array, function (err, results) {
            if (err) {
                console.log(err);
            }

            resolve(results.rows);
        })
    })
}

function postData(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.postFeedSQL,array, function (err, results) {
            if (err) {
                console.log(err);
            }

            resolve(results.rows);
        })
    })
}

function putData(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.putFeedSQL,array, function (err, results) {
            if (err) {
                console.log(err);
            }

            resolve(results.rows);
        })
    })
}

function deleteData(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.deleteFeedSQL,array, function (err, results) {
            if (err) {
                console.log(err);
            }

            resolve(results.rows);
        })
    })
}

function deleteFeedCommentData(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.deleteFeedCommentSQL,array, function (err, results) {
            if (err) {
                console.log(err);
            }

            resolve(results.rows);
        })
    })
}

module.exports.getFeedData = getFeedData;
module.exports.identifyUser = identifyUser
module.exports.getTextData = getTextData;
module.exports.getPhotoData = getPhotoData;
module.exports.postData = postData;
module.exports.putData = putData;
module.exports.deleteData = deleteData;
module.exports.deleteFeedCommentData = deleteFeedCommentData;