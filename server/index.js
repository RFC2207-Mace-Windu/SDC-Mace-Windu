const express = require('express');
const app = express();
const sql = require('./qadb.js');
const Questions = require('./models/Questions.js');
var cors = require('cors')

app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());
app.use(express.static('./public'));
app.use(cors());

app.get('/qa/questions', (req, res) => {
  var product_id = req.query.product_id
  var page = req.query.page || 1;
  var count = req.query.count || 5;

  // console.log(product_id, count, page)
  Questions.getQuestionData(product_id, count, page)
  .then(data => {

    // console.log('show data =', data)
    res.status(200).send({
      product_id: product_id,
      results: data
    });
  })
  .catch(err => {
    res.status(500).send(err)
  })
})

app.get('/qa/questions/:question_id/answers', (req, res) => {
  var question_id = req.params.question_id;
  var page = req.query.page || 1;
  var count = req.query.count || 5;

  Questions.getAnswerData(question_id, page, count)
  .then(async (data) => {
    // console.log('panda', data);
    let answerData = await Promise.all(data.map(async (item) => {
      const result = await Questions.getAnswerPhotoData(item.answer_id)

      const test = {
        ... item,
        photos: result.map(el => {
          return {
            id: el.photo_id,
            url: el.photo_url
          }
        })
      }
      return test
    }))
    console.log('show result =', answerData)
    res.status(200).send({
      question: question_id,
      page: page,
      count: count,
      results: answerData
    });
  })
  .catch(err => {
    res.status(500).send(err)
  })
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  Questions.increaseQuestionHelpfulness(req.params.question_id)
  .then(() => {
    res.status(204).send();
  })
  .catch(err => {
    console.error(err);
    res.status(404).send(err);
  })
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  Questions.increaseAnswerHelpfulness(req.params.answer_id)
  .then(() => {
    res.status(204).send();
  })
  .catch(err => {
    console.error(err);
    res.status(404).send(err);
  })
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  Questions.reportAnswer(req.params.answer_id)
  .then(() => {
    res.status(204).send();
  })
  .catch(err => {
    console.error(err);
    res.status(404).send(err);
  })
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  console.log('show req.params = ', req.params);
  console.log('show req.body = ', req.body);
  const questionId = req.params.question_id;
  const newAnswer = {
    body: req.body.body,
    date: new Date().getTime(),
    answerer_name: req.body.name,
    answerer_email: req.body.email
  }
  console.log('show newAnswer & questionId = ', newAnswer, questionId);
  Questions.addAnswer(questionId, newAnswer)
  .then(response => {
    res.status(201).send(response.data);
  })
  .catch(err => console.log(err));
})

app.post('/qa/questions', (req, res) => {
  console.log('show question req.body = ', req.body);
  const newQuestion = {
    product_id: req.body.product_id,
    question_body: req.body.body,
    question_date: new Date().getTime(),
    asker_name: req.body.name,
    asker_email: req.body.email
  }
  Questions.addQuestion(newQuestion)
  .then(response => {
    res.status(201).send(response.data);
  })
  .catch(err => console.log(err));
})

const PORT = 8080;

app.listen(PORT);
console.log(`Server listening at port ${PORT}`)