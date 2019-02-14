const app = require('./config/server');

require('./app/routes/news')(app)

app.listen(app.get('port'),()=>{
    console.log('Servidor Conecado',app.get('port'));
});