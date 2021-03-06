import express from 'express';
import request from 'request';
import bodyParser from "body-parser";

const application = express();

const port = 8080;

application.use(bodyParser.urlencoded({ extended: false }))
application.use(bodyParser.json())

application.get('/healthcheck', (_, response) => {
  response.send({message: 'ok'});
});

interface JokeDTO {
  joke: string
}

application.post("/oauth", (req, res) => {
    console.log(req.body)
    console.log(req.headers)
    console.log(req.header("content-type"))
    res.send("")
})

application.get('/api/v1/joke', (_, res) => {
  request.get('https://icanhazdadjoke.com/', {
    json: true,
    headers: {'Accept': 'application/json'}
  }, (error, _, body) => {
    const jokeDTO = body as JokeDTO;
    console.log(jokeDTO)
    res.send({joke: jokeDTO.joke})
  });
});

application.get('/api/v1/joke/:joke_id', (req, res) => {
  const joke_id = req.params.joke_id;
  request.get(`https://icanhazdadjoke.com/j/${joke_id}`, {
    json: true,
    headers: {'Accept': 'application/json'}
  }, (error, _, body) => {
    const jokeDTO = body as JokeDTO;
    console.log(jokeDTO)
    res.send({joke: jokeDTO.joke})
  });
});

application.listen(port, () => {
  console.log(`Server started on port ${port}`)
});

