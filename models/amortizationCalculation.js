var AmortizationSchedule = require('../models/amortizationSchedule')

module.exports = function PaymentCalculator(loan, paymentTerm) {

  var loan = loan, paymentTerm = paymentTerm;

  function convert(val) {
    return (val / 100).toFixed(2);
  }

  var methods = {
  
  _monthlyPaymentAmount: function() {
    //M = P * (J / (1 - (Math.pow(1/(1 + J), N))))
    var interestPerPayment = this._interestPerPayment(),
        tmp = Math.pow(1 + interestPerPayment, this._totalNoOfPayments()),
        //tmp = Math.pow(tmp, this._totalNoOfPayments()),
        //tmp = Math.pow(1 - tmp, -1),
        value = this._principalInCents() * interestPerPayment * tmp / (tmp -1);

        console.log("interestPerPayment: " +interestPerPayment );
        console.log("tmp " + tmp);
    return value;
  },

  _interestPerPayment: function() {
    console.log("_interestPerPayment: " + this._interestPerMonthInDecimalForm() * paymentTerm);
    return this._interestPerMonthInDecimalForm() * paymentTerm;
  },

  _interestPerMonthInDecimalForm: function() {
    //intrate
    console.log("_interestPerMonthInDecimalForm: " + loan.apr() / (12 * 100));
    return loan.apr() / (12 * 100);
  },

  _principalInCents: function() {
    console.log("_principalInCents: " + loan.amount() * 100);
    return loan.amount() * 100;
  },

  _termInMonths: function() {
    console.log("_termInMonths: " + loan.term() * 12);
    return loan.term() * 12;
  },

  _totalNoOfPayments: function() {
    console.log("_totalNoOfPayments: " + this._termInMonths() / paymentTerm);
    return this._termInMonths() / paymentTerm;
  },

  generate: function() {
    console.log(this._monthlyPaymentAmount()); 

    var payment = this._monthlyPaymentAmount(),
        balance = this._principalInCents(),
        totalInterest = 0,
        totalPrinciple = 0,
        totalPayments = 0,
        totalNoOfPayments = this._totalNoOfPayments();

    var result = [];

    for (var i = 1; i <= totalNoOfPayments; i++) {
      var currentInterest = balance * this._interestPerPayment(),
          currentPayment = payment,
          currentPrinciple = currentPayment - currentInterest;

      totalPayments += payment;
      totalInterest += currentInterest;
      totalPrinciple += currentPrinciple;

      balance -= currentPrinciple;

      var obj = {
        paymentNumber: i,
        currentPayment: convert(currentPayment),
        currentPrinciple: convert(currentPrinciple),
        currentInterest: convert(currentInterest),
        currentBalance: convert(balance),
        totalPayments: convert(totalPayments),
        totalInterest: convert(totalInterest)
      }


      result.push(obj);
      console.log(obj.totalPayments);
    }
    console.log(result.length);
    return result;
  }
}
  return methods;
}
