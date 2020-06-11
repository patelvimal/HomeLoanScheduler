

const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];


export const calcHomeLoan = (loanAmount,emi,interestRate,prepayment) => {
    var result=[];
    var loanBalance=loanAmount;
    var today = new Date();
    var currentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    while( 0 < loanBalance) {
        var perdayInterestAmount= ((loanBalance * (interestRate/100))/365);
        var monthlyInterest = (perdayInterestAmount * currentMonth.getDate());
        loanBalance = (loanBalance-(emi-monthlyInterest) - (prepayment|| 0));
        var month = monthNames[currentMonth.getMonth()];
        result.push({
            month: month , 
            year: currentMonth.getFullYear(),
            principal: (emi-monthlyInterest),
            interest:monthlyInterest,
            balance: loanBalance,
            prepayment:prepayment
        });
        currentMonth.setMonth(currentMonth.getMonth() + 2, 0);
    }
    return result;
};

export const getSummary = (jsonData) =>{
    var result = null;
    if (jsonData && Array.isArray(jsonData) && jsonData.length > 0) {
        const groupByYear = groupBy(jsonData,"year");
        result = [];
        Object.keys(groupByYear).map(key=>{
            var sumTotal = groupByYear[key].reduce((a, b) => {
                return { year: key, 
                    principal: a.principal + b.principal, 
                    interest: a.interest + b.interest,
                    prepayment : a.prepayment + b.prepayment,
                }
            })
            sumTotal.principal = sumTotal.principal.roundOf(2);
            sumTotal.interest = sumTotal.interest.roundOf(2);
            sumTotal.prepayment = sumTotal.prepayment.roundOf(2);
            sumTotal.totalAmount = (sumTotal.principal + sumTotal.interest + sumTotal.prepayment).roundOf(2);
            result.push(sumTotal);
        })
    }
    return result;
}

export const getTotal = (jsonData) => {
    if (jsonData && jsonData.length > 0) {
        var totalAmount = jsonData.reduce((a, b) => {
            return {
                total: a.principal + a.interest + b.principal + b.interest,
                principal: a.principal + b.principal,
                interest: a.interest + b.interest
            }
        })
        
        totalAmount.principal = totalAmount.principal.roundOf(0).addThousandSeperator();
        totalAmount.interest = totalAmount.interest.roundOf(0).addThousandSeperator();
        totalAmount.total = totalAmount.total && totalAmount.total.addThousandSeperator();
        return totalAmount;
    }
}

const groupBy = (xs, key) => {
    return xs.reduce((totalValue, currentValue) => {
        (totalValue[currentValue[key]] = totalValue[currentValue[key]] || []).push(currentValue);
        return totalValue;
    }, {});
};


export const calculateEMI = (loanAmount,interestRate,numberOfMonths)=> {
    const monthlyInterestRatio = (interestRate / 100) / 12;
    const top = Math.pow((1 + monthlyInterestRatio), numberOfMonths);
    const bottom = top - 1;
    const sp = top / bottom;
    const emi = ((loanAmount * monthlyInterestRatio) * sp);
    return emi;
}
Number.prototype.roundOf = function (decimals) {
    return Number(Math.round(this + 'e' + decimals) + 'e-' + decimals);
}

Number.prototype.addThousandSeperator = function() {
    return this.toLocaleString('en-IN') ;
}