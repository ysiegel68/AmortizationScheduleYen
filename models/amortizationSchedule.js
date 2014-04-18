'use strict'

module.exports = function PaymentSchedule() {

  return {
    paymentNumber: 0,
    currentPayment: 0,
    currentPrinciple: 0,
    currentInterest: 0,
    currentBalance: 0,
    totalPayments: 0,
    totalInterest: 0
  }
}
