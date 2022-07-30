export const formatAddress = (address) =>  {
    const formattedAddr = address.slice(0, 5) + "..." + address.slice(-4);

    return formattedAddr;

}

// export const formatAmountToBalance = (amount) => {
//     const workingAmount = `${amount}`

//     const afterDecimal = workingAmount.slice(-18);

//     let beforeDecimal = "";
//     for (let i = 0; i < (workingAmount.length - 1); i++) {
//         let checkee = workingAmount.slice(i);
//         if (checkee === afterDecimal) {
//             beforeDecimal = checkee.slice(0, i);
//         }
//     }

//     const formattedAmount = `${beforeDecimal ? beforeDecimal : "0"}.${afterDecimal}`

//     return Number(formattedAmount);
// }

export const formatAmountToBalance = (amount) => {
    const workingAmount = `${amount}`

    const afterDecimal = workingAmount.slice(-18);


    let beforeDecimal = "0";
    
    if (amount.length > 18) {
        beforeDecimal = amount.replace(afterDecimal, "");
    }
    

    const formattedAmount = `${beforeDecimal ? beforeDecimal : "0"}.${afterDecimal}`

    return Number(formattedAmount);
}



export const formatBalanceToAmount = (balance) => {
    const workingAmount = "000000000000000000"
    
    const arr = balance.split(".");

    let beforeDecimal;
    let afterDecimal;

    if (arr.length === 1) {
        if (!balance.includes(".")) {
            beforeDecimal = arr[0]
            afterDecimal = workingAmount
        } else {
            beforeDecimal = "0";
            afterDecimal = arr[0]
        }
        
    }

    if (arr.length === 2) {
        beforeDecimal = `${arr[0]}`;
        afterDecimal = arr[1];
    }

    const formattedAmount = `${beforeDecimal}${afterDecimal}${workingAmount.slice(afterDecimal.length)}`
    return formattedAmount;
}


export const textToLink = (text) => {
    const newText = text.replace(/\s/g, "+");
    return newText;
}

export const linkToText = (text) => {
    const newText = text.replace(/\+/g, " ");
    return newText;
}