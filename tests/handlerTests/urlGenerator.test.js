const {urlGenerator, redirectUrl} = require('../../src/handlers/urlGeneratorHandler');
const dbUtils = require('../../src/helpers/urlGeneratorDbOperations');
describe('The function urlGenerator', () => {
	it ('should call response with the short url', async() => {
		const codeMock = jest.fn();
		const mockHandler = {
			response: jest.fn(
				() => {
					return {code: codeMock};
				}),
		};
		const mockRequest = {
			payload: {
				longUrl: 'https://www.github.com/shubhamzanwar'
			}
		};
		const mockInsertUrls = jest.spyOn(dbUtils, 'insertUrls');
		mockInsertUrls.mockResolvedValue({dataValues:{'shorturl':'localhost:8080/abcd'}});
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
				}),
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

describe('The function redirectUrl', () => {
	it ('should redirect to the longurl if the connection is successful', async() => {
		const codeMock = jest.fn();
		const mockHandler = {
			redirect: jest.fn(
				() => {
					return {code: codeMock};
				}),
		};
		const mockRequest = {
			params: 'localhost:8080/abcd'
		};
		const mockFindOneUrl = jest.spyOn(dbUtils, 'findOneUrl');
		mockFindOneUrl.mockResolvedValue({'dataValues':{'longurl':'https://github.com/shubhamzanwar','shorturl':'localhost:8080/abcd'}});
		await redirectUrl(mockRequest, mockHandler);
		expect(mockFindOneUrl).toHaveBeenCalled();
		expect(codeMock).toHaveBeenCalledWith(301);
		expect(mockHandler.redirect).toHaveBeenCalledWith('https://github.com/shubhamzanwar');
	});
	it ('should call response with Not found and 404 status code when the url does not exist', async() => {
		const codeMock = jest.fn();
		const mockHandler = {
			response: jest.fn(
				() => {
					return {code: codeMock};
				}),
		};
		const mockRequest = {
			params: 'localhost:8080/abcd'
		};
		const mockFindOneUrl = jest.spyOn(dbUtils, 'findOneUrl');
		mockFindOneUrl.mockResolvedValue();
		await redirectUrl(mockRequest, mockHandler);
		expect(mockFindOneUrl).toHaveBeenCalled();
		expect(codeMock).toHaveBeenCalledWith(404);
		expect(mockHandler.response).toHaveBeenCalledWith('Not Found');
	});
	it ('should call response with Gone and 410 status code when the url expires', async() => {
		const codeMock = jest.fn();
		const mockHandler = {
			response: jest.fn(
				() => {
					return {code: codeMock};
				}),
		};
		const mockRequest = {
			params: 'localhost:8080/6a9159ba1210825'
		};
		const mockFindOneUrl = jest.spyOn(dbUtils, 'findOneUrl');
		mockFindOneUrl.mockResolvedValue({'dataValues': {
			'longurl': 'https://www.github.com/sarvani',
			'shorturl': '296a143bb370236',
			'createdAt': new Date('2018-01-30'),
			'updatedAt': '2020-01-30T13:23:30.138Z'
		}});
		await redirectUrl(mockRequest, mockHandler);
		expect(mockFindOneUrl).toHaveBeenCalled();
		expect(codeMock).toHaveBeenCalledWith(410);
		// expect(mockHandler.response).toHaveBeenCalledWith('Gone');
	});
});