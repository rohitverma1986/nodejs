var querystring = require("querystring");
var fs = require('fs');
var mongodb = require('./mongodb');

var home = function (response) {
    var pagebody = "<html><head><title>Review Form</title></head>\
    <body>\
    <form action='/review' method='post'><table border=0><tr><th>Your name:</th><td><input type='text' name='username'/></td></tr>\
    <tr><th>Your feedback: </th><td><textarea name='review'></textarea></td></tr>\
    <tr><td colspan=2><input type='submit' value='Send'/></td></tr></form><br/>";
    response.writeHead(200, { "Content-type": "text/html" });
    response.write(pagebody);
    response.end();
}

var review = function (response, data) {
    var datap = querystring.parse(data);
    writetofile(datap);
    mongodb.insertReview(datap).then(function (data) {
        mongodb.selectReviews().then(function (reviews) {
            response.writeHead(200, { "Content-type": "text/html" });
            writePastReviews(response, reviews);
            response.write("<a href='/home'>Write more reviews</a>");
            response.end();
        }).catch(function (error) {
            sendError(err);
        });
    }).catch(function (error) {
        sendError(err)
    });
    function sendError(err) {
        response.writeHead(500, { "Content-type": "text/plain" });
        response.write(err);
        response.end();
    }
}

function writetofile(datap) {
    var writableStream = fs.createWriteStream("reviews/" + datap.username + '.txt', "UTF8");
    writableStream.write(datap.review);
    writableStream.end();
}

function writePastReviews(response, data) {
    if (data) {
        response.write("<table style='border:silver thin solid'>");
        response.write("<tr><th style='border-bottom:silver thin solid'>Reviewer</th><th style='border-bottom:silver thin solid'>Review</th></tr>");
        data.map(function (obj) {
            if (obj) {
                response.write("<tr><td style='border-bottom:silver thin solid'>" + obj.username + "</td><td style='border-bottom:silver thin solid'> " + obj.review + "</td></tr>");
            }
        });
        response.write("</table>");
    }
}

exports.home = home;
exports.review = review;
