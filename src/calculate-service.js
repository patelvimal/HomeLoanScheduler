function calculateInterest(){

}

export const calcHomeLoan = (loanAmount,emi,interestRate,prepayment,startDate) => {
    var result=[];
    var loanBalance=loanAmount;
    while( 0 < loanBalance) {
        var perdayInterestAmount= ((loanBalance * (interestRate/100))/365).toFixed(2);
        var monthlyInterest = (perdayInterestAmount *30).toFixed(2);
        loanBalance = (loanBalance-(emi-monthlyInterest)).toFixed(2);
        result.push({principal:(emi-monthlyInterest).toFixed(2),interest:monthlyInterest,balance: loanBalance});
    }
    console.log(result);
    return result;
}


//export default calc { calculateHomeLoan:calcHomeLoan};