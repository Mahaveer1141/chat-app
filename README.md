# Chat App

## Steps to start the server

- run `cd server` to go to server folder
- run `yarn` or `npm install` to install the dependencies
- run `yarn build` or `npm run build`
- run `yarn start` or `npm run start` to start the server

server by default will be running at port 8000

## Steps to start the client

- run `cd client` to go to client folder
- run `yarn` or `npm install` to install the dependencies
- run `yarn dev` or `npm run dev` to start the client

you can access client by this url http://localhost:3000

## Architecture of this app

- app is build through node, express and socket.io in backend and next.js, tailwindcss and socket.io-client in frontend.
- when someone enters a message, it will be broadcasted to all the clients joined through websockets.

## Deployemnet link

app is deployed at this link
