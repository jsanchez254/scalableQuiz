CREATE TABLE questions(
    q_id INTEGER PRIMARY KEY,
    question varchar(800)
);

CREATE TABLE answers(
    a_id INTEGER PRIMARY KEY,
    a_answerNumbers INTEGER,
    q_id int NOT NULL,
    answer varchar(800)
);

CREATE TABLE paths(
    p_id INTEGER PRIMARY KEY,
    p_path INTEGER,
    p_output varchar(2000)
);