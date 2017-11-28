var http = require("http");
var url = require("url");

module.exports.start = function (router, handle) {
    var onCreate = function (request, response) {
        var pathname = url.parse(request.url).pathname;
        var postedData = "";
        request.setEncoding("utf8");
        request.addListener("data", function (datapart) {
            postedData += datapart;
        });

        request.addListener("end", function () {
            router.route(pathname, handle, response, postedData);
        });
    }
    http.createServer(onCreate).listen(8000);
    console.log("Server started on port 8000");
}
