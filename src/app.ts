import express, { Express, Request, Response } from "express";
import {FilesService} from "./services/files.service";
import {TablesService} from "./services/tables.service";
import {validateTablesRequest, validateTableRequest} from "./middlewares/middlewares";
import * as url from "url";
const cors = require('cors')
import * as config from "./config.json";

const app: Express = express();
const port = config.port;
const fileSevice = new FilesService();
const tablesSevice = new TablesService();

const errorHandler = (error, request, response, next) => {
  response.header("Content-Type", 'application/json')
    
  const status = error.status || 500
  response.status(status).send(error.message)
}

app.use(cors());

app.all('/api/*', function (req, res, next) {
  console.log('Api was called', req);
  next();
});

app.get("/api/files/", async (req: Request, res: Response, next) => {
  try{
    const files = await fileSevice.getFiles();
    res.send(files);
  } catch(ex) {
    next(ex);
  }
});

app.use("/api/tables/", validateTablesRequest);
app.get("/api/tables/", async (req: Request, res: Response, next) => {
  try{
    const url_parts = url.parse(req.url, true);
    const query = url_parts?.query;
    const tables = await tablesSevice.getTables(query?.file?.toString());
    res.send(tables);
  } catch(ex) {
    next(ex)
  }
});

app.use("/api/table/", validateTableRequest);
app.get("/api/table/", async (req: Request, res: Response, next) => {
  try{
    const url_parts = url.parse(req.url, true);
    const query = url_parts?.query;
    const table = await tablesSevice.getTable(query?.file?.toString(), query?.table?.toString());
    res.send(table);
  } catch(ex) {
    next(ex)
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("api is running");
});

app.use(errorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});