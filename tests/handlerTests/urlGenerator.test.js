const urlGenerator = require('../../src/handlers/urlGeneratorHandler');
const dbUtils = require('../../src/helpers/urlGeneratorDbOperations');
describe('The function urlGenerator', () => {
	it ('should call response with the short url', async() => {
		const codeMock = jest.fn();
		const mockHandler = {
			response: jest.fn(
				() => {
					return {code: codeMock};
				}
			),
		};
		const mockRequest = {
			payload: {
				longUrl: 'https://www.github.com/shubhamzanwar'
			}
		};
		const mockInsertUrls = jest.spyOn(dbUtils, 'insertUrls');
		mockInsertUrls.mockResolvedValue({'dataValues':{'shorturl':'localhost:8080/abcd'}});
		await urlGenerator(mockRequest, mockHandler);
		expect(mockInsertUrls).toHaveBeenCalled();
		expect(codeMock).toHaveBeenCalledWith(200);
		expect(mockHandler.response).toHaveBeenCalledWith('Short URL: localhost:8080/abcd');
	});
	it('should call response with  statuscode 500 when the insert fails', async() => {
		const codeMock = jest.fn();
		const mockHandler = {
			response: jest.fn(
				() => {
					return {code: codeMock};
				}
			),
		};
		const mockRequest = {
			payload: {}
		};
		const mockInsertUrls = jest.spyOn(dbUtils, 'insertUrls');
		mockInsertUrls.mockRejectedValue(new Error('Failed to insert data'));
		await urlGenerator(mockRequest, mockHandler);
		expect(codeMock).toHaveBeenCalledWith(500);
		expect(mockHandler.response).toHaveBeenCalledWith('Failed to insert data');
	});
});