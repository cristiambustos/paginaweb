const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.send('Estamos conectado compaaaa!')
});

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port') + ' on dev');
})
