/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import * as http from "http";
import * as url from "url";

const request = require('request');

const onRequest = (req, res) => {
    const queryData = url.parse(req.url, true).query;
    if (queryData.url) {
        request({
            url: queryData.url
          }).on('error', function(e) {
              res.end(e);
          }).pipe(res);
    }
    else {
        res.end('no url found');
    }
}

http.createServer(onRequest).listen(3333);
console.log('Server running on 3333');
