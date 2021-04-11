var app;
const appRoot = require("app-root-path");
module.exports = function (arrg) {
    app = startApp(arrg);
    return {
        app
    };
};

function startApp(arrg) {
    var { User } = arrg.models;
    var express = require("express");
    var cors = require("cors");
    var path = require("path");
    var compression = require("compression");
    var methodOverride = require("method-override");

    app = express();
    var https = require("http").Server(app);
    var server = https.listen(process.env.PORT || arrg.config.server.port, () => {
        console.log(`Listening on ${server.address().address}:${server.address().port}`);
    });

    app.use(cors());
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(methodOverride());
    app.use(express.static('dist'));
    if (process.env.NODE_ENV != "production") {
        app.use((req, res, next) => {
            console.log(`${req.method}: ${req.url}  \n${JSON.stringify(req.body)}`, '\n');
            next();
        });
    }

    app.use("/", require("./Functional/Product")(arrg));
    app.use("/", require("./Functional/cart")(arrg));

    app.get('/*', function (req, res) {
        p = path.join(appRoot.toString(), 'index.html');
        res.sendFile(path.join(p));
    });
    arrg.app = app;

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send('error');
    });
    return app;
}