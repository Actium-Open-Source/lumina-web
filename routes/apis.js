const path = require("path");
module.exports = function(app){

    app.get('/api/:id', (req, res) => {
        res.header("Content-Type",'application/json');
        const __dirname = path.resolve();
        res.sendFile(path.join(__dirname, `./apis/${req.params.id}.json`));
    });
}