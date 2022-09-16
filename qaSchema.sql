CREATE DATABASE qadb;

USE qadb;

CREATE TABLE products (
  product_id INT PRIMARY KEY,
  "name" text
);

CREATE TABLE questions (
  question_id INT PRIMARY KEY,
  product_id INT,
  question_body text,
  question_date BIGINT,
  asker_name text,
  asker_email text,
  reported BOOLEAN DEFAULT '0',
  question_helpfulness INT,
  FOREIGN KEY (product_id)
  references products(product_id)
);

CREATE TABLE answers (
  answer_id INT PRIMARY KEY,
  question_id INT,
  body text,
  "date" BIGINT,
  answerer_name text,
  answerer_email text,
  reported BOOLEAN DEFAULT '0',
  helpfulness INT,
  FOREIGN KEY (question_id)
  references questions(question_id)
);

CREATE TABLE photos (
  photo_id INT PRIMARY KEY,
  answer_id INT,
  photo_url text,
  FOREIGN KEY (answer_id)
  references answers(answer_id)
);