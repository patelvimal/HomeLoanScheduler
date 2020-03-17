function calculateInterest(){

}

export const calcHomeLoan = (loadAmount,emi,interestRate,prepayment,startDate) => {
    var result=[];
    var perdayInterestAmount= (loadAmount * (interestRate/100))/365;
    var monthlyInterest = perdayInterestAmount *30;
    result.push({principal:emi-monthlyInterest,interest:monthlyInterest,balance:loadAmount-(emi-monthlyInterest) });
    return result;
}


//export default calc { calculateHomeLoan:calcHomeLoan};