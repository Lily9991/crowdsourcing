

function start(){

var http = require('http');
var fs = require('fs');
var path = require('path');


http.createServer(function (request, response) {
    console.log('request starting...');

       var postData = ' ';
       request.setEncoding('utf8');

       request.addListener('data',function(postDataChunk){
         postData += postDataChunk;
         console.log(postDataChunk);

         fs.open('record.txt','a',0666,function(err,fd){
            
            if(err) throw err;
            
             var buf = new Buffer(200);
             var length = buf.write(postDataChunk+"\n");

             fs.write(fd,buf,0,length,null,function(err,wl,vlc){

                 if(err) throw err;
             
             fs.close(fd,function(){

             });
          });

       });
 

      });

       

    
	
	var filePath = '.' + request.url;
	if (filePath == './')
		filePath = './chat.html';
		
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}
	
	path.exists(filePath, function(exists) {
	
		if (exists) {
			fs.readFile(filePath, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				}
				else {
					response.writeHead(200, 
                                             { 'Content-Type':contentType });
					response.end(content, 'utf-8');
				}
			});
		}
		else {
			response.writeHead(404);
			response.end();
		}
	});

       
       	
}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');

}

exports.start = start;