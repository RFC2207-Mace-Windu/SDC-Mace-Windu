const sql = require('../server/qadb.js');
const axios = require ('axios');

jest.setTimeout(10000)

describe('Questions API Tests', () => {
    it('should get questions from the database', async () => {
      let result = null;
      await axios.get('http://127.0.0.1:8080/qa/questions?product_id=4')
        .then((data) => {
          result = data;
        })
        .catch((err) => {
          throw err;
        })
      expect(result).not.toEqual(null);
    })

    it('should get answers from the database', async () => {
      let result = null;
      await axios.get('http://127.0.0.1:8080/qa/questions/32/answers')
        .then((data) => {
          result = data;
        })
        .catch((err) => {
          throw err;
        })
      expect(result).not.toEqual(null);
    })

    it('should mark a question helpful', async () => {
      let result = null;
      await axios.put('http://127.0.0.1:8080/qa/questions/32/helpful')
        .then((data) => {
          result = data;
        })
        .catch((err) => {
          throw err;
        })
        console.log('show result =', result)
      expect(result.status).toEqual(204);
    })

    it('should mark a answer helpful', async () => {
      let result = null;
      await axios.put('http://127.0.0.1:8080/qa/answers/38/helpful')
        .then((data) => {
          result = data;
        })
        .catch((err) => {
          throw err;
        })
        console.log('show result =', result)
      expect(result.status).toEqual(204);
    })

    it('should post a question', async () => {
      let result = null;
      await axios.post('http://127.0.0.1:8080/qa/questions', {
        product_id: 4,
        body: 'another test question example',
        name: 'user33',
        email: 'user33@email.com'
      })
        .then((data) => {
          result = data;
        })
        .catch((err) => {
          throw err;
        })
        console.log('show result =', result)
      expect(result.status).toEqual(201);
    })

    it('should post an answer', async () => {
      let result = null;
      await axios.post('http://127.0.0.1:8080/qa/questions/32/answers', {
        body: 'test answer example',
        name: 'user32',
        email: 'user32@email.com'
      })
        .then((data) => {
          result = data;
        })
        .catch((err) => {
          throw err;
        })
        console.log('show result =', result)
      expect(result.status).toEqual(201);
    })
})