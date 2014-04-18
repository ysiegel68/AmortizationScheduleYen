'use strict';


var LoanModel = require('../models/loanModel');


module.exports = function (app) {

    app.get('/', function (req, res) {
        
        var loanModel = new LoanModel(),
            loan = loanModel.create();

        res.render('index', {loans: [loan]});
        
    });

};
