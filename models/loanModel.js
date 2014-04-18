'use strict'


var model = require('nodejs-model');

module.exports = function LoanModel () {
  var loanModel = model("LoanModel").attr('amount', {
                                          validations: {
                                            presence: {
                                              message: 'Amount required'
                                            }
                                          }
                                  }).attr('apr', {
                                          validations: {
                                            presence: {
                                              message: 'Interest rate required'
                                            }
                                          }
                                  }).attr('term', {
                                          validations: {
                                            presence: {
                                              message: 'Term in years required'
                                            }
                                          }
                                  }),

  instance = loanModel.create(),

  isValidFloat = function(val) {
    console.log(val);
    var amt = parseFloat(val);
    console.log(amt);
    if (isNaN(amt) || amt <= 0) {
	return false;
    }
    return true;
  },

  isValidInt = function(val) {
    console.log(val);
    var amt = parseInt(val);
    console.log(amt);
    if (isNaN(amt) || amt <= 0) {
	return false;
    }
    return true;
  };

  LoanModel.prototype.create = function () {
    return instance;
  };

  LoanModel.prototype.valid = function () {
    console.log(isValidFloat(instance.amount()));
    console.log(isValidFloat(instance.apr()));
    console.log(isValidInt(instance.term()));

    if (isValidFloat(instance.amount()) && isValidFloat(instance.apr()) && isValidInt(instance.term())) {
      instance.amount(parseFloat(instance.amount()));
      instance.apr(parseFloat(instance.apr()));
      instance.term(parseInt(instance.term()));
      return true;
    } else {
      instance.amount(parseFloat(instance.amount()));
      instance.apr(parseFloat(instance.apr()));
      instance.term(parseInt(instance.term()));
      return false;
    }
  };

  LoanModel.prototype.whoAmI = function() {
    return JSON.stringify(instance.attrs);
  };
};
