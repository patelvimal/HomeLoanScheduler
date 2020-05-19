
export const parseQueryStringToObject = (queryString)=>{
    var obj = {};
    if (queryString) {
        var keys = queryString.substring(queryString.indexOf('?') +1,queryString.length).split('&');
        if (keys && keys.length > 0) {
            keys.map(a => {
                var keyVal = a.split('=');
                if (keyVal && keyVal.length > 0 && !isNaN(keyVal[1])) {
                    obj[keyVal[0]] = keyVal[1];
                }
            })
        }
	}
	return convertToLongNumber(obj);
}

export const convertToLongNumber = (obj)=> {
    const loanInfo = {
        loanAmount: obj.loanAmount * 100000,
        emi: obj.emi * 1000,
        prePayment: obj.prePayment * 1000,
        interestRate: obj.interestRate * 1
    };
    return loanInfo;
}

export const getCompletionDate = (loanDetails) => {
    var result = null;
    if (loanDetails && loanDetails.length > 0) {
        const { month, year } = loanDetails[loanDetails.length - 1];
        result = `${month}, ${year}`;
    }
    return result;
}
