export function checkStatus (res) {
    if (!(res.status >= 200 && res.status < 300)) {
        const err = new Error(res.statusText);
        err.response = res;
        throw err;
    }
    return res;
}

export function validatePassword(password){
    return {
        isValid:true
    };
    // const errors = [];
    //
    // if (password.length < 3){
    //     errors.push('Password must containt at least 3 characters');
    // }
    //
    // if (password.length > 32){
    //     errors.push('Password cannot be longer than 32 characters');
    // }
    //
    // if (!/^[a-hj-km-np-z]+$/.test(password)){
    //     errors.push('Password must have only alphabetic characters in lowercase, except i, O, I letters');
    // }
    //
    // if (errors.length){
    //     return {
    //         isValid:false,
    //         errors
    //     };
    // }
    //
    // let j = 0;
    //
    // const pairMap = {};
    // while (j < password.length){
    //     if (password[j] === password[j+1]){
    //         if (!pairMap[password[j]]){
    //             pairMap[password[j]] = [];
    //         }
    //         const startPosition = j;
    //         while (password[j] === password[j+1]){
    //             j++;
    //         }
    //         const endPosition = j;
    //         pairMap[password[j]].push({
    //             startPosition,
    //             endPosition
    //         });
    //     }
    //     j++;
    // }
    //
    // const letters = Object.keys();
    //
    // let hasNonOverLappingPair = false;
    // for (let i = 0; i < letters.length-1 && !hasNonOverLappingPair ; i++){
    //     const pairsA = pairMap[letters[i]];
    //     for (let j = i+1; j < letters.length && !hasNonOverLappingPair; j++){
    //         const pairsB = pairMap[letters[j]];
    //
    //     }
    // }
    //
    // for (let i = 0; i < password.length; i++){
    //
    // }
    //
    // function checkIfHasNonOverlappingPair(pairsA,pairsB){
    //     for (let i = 0; i < pairsA; i++){
    //         for (let j = 0; j < pairsB; j++){
    //             if ()
    //                 }
    //     }
    // }
}