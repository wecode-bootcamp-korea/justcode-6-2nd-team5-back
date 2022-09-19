const http = require('http');
const dotenv = require('dotenv');
dotenv.config();
const { createApp } = require('./app');

const app = createApp();
const server = http.createServer(app);


const PORT = 8000;
server.listen(PORT, () => {
  console.log('server is running on PORT ' + PORT);
});
