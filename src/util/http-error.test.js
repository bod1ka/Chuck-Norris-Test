import {checkStatus} from './http-error';


describe('checkStatus',() => {

    it ('should return data if status >= 200 and <= 300',() => {
        const res = {
            status:200,
            data:{
                text:'text'
            }
        };
       expect(checkStatus(res)).toEqual(res);
    });

    it('should throw error if status is not ok', () => {
        const res = {
            status:404,
            data:{
                text:'text'
            }
        };


        expect(() => {
            checkStatus(res);
        }).toThrow();
    });
});