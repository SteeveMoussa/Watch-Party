const request = require('supertest')
const app = require("../pages/Watchlist")

const baseurl = 'https://api.themoviedb.org/3/'

// https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&session_id=${session_id}&page=${page}

describe('Fetch the watchlist', () => {
    test.skip('It get all movies', async () => {
        const result = await request(baseurl).get('/movie/popular')
        expect(result.statusCode).toBe(200)
    })
})