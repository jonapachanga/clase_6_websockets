const server = require('./core/Server');
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Listen on: http://localhost:${PORT}`);
})