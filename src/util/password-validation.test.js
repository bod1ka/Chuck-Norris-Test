import { validatePassword, hasThreeSequentialLetters, hasNonOverlappingPairs } from './password-validation';


describe('validatePassword', function () {

    it('should return zero errors', () => {

        expect(validatePassword('aaabbabc')).toEqual({
            isValid: true,
            errors: []
        });
    });

    it('should return min length errors', () => {

        expect(validatePassword('aa')).toEqual({
            isValid: false,
            errors: ['Password must be at least 4 characters long']
        });

    });

    it('should return max length errors', () => {
        expect(validatePassword('aaasdasdsaddfdsfdsfdsfdsdfsdfsfasdsadasvfdgsytrghgfdhjkdgdfkfldsfsdf')).toEqual({
            isValid: false,
            errors: ['Password cannot be longer than 32 characters']
        });
    });

    it('should return case errors', () => {

        expect(validatePassword('aaAbb')).toEqual({
            isValid: false,
            errors: [
                'Password must have only alphabetic characters in lowercase, except i, O, I letters',
                'Password must include one increasing straight of at least three letters'
            ]
        });

        expect(validatePassword('aabbabciO')).toEqual({
            isValid: false,
            errors: ['Password must have only alphabetic characters in lowercase, except i, O, I letters']
        });

    });

    it('should return overlapping pair errors', () => {
        expect(validatePassword('asdasbbxyz')).toEqual({
            isValid: false,
            errors: [
                'Password must contain at least two non-overlapping pairs of letters, like aa, bb, or cc'
            ]
        });
    });

    it('should return sequence errors', () => {
        expect(validatePassword('asdasbbss')).toEqual({
            isValid: false,
            errors: ['Password must include one increasing straight of at least three letters']
        });
    });
});

describe('hasThreeSequentialLetters', () => {

    it('should return true', () => {
        expect(hasThreeSequentialLetters('asdasdfabc')).toEqual(true);
    });

    it('should return false', () => {
        expect(hasThreeSequentialLetters('asdasdfabd')).toEqual(false);
    });

});

describe('hasNonOverlappingPairs', () => {

    it('should return true', () => {
        expect(hasNonOverlappingPairs('aabb')).toEqual(true);
        expect(hasNonOverlappingPairs('aasdsbb')).toEqual(true);
        expect(hasNonOverlappingPairs('aaaabb')).toEqual(true);
    });

    it('should return false', () => {
        expect(hasNonOverlappingPairs('aaaa')).toEqual(false);
        expect(hasNonOverlappingPairs('abcd')).toEqual(false);
        expect(hasNonOverlappingPairs('aabc')).toEqual(false);
    });

});