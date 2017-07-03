const url = require('url')
const WebSocket = new require('ws')
const WebSocketServer = new WebSocket.Server({ port: 8081 })

exports.createConnection = users => {
  WebSocketServer.on('connection', (ws, req) => {
    const { query } = url.parse(req.url)

    users[query] = ws;

    console.log(`New ws connection ${query}`)

    ws.on('close', () => {
      console.log(`Connection ${query} closed`);

      delete users[query];
    })
  })
}

exports.sendMessage = async (users, response, ids) => {
  ids = [...new Set(ids)];

  ids.forEach(id => {
    const user = users[id];

    if (user)
      user.send(response)
  })
}
