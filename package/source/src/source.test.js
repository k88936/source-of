import {Source} from "./source.ts";

describe('Source', () => {
    test('should generate package data', async () => {
        const source = new Source();
        const data = await source.generate();
        
        expect(data).toBeDefined();
        expect(Array.isArray(data)).toBe(true);
    });
});
