import { sayHello } from "../src/say-hello";

describe('sayHello', function(){

    it('Should return hello test', function(){
        expect(sayHello('ida')).toBe('Hello ida');
    });
});