const server = require('./core/Server');
const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Listen on: http://localhost:${PORT}`);
})