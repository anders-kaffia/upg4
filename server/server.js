var express = require( 'express' );
var path = require( 'path' );
var app = express();
var questions = require( './questions' );
var fs = require( 'fs' );

app.use(express.static('./build'));
app.use('*', function(req,res) {
    res.sendFile(path.join(__dirname,'..','build','index.html'));
    // c:\reactKurs\reactLivePoll\server\..\build\index.html         
})

var server = app.listen(3000);
var io = require('socket.io').listen(server);

var connections = [];
var audienceArr = [];
var title = 'Unnamned presentation';
var speaker = {};
var currentQuestion = null;
var results = {
    a:0,
    b:0,
    c:0,
    d:0
};

function updateJsonFile() {
    var text = `module.exports=${JSON.stringify(questions, null, " ")}`;
    fs.writeFile( './server/questions.js', text, (err) => {
        if ( err ) {
            console.log(err);
        } else {
            console.log('Sparade frågan i questions.js');
        }
    })
}

io.sockets.on('connection', function (socket) {

    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
        console.log('WS connections: %s', connections.length);

        for (var i = 0;i<audienceArr.length;i++) {
            if (audienceArr[i].id === socket.id) {
                audienceArr.splice(i, 1);
                break;
            }
        }
        io.sockets.emit('audience', audienceArr);

    })
    .on('join', (payload) => {
        var member = {
            id: socket.id,
            type: 'audience',
            name: payload.member.name
        };
        audienceArr.push(member);
        socket.emit('joined', member);

        io.sockets.emit('audience', audienceArr);
        console.log(payload.member.name);
    } )
    .on('start', (payload) => {
        speaker = payload.speaker;
        speaker.id = socket.id;
        title = payload.title;
        speaker.type = 'speaker';

        socket.emit('joined', speaker);
        io.sockets.emit('started', {
            title: title,
            speaker: speaker.name,
            audience: audienceArr
        });
    })
    .on('ask', (question) => {
        currentQuestion = question;
        results = {
            a:0,
            b:0,
            c:0,
            d:0
        };
        console.log(question.q);
        io.sockets.emit('ask', question);
    })
    .on( 'newQuestion', ( question ) => {
        console.log('ny fråga');
        questions.push(question);
        io.sockets.emit( 'newQuestion', questions );
        updateJsonFile();
    })
    .on( 'answer', ( optionName ) => {
        results[optionName] +=1;
        io.sockets.emit( 'results', results );
        console.log( 'Resultat: %j', results );
    } )

    connections.push(socket);

    socket.emit('welcome', {
        title: title,
        speaker: speaker.name,
        questions: questions,
        currentQuestion: currentQuestion
    });

    console.log('WS connections: %s', connections.length);
})

console.log('server is running on http://localhost:3000'); 