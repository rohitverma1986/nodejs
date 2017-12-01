var mongodb = require("mongodb")
var mongoClient = mongodb.MongoClient;
var url = 'mongodb://192.168.56.40:27017/nodejs_ex'

let mongodbObj = {};
mongodbObj.insertReview = insertReview;
mongodbObj.selectReviews = selectReviews;


function insertReview(obj) {
    let promise = new Promise(function (resolve, reject) {
        mongoClient.connect(url, function (err, db) {
            if (err) {
                reject(err);
            } else {
                var collection = db.collection("reviews");
                collection.insert(obj, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.insertedCount);
                    }
                });
                db.close();
            }
        });
    });
    return promise;
};

function selectReviews() {
    let promise = new Promise(function (resolve, reject) {
        mongoClient.connect(url, function (err, db) {
            if (err) {
                reject(err);
            } else {
                var collection = db.collection("reviews");
                collection.find().toArray(function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
                db.close();
            }
        });
    });
    return promise;
};

module.exports = mongodbObj;