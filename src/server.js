const express = require('express');

const server = express();

server.listen(3333, () => {
  console.log('🚀 Server running on port 3333.')
})