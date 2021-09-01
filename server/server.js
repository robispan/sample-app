const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
app.use(express.json());

const port = 3000;

// serve angular app
app.use(express.static("../client/dist"));

// posts api
app.get("/api/posts", (_req, res) => {
  http
    .get("http://jsonplaceholder.typicode.com/posts", (r) => {
      const { statusCode } = r;
      const contentType = r.headers["content-type"];

      let error;
      if (statusCode !== 200) {
        error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(
          "Invalid content-type.\n" +
            `Expected application/json but received ${contentType}`
        );
      }
      if (error) {
        res.send(error.message);
        r.resume();
        return;
      }

      r.setEncoding("utf8");
      let rawData = "";
      r.on("data", (chunk) => {
        rawData += chunk;
      });
      r.on("end", () => {
        try {
          const parsedData = JSON.parse(rawData);
          console.log(parsedData);
          res.send(parsedData);
        } catch (e) {
          console.error(e.message);
        }
      });
    })
    .on("error", (e) => {
      console.error(`Got error: ${e.message}`);
    });
});

// single post api
app.get("/api/post/:id", (req, res) => {
  http
    .get(`http://jsonplaceholder.typicode.com/posts/${req.params.id}`, (r) => {
      const { statusCode } = r;
      const contentType = r.headers["content-type"];

      let error;
      if (statusCode !== 200) {
        error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(
          "Invalid content-type.\n" +
            `Expected application/json but received ${contentType}`
        );
      }
      if (error) {
        res.send(error.message);
        r.resume();
        return;
      }

      r.setEncoding("utf8");
      let rawData = "";
      r.on("data", (chunk) => {
        rawData += chunk;
      });
      r.on("end", () => {
        try {
          const parsedData = JSON.parse(rawData);
          console.log(parsedData);
          res.send(parsedData);
        } catch (e) {
          console.error(e.message);
        }
      });
    })
    .on("error", (e) => {
      console.error(`Got error: ${e.message}`);
    });
});

// point all other requests to angular app
app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
