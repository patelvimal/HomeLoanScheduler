

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];


export const calcHomeLoan = (loanAmount,emi,interestRate,prepayment,startDate) => {
    var result=[];
    var loanBalance=loanAmount;
    var today = new Date();
    while( 0 < loanBalance) {
        var perdayInterestAmount= ((loanBalance * (interestRate/100))/365).toFixed(2);
        var monthlyInterest = (perdayInterestAmount *30).toFixed(2);
        loanBalance = (loanBalance-(emi-monthlyInterest)).toFixed(2);
        var month = monthNames[today.getMonth()];
        result.push({monthYear: month + '-' + today.getFullYear(),principal:(emi-monthlyInterest).toFixed(2),interest:monthlyInterest,balance: loanBalance});
        today.setMonth(today.getMonth() + 1);
    }
    return result;
};

//export default calc { calculateHomeLoan:calcHomeLoan};