import express from 'express';
import request from 'request';

const application = express();

const port = 8080;

application.get('/healthcheck', (_, response) => {
  response.send({message: 'ok'});
});

interface JokeDTO {
  joke: string
}

application.get('/api/v1/joke', (_, response) => {
  request.get('https://icanhazdadjoke.com/', {
    json: true,
    headers: {'Accept': 'application/json'}
  }, (error, _, body) => {
    const jokeDTO = body as JokeDTO;
    console.log(jokeDTO)
    response.send({joke: jokeDTO.joke})
  });
});

application.listen(port, () => {
  console.log(`Server started on port ${port}`)
});