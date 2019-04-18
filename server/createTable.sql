CREATE TABLE questions(
    q_id INTEGER PRIMARY KEY,
    question varchar(800)
);

CREATE TABLE answers(
    a_id INTEGER PRIMARY KEY,
    a_answerNumbers INTEGER,
    q_id INTEGER,
    answer varchar(800),
    a_directTo INTEGER
);

CREATE TABLE paths(
    p_id INTEGER PRIMARY KEY,
    p_path INTEGER,
    p_output varchar(2000),
    p_description varchar(10000),
    sec_id INTEGER
);

CREATE TABLE arrange(
    arr_id INTEGER PRIMARY KEY,
    arr_name varchar(300),
    arr_arrange varchar(800)
);