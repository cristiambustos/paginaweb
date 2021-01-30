const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./routes');



const bodyParser = require('body-parser');


const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api',router);

app.get('/', function(req, res) {
    res.send('Conectado campeón!')
})
app.set('port', process.env.PORT || 3000);

    app.listen(app.get('port'), () => {
        console.log('Server on port ' + app.get('port') + ' on dev');
    });