const start = require('../../server.js');
const server = start();
const dbUtils = require('../../src/helpers/urlGeneratorDbOperations');

const init = async ()=> {
	await server.initialize();
	return server;
};
describe('In the server', () => {
	let server;

	beforeEach(async () => {
		server = await init();
	});

	afterEach(async () => {
		await server.stop();
	});
	
	it ('The route POST /urls should return a statusCode 200', async () => {
		const options = {
			method: 'POST',
			url: '/urls',
			payload: {
				'longUrl':'https://www.github.com/sarvanideekshitula',
			}
		};
		const mockPostUrls = jest.spyOn(dbUtils, 'insertUrls');
		mockPostUrls.mockResolvedValue({dataValues:{'shorturl':'541449962a76777'}});
		const response = await server.inject(options);
		expect(response.statusCode).toBe(200);
		expect(response.result).toBe('Short URL: 541449962a76777');
	});
	it ('The route POST /urls should return a statusCode 500 if payload is not given', async () => {
		const options = {
			method: 'POST',
			url: '/urls',
			payload: {
				'longUrl':'https://www.github.com/sarvanideekshitula',
			}
		};
		const mockPostUrls = jest.spyOn(dbUtils, 'insertUrls');
		mockPostUrls.mockRejectedValue(new Error('longUrl Not found'));
		const response = await server.inject(options);
		expect(response.statusCode).toBe(500);
		expect(response.result).toBe('longUrl Not found');
	});
	it ('The route GET /{id} should return a statusCode 301', async () => {
		const options = {
			method: 'GET',
			url: '/b382bb543458aa',
		};
		const mockPostNotes = jest.spyOn(dbUtils, 'findOneUrl');
		mockPostNotes.mockResolvedValue({'dataValues': {'shorturl': 'localhost:8080/abcd', 'longurl':'https://www.github.com/sarvanideekshitula'}});
		const response = await server.inject(options);
		expect(response.statusCode).toBe(301);
	});
	it ('The route GET /{id} should return a statusCode 500 if db fails', async () => {
		const options = {
			method: 'GET',
			url: '/b382bb543458aa',
		};
		const mockPostUrls = jest.spyOn(dbUtils, 'findOneUrl');
		mockPostUrls.mockRejectedValue(new Error('shortUrl Not found'));
		const response = await server.inject(options);
		expect(response.statusCode).toBe(500);
	});
});