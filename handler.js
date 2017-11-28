var querystring = require("querystring");
var fs = require('fs');

var home = function (response) {
    var pagebody = "<html><head><title>Review Form</title></head>\
    <body>\
    <form action='/review' method='post'><table border=0><tr><th>Your name:</th><td><input type='text' name='username'/></td></tr>\
    <tr><th>Your feedback: </th><td><textarea name='review'></textarea></td></tr>\
    <tr><td colspan=2><input type='submit' value='Send'/></td></tr></form>\
    </body></html>";
    response.writeHead(200, { "Content-type": "text/html" });
    response.write(pagebody);
    response.end();
}

var review = function (response, data) {
    var datap = querystring.parse(data);
    response.writeHead(200, { "Content-type": "text/plain" });
    response.write("Hello " + datap.username + ". Your review is : " + datap.review);
    response.end();
    writetofile(datap);
}

function writetofile(datap){
    var writableStream = fs.createWriteStream("reviews/" + datap.username + '.txt', "UTF8");
    writableStream.write(datap.review);
    writableStream.end();
}

exports.home = home;
exports.review = review;
