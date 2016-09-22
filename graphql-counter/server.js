import express from 'express';
import { graphql } from 'graphql';

import bodyParser from 'body-parser';
import schema from './schema';

let app  = express();
let PORT = 3000;

// parse POST body as text
app.use(bodyParser.text({ type: 'application/graphql' }))

app.post('/graphql', (req, res) => {
  // res.send('Hello!');
  // execute some GraphQL!
  graphql(schema, req.body)
  .then( (result) => {
    res.send(JSON.stringify(result, null, 2));
  });
});

let server = app.listen(PORT, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port);
});
