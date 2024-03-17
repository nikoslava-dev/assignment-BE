import * as url from "url";

export function validateTablesRequest(req, res, next) {
    const url_parts = url.parse(req.url, true);
    const query = url_parts?.query;
    if (query && query.file) {
        next();
    } else {
        res.status(400).send("Invalid request"); 
    }
}

export function validateTableRequest(req, res, next) {
    const url_parts = url.parse(req.url, true);
    const query = url_parts?.query;
    if (query && query.file && query.table) {
        next();
    } else {
        res.status(400).send("Invalid request"); 
    }
}