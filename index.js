/* ============================ */
/*           SERVER             */
const express = require('express');
const ejs = require('ejs');
/* ============================ */
/*             AUTH             */
const passport = require('passport');
const session = require('express-session');
/* ============================ */

const path = require('path');
require('dotenv').config();

/* ============================ */
/*    CONFIGURING THE SERVER    */
const app = express();

app.use(express.urlencoded({ extended: true }));
app.engine('html', ejs.renderFile);
app.use('/static/', express.static("./static"));
/* ============================ */

require('./routes/apis.js')(app); // api routing

require('./passport');
require('./routes/auth')(app); // auth routing/handling

require('./routes/simple_routes')(app);

/*
app.use(function (req, res, next){
    res.status(404).render('error.html', {code:404, message:"Page Not Found"});
}); // 404 handling
*/

app.listen(3000, ()=>{
    console.log('[SUCCESS] Server started on http://127.0.0.1:3000');
});
