"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
var body_parser_1 = tslib_1.__importDefault(require("body-parser"));
var cors_1 = tslib_1.__importDefault(require("cors"));
dotenv_1.default.config();
var app = express_1.default();
var options = {
    origin: ['http://localhost:8080']
};
app.set('port', process.env.PORT || 3000);
app.use(cors_1.default(options));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/api/form', function (req, res) {
    res.json({
        text: 'Hello World'
    });
});
app.listen(app.get('port'), function () {
    console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
});
exports.default = app;
//# sourceMappingURL=main.js.map