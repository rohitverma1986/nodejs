exports.route = function (pathname, handle, response, data) {
    if (typeof handle[pathname] === "function") {
        handle[pathname](response, data);
    } else {
        response.writeHead(404, { "Content-type": "text/plain" });
        response.write("Requested page not found: " + pathname);
        response.end();
    }
}