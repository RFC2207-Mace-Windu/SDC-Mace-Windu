const sql = require('../qadb.js');

exports.getQuestionData = (product_id, count, page) => {
  return sql`SELECT * FROM questions WHERE product_id = ${product_id} ORDER BY question_helpfulness DESC LIMIT ${count} OFFSET ${(page -1) * count};`
}

exports.getAnswerData = (question_id, page, count) => {
  return sql`SELECT * FROM answers WHERE question_id = ${question_id} ORDER BY helpfulness DESC LIMIT ${count} OFFSET ${(page - 1) * count};`
  // return sql`SELECT * FROM answers INNER JOIN photos ON answers.answer_id = photos.answer_id WHERE question_id = 34;`
  // return sql`SELECT * FROM answers INNER JOIN photos ON answers.answer_id = photos.answer_id WHERE question_id = ${question_id};`
}

exports.getAnswerPhotoData = (answer_id) => {
  return sql`SELECT * FROM photos WHERE answer_id = ${answer_id};`
}

exports.increaseQuestionHelpfulness = (question_id) => {
  return sql`UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${question_id};`
}

exports.increaseAnswerHelpfulness = (answer_id) => {
  return sql`UPDATE answers SET helpfulness = helpfulness + 1 WHERE answer_id = ${answer_id};`
}

exports.reportAnswer = (answer_id) => {
  return sql`DELETE FROM answers WHERE answer_id = ${answer_id};`
}

exports.addAnswer = (question_id, body) => {
  return sql`INSERT INTO answers (question_id, body, date, answerer_name, answerer_email) VALUES (${Number(question_id)}, ${body.body}, ${body.date}, ${body.answerer_name}, ${body.answerer_email});`
}

exports.addQuestion = (body) => {
  return sql`INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email) VALUES (${body.product_id}, ${body.question_body}, ${body.question_date}, ${body.asker_name}, ${body.asker_email});`
}