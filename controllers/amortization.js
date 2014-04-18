var LoanModel = require('../models/loanModel');
var PaymentCalculator = require('../models/amortizationCalculation');

module.exports = function (server) {

  server.post('/payments', function (req, res) {

    var amount = req.body.amount && req.body.amount.trim(),
        apr = req.body.apr && req.body.apr.trim(),
        term = req.body.term && req.body.term.trim();

    var loanModel = new LoanModel(),
        loan = loanModel.create();


    loan.amount(amount);
    loan.apr(apr);
    loan.term(term);


    console.log(loanModel.whoAmI());


    if (loanModel.valid()) {
      console.log("1 " + loanModel.whoAmI());

      var calc = new PaymentCalculator(loan, 1),
          schedules = calc.generate();

      res.render('index', {loans: [loan], schedules: schedules});
          
    } else {
    console.log("2 " + loanModel.whoAmI());
      res.render('index', {invalidInput: true});
    }
  });

};
