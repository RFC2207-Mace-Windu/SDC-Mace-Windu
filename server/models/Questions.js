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