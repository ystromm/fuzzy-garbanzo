import express from 'express';

const application = express();


const port = 8080;
application.get('/healthcheck', (request, response) => {
  response.send({message: 'ok'});
});

application.listen(port, () => {
  console.log(`Server started on port ${port}`)});