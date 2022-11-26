const express = require('express');
const server = express();
server.all('/', (req, res) => {
    res.send('Your bot is alive!')
})
function keepAlive() {
    server.listen(3002, () => { console.log("Server is Ready!") });
}
module.exports = keepAlive;