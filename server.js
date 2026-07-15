const http = require("http");
const fs = require("fs");
const path = require("path");
// creating a node server for this application
const server = http.createServer((req, res) => {

    let filePath = "." + req.url;

    if (req.url === "/") {
        filePath = "./index.html";
    }

    const ext = path.extname(filePath);

    let contentType = "text/html";

    if (ext === ".css") {
        contentType = "text/css";
    }
    else if (ext === ".js") {
        contentType = "application/javascript";
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end("File Not Found");
        } else {
            res.writeHead(200, {
                "Content-Type": contentType
            });
            res.end(content);
        }
    });

});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});