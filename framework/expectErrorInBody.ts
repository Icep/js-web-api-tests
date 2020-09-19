import { expect } from "chai";

export const expectErrorInBody = async (code: () => Promise<any>, contains: string, statuscode: number): Promise<void> => {
    try {
        await code();
    } catch (error) {
        if (!error?.error?.errors) {
            throw error
        }
        expect(error.error.errors).to.include(contains)
        expect(error.statusCode, `Server should return status code - ${statuscode}`).to.equal(statuscode);
        //All good
        return;
    }
    throw new Error(
        `Expected request:

    ${code}
    
        to be failed with message "${contains}"`
    )
}