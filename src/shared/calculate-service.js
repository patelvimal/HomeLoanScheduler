

const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];


export const calcHomeLoan = (loanAmount,emi,interestRate,prepayment) => {
    var result = [];
    var loanBalance = loanAmount;
    var today = new Date();
    var currentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    //console.clear();
    
    //emi = Math.floor(emi);
    //emi = emi.roundOf(2);
    console.log(emi);
    var totalInt = 0;
    while( 0 < loanBalance ) {
        //var monthlyInterest =  Math.floor((loanBalance * ((interestRate / 100) / 12)));
        //var monthlyPrincipal = Math.floor(emi-monthlyInterest);
        //loanBalance = Math.floor(loanBalance-(emi-monthlyInterest) - (prepayment|| 0));
        var monthlyInterest =  (loanBalance * ((interestRate / 100) / 12)).roundOf(4);
        var monthlyPrincipal = emi-monthlyInterest;
        loanBalance = Math.floor(loanBalance-(emi-monthlyInterest) - (prepayment|| 0));
        var month = monthNames[currentMonth.getMonth()];
        result.push({
            month: month , 
            year: currentMonth.getFullYear(),
            principal: monthlyPrincipal,
            interest: monthlyInterest,
            balance: loanBalance,
            prepayment:prepayment
        });
        totalInt = totalInt + monthlyPrincipal;
        currentMonth.setMonth(currentMonth.getMonth() + 2, 0);
    }
    //console.table(result);
    console.log(totalInt);
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
            sumTotal.principal = sumTotal.principal.roundOf(0);
            sumTotal.interest = sumTotal.interest.roundOf(0);
            sumTotal.prepayment = sumTotal.prepayment.roundOf(0);
            sumTotal.totalAmount = (sumTotal.principal + sumTotal.interest + sumTotal.prepayment).roundOf(2);
            result.push(sumTotal);
        })
    }
    return result;
}

export const getTotal = (jsonData,loanAmount) => {
    if (jsonData && jsonData.length > 0) {
        var totalAmount = jsonData.reduce((a, b) => {
            return {
                total: a.principal + a.interest + b.principal + b.interest,
                principal: a.principal + b.principal,
                interest: a.interest + b.interest
            }
        })
        totalAmount.total = (totalAmount.interest + loanAmount).roundOf(0);
        totalAmount.principal = totalAmount.principal.roundOf(0);
        totalAmount.interest = totalAmount.interest.roundOf(0);
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
    console.log(emi);
    return emi.roundOf(2);
}
Number.prototype.roundOf = function (decimals) {
    return Number(Math.round(this + 'e' + decimals) + 'e-' + decimals);
}

Number.prototype.addThousandSeperator = function() {
   // Below method is not working in react native
   // return this.toLocaleString('en-IN'); 
   return this.toString().replace(/(\d)(?=(\d{2})+[0-9]$)/g, '$1,');
}