const app = require('./app');
const { mongoConn } = require('./database/configuration');

const port = process.env.PORT || 3000;
app.set('port', port)

const conn = mongoConn()

app.listen(app.get('port'), () => {
    console.log(`Servidor arrancó por puerto ${app.get('port')}`);
});
