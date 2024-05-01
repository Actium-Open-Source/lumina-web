module.exports = function(app){
    app.get('/home', (req, res) =>{
        res.render('simple/homepage.html');
    });

    app.get('/privacy', (req, res) =>{
       res.render('simple/privacy.html');
    });

    app.get('/terms', (req, res) =>{
        res.render('simple/tos.html');
    })
}