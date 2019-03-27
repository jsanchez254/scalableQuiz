-- QUESTIONS TABLE INSERTIONS 
insert into questions (question) 
VALUES("What kind of food do you feel like eating?");

insert into questions (question) 
VALUES("What proportion of this do you want?");

-- -- ANSWERS TABLE INSERTIONS
insert into answers (q_id, answer, a_answerNumbers)
VALUES(1, "SALTY", 1);

insert into answers (q_id, answer, a_answerNumbers)
VALUES(1, "GREASY", 2);

insert into answers (q_id, answer, a_answerNumbers)
VALUES(1, "SWEET", 3);

insert into answers (q_id, answer, a_answerNumbers)
VALUES(2, "SMALL", 1);

insert into answers (q_id, answer, a_answerNumbers)
VALUES(2, "BIG", 2);

insert into answers (q_id, answer, a_answerNumbers)
VALUES(2, "HUGE", 3);

-- PATH TABLE INSERTIONS
-- insert into 

-- ARRANGEMENT 
insert into arrange (arr_name, arr_arrange)
VALUES("TEST", "1;2");
