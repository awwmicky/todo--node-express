const express = require('express');
const app = express();


app.use( express.json() )
app.use( express.urlencoded({extended : true}) )
app.use( express.static('./public/') )


const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/clientRoutes.js');
app.use('/api', apiRoutes)
app.use('/', htmlRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, _ => {
    console.log('Test Server —', `http://localhost:${PORT}`)
})