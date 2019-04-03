-- QUESTIONS TABLE INSERTIONS 
insert into questions (question) 
VALUES("What kind of food do you feel like eating?");

insert into questions (question) 
VALUES("What proportion of this do you want?");

insert into questions (question) 
VALUES("Is Taco Bell Great?");

-- -- ANSWERS TABLE INSERTIONS
insert into answers (q_id, answer, a_answerNumbers, a_directTo)
VALUES(1, "SALTY", 1, 3);

insert into answers (q_id, answer, a_answerNumbers, a_directTo)
VALUES(1, "GREASY", 2, 2);

insert into answers (q_id, answer, a_answerNumbers, a_directTo)
VALUES(1, "SWEET", 3, 3);

insert into answers (q_id, answer, a_answerNumbers, a_directTo)
VALUES(2, "SMALL", 1, 1);

insert into answers (q_id, answer, a_answerNumbers, a_directTo)
VALUES(2, "BIG", 2, 3);

insert into answers (q_id, answer, a_answerNumbers, a_directTo)
VALUES(2, "HUGE", 3, 2);

insert into answers (q_id, answer, a_answerNumbers, a_directTo)
VALUES(3, "YES", 1, 1);

insert into answers (q_id, answer, a_answerNumbers, a_directTo)
VALUES(3, "NO", 2, 2);

insert into answers (q_id, answer, a_answerNumbers, a_directTo)
VALUES(3, "MAYBE", 3, 2);

-- PATH TABLE INSERTIONS
-- insert into 

-- ARRANGEMENT 
insert into arrange (arr_name, arr_arrange)
VALUES("TEST 1", "1;2;3");
insert into arrange (arr_name, arr_arrange)
VALUES("TEST 2", "3;2;1");
