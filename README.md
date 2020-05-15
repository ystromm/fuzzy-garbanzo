# fuzzy-garbanzo

Empty directory.
```
mkdir backend
cd backend
git init
```
Create node project.
```
npm init
```
Pull in typescript.
```
npm install typescript
```
Init typescript config,
```
npx tsc --init
```
Pull in express; simple HTTP server.
```
npm install @types/express
npm install express
```
Ignore stuff, create .gitignore.
```
node_modules
dist
.idea
*.iml
```
Edit tsconfig to make sure the typescript compiler finds 
```
{
  "compilerOptions": {
    ...
    "outDir": "dist"
    ...
  },
  "include": [
      "src/**/*.ts"
  ],
  "exclude": [
    "./node_modules",
    "src/**/*.spec.ts"
  ]
}
```
Create a server file, src/main.ts:
```
import express = require('express');

// Create a new express app instance
const application: express.Application = express();

application.get('/', function (_, response) {
  response.send('Hello World!');
});
application.listen(8080, function () {
    console.log('App is listening on port 8080!');
});
```
Add a build and run-command to package.json:
```
{
  ...
  "scripts": {
    ...
    "build": "tsc",
    "start": "npm run build && node ./dist/main.js"
  }
  ...
}
```
Start the server locally:
```
npm run start
```
Add in a http client:
```
npm install @types/request
npm install request
```
Add a new endpoint:
```
import request from 'request';

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
```
https://nodejs.org/fr/docs/guides/nodejs-docker-webapp/
Create a docker file; Dockerfile:
```
FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
COPY src ./
RUN npm install
EXPOSE 8080
CMD [ "npm", "run", "start" ]
```
Build the docker image:
```
docker build -t <your username>/backend .
```
List docker images:
```
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ystromm/backend     latest              a2e47e3a2383        45 seconds ago      983MB
...
```
Run docker image:
```
docker run -p 8080:8080 -d ystromm/backend 
```
List containers:
```
 % docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
308edd8cc426        ystromm/backend     "docker-entrypoint.s…"   4 seconds ago       Up 4 seconds        0.0.0.0:8080->8080/tcp   busy_ride
```
Query the server:
```
 % curl localhost:8080/api/v1/joke            
{"joke":"Why are oranges the smartest fruit? Because they are made to concentrate. "}
```
Define an ECR repo:
https://console.aws.amazon.com/ecr/repositories?region=us-east-1
https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html

```
docker tag e9ae3c220b23 aws_account_id.dkr.ecr.region.amazonaws.com/my-web-app
docker push aws_account_id.dkr.ecr.region.amazonaws.com/my-web-app
```

Launch the container on ECS:
https://aws.amazon.com/getting-started/hands-on/deploy-docker-containers/

Connect the frontend to the backend.












