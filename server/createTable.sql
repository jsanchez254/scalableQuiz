CREATE TABLE questions(
    q_id INTEGER PRIMARY KEY,
    question varchar(800)
);

CREATE TABLE answers(
    a_id INTEGER PRIMARY KEY,
    q_id int NOT NULL,
    answer varchar(800)
);