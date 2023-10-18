const { createServer } = require("node:http");
const { extname } = require("node:path");

const logEE = require("./log-emitter");
const { fetchFile } = require("./fs-utils");

const {
  logTitle,
  logReqMethod,
  logResCode,
  logMessage,
  logPortURL,
  borderLine,
} = require("./log-utils");

const {
  PORT,
  HOST,
  VIEWS_DIR,
  CSS_DIR,
  JS_DIR,
  NOT_FOUND_VIEW,
  viewMap,
  redirectMap,
} = require("./config");

const server = createServer(async (req, res) => {
  const path = req.url;

  console.log(
    `${logTitle("Client request:")} [method: ${logReqMethod(
      req.method
    )}, requested url: ${logPortURL(req.url)}]`
  );
  console.log(borderLine);

  logEE.logFile(
    "clientRequest",
    "success",
    `method: "${req.method}", url: "${req.url}"`
  );

  if (extname(path) == ".css") {
    const data = await fetchFile(CSS_DIR, path);
    res.statusCode = data ? 200 : 404;

    res.writeHead(res.statusCode, { "Content-Type": "text/css" });
    res.end(data && data);
  } else if (extname(path) == ".js") {
    const data = await fetchFile(JS_DIR, path);
    res.statusCode = data ? 200 : 404;

    res.writeHead(res.statusCode, { "Content-Type": "text/javascript" });
    res.end(data && data);
  } else {
    const view = viewMap.get(path) || redirectMap.get(path) || NOT_FOUND_VIEW;
    res.statusCode = viewMap.has(path)
      ? 200
      : redirectMap.has(path)
      ? 301
      : 404;

    if (res.statusCode == 301) {
      res.writeHead(res.statusCode, { Location: redirectMap.get(path) });
      res.end();
    } else {
      let data = await fetchFile(VIEWS_DIR, view);

      if (!data) {
        res.statusCode = 500;
        data = `
      <h1>Unexpected Error</h1>
      <p>Error code: ${res.statusCode}</p>
      <p>An error has occured and we're working to fix the problem! Will be up and running shortly</p>
      `;
      }

      view.includes("subscribe") &&
        res.setHeader("Set-Cookie", "cookieGreeting=hello I am a cookie");

      res.writeHead(res.statusCode, { "Content-Type": "text/html" });
      res.end(data);
    }
  }

  console.log(
    `${logTitle("Server response:")} [status code: ${logResCode(
      res.statusCode
    )}, status message: ${logMessage(res.statusMessage)}]`
  );
  console.log(borderLine);

  logEE.logFile(
    "serverResponse",
    res.statusCode >= 500
      ? "error"
      : res.statusCode == 404
      ? "warning"
      : res.statusCode == 301
      ? "redirect"
      : "success",
    `${res.statusCode} "${res.statusMessage}"`
  );
});

server.listen(PORT, HOST, () => {
  const message = "Server is listening on port";

  console.log(`${logMessage(message)}, ${logPortURL(PORT)}\n`);
  logEE.logFile("startServer", "sysInfo", `${message} ${PORT}`);
});
