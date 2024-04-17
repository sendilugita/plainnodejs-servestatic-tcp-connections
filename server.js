const http = require('http')
const port = 1717
const server = http.createServer(app)
const path = require('path')
const fs = require('fs')

function app(req,res) {
	let filePath = req.url
	if(filePath === '/') {
		filePath = 'public/index.html'
	} else {
		filePath = 'public' + req.url
	}
	let mimeTypes = {
		'.html': 'text/html',
		'.js': 'text/javascript'
	}
	let contentType = String(mimeTypes[path.extname(filePath)])
	fs.readFile(filePath, function(err,content) {
		if(err) {
			res.writeHead(404)
			res.end('Not Found')
		} else {
			res.writeHead(200, contentType)
			res.end(content, 'utf-8')
		}
	})
}

server.listen(port, function() {
	console.log(`listening on port ${port}`)
})

server.on('connection', function(sock) {
	console.log('a user connected')
})

