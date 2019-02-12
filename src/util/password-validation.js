export function validatePassword(password) {

    const errors = [];

    if (password.length < 4) {
        errors.push('Password must be at least 4 characters long');
    }

    if (password.length > 32) {
        errors.push('Password cannot be longer than 32 characters');
    }


    if (errors.length) {
        return {
            isValid: false,
            errors
        };
    }


    if (!/^[a-hj-km-np-z]+$/.test(password)) {
        errors.push('Password must have only alphabetic characters in lowercase, except i, O, I letters');
    }

    if (!hasNonOverlappingPairs(password)) {
        errors.push('Password must contain at least two non-overlapping pairs of letters, like aa, bb, or cc');
    }

    if (!hasThreeSequentialLetters(password)) {
        errors.push('Password must include one increasing straight of at least three letters');
    }

    if (errors.length) {
        return {
            isValid: false,
            errors
        };
    }

    return {
        isValid: true,
        errors
    }

}

export function hasThreeSequentialLetters(string) {
    let flag = false;
    for (let i = 0; i < string.length - 2 && !flag; i++) {
        const currentCharCode = string.charCodeAt(i);
        const nextCharCode = string.charCodeAt(i + 1);
        const nextNextCharCode = string.charCodeAt(i + 2);
        flag = (currentCharCode + 1) === nextCharCode &&
            (nextCharCode + 1) === nextNextCharCode;
    }
    return flag;
}

export function hasNonOverlappingPairs(string) {
    const charactersSequenceMap = {};
    let pairsCount = 0;
    let j = 0;
    while (j < string.length) {
        if (string[j] === string[j + 1]) {
            if (!charactersSequenceMap[string[j]]) {
                charactersSequenceMap[string[j]] = true;
                pairsCount++;
            }
            if (pairsCount === 2) {
                return true;
            }
            while (string[j] === string[j + 1]) {
                j++;
            }
        }
        j++;
    }
    return false;
}