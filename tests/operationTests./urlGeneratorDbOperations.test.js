const dbUtils = require('../../src/helpers/urlGeneratorDbOperations');
const db = require('../../models/index');

describe('In dbUtils', () => {
	describe('The function insertUrls', () => {
		it ('should create an entry in urls', async() => {
			const mockCreateUrl = jest.spyOn(db.urls, 'create');
			mockCreateUrl.mockResolvedValue();
			await dbUtils.insertUrls({'longUrl':'https://www.github.com/shubhamzanwar', 'shortUrl': 'localhost:8080/abcd'});
			expect(mockCreateUrl).toHaveBeenCalled();
			expect(mockCreateUrl).toHaveBeenCalledWith({'longurl':'https://www.github.com/shubhamzanwar', 'shorturl': 'localhost:8080/abcd'});
			mockCreateUrl.mockRestore();
		});
	});
});