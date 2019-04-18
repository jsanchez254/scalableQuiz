CREATE TABLE questions(
    q_id INTEGER PRIMARY KEY,
    question varchar(800)
);

CREATE TABLE answers(
    a_id INTEGER PRIMARY KEY,
    a_answerNumbers INTEGER,
<<<<<<< HEAD
    q_id int NOT NULL,
=======
    q_id INTEGER,
>>>>>>> b8d48936083b55f5a850ee79ee8db9edb6e11bd8
    answer varchar(800),
    a_directTo INTEGER
);

CREATE TABLE paths(
    p_id INTEGER PRIMARY KEY,
    p_path INTEGER,
    p_output varchar(2000),
<<<<<<< HEAD
=======
    p_description varchar(10000),
>>>>>>> b8d48936083b55f5a850ee79ee8db9edb6e11bd8
    sec_id INTEGER
);

CREATE TABLE arrange(
    arr_id INTEGER PRIMARY KEY,
    arr_name varchar(300),
    arr_arrange varchar(800)
);