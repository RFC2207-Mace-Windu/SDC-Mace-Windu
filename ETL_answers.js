const fs = require('fs');
const csvparse = require('csv-parse');
const parse = csvparse.parse;
const sql = require('./server/qadb.js')

const processFile = async () => {
  const records = [];
  const parser = fs
    .createReadStream(`./answers.csv`)
    .pipe(parse({
    // CSV options if any
    }));
  for await (const record of parser) {
    // Work with each record
    records.push(record);
  }
  return records;
}

(async () => {
  const records = await processFile();
  // console.log(records[1])
  for (let i = 1; i < records.length; i++) {
    var currentRecord = records[i];
    console.log(currentRecord)
    await sql`INSERT INTO answers (answer_id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness) VALUES (${parseInt(currentRecord[0])}, ${parseInt(currentRecord[1])}, ${currentRecord[2]}, ${parseInt(currentRecord[3])}, ${currentRecord[4]}, ${currentRecord[5]}, ${!!parseInt(currentRecord[6])}, ${parseInt(currentRecord[7])});`
  }
})();