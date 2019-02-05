from flask import Flask, request
import sqlite3 as sql
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


#NOTE add new question
@app.route("/postQuestion",  methods = ["GET", "POST"])
def postQuestion():
        if request.method == "POST":
                check = request.data    
                parse = json.loads(check)
                parse = parse["newQuestion"]
                question = parse["postQuestion"]
                answer1 = parse["answer1"]
                answer2 = parse["answer2"]
                answer3 = parse["answer3"]

                insertNewQuestion(question, answer1, answer2, answer3)

                return "cool"

def insertNewQuestion(question, answer1, answer2, answer3):
        connect = sql.connect("quiz.db")
        cursor  = connect.cursor()

        # get question id
        cursor.execute("SELECT MAX(q_id) FROM questions");
        questionID = cursor.fetchall()
        questionID = questionID[0][0] + 1

        print question

        cursor.execute('''INSERT INTO  questions (question) VALUES (?)''' , (question,))

        cursor.execute('''INSERT INTO answers (q_id, answer)
                        VALUES(?,?)''', (questionID, answer1))
        cursor.execute('''INSERT INTO answers (q_id, answer)
                        VALUES(?,?)''', (questionID, answer2))
        cursor.execute('''INSERT INTO answers (q_id, answer)
                        VALUES(?,?)''', (questionID, answer3))

        connect.commit()

        return "popo"

#NOTE fetch all answers
@app.route("/fetchEverything")
def fetchEverything():
        connect = sql.connect("quiz.db")
        #control database
        cursor  = connect.cursor()
        query = '''select distinct question, answer from questions, answers where 
        questions.q_id = answers.q_id;'''
        cursor.execute(query)
        store = cursor.fetchall()

        everything = fixFormat(store)
        store = json.dumps(everything)
        return store

def fixFormat(arr):
        questions = []
        answers = []
        everything = []
        for x in arr:
                if(x[0] not in questions):
                        questions.append(x[0])
                answers.append(x[1])
        everything.append(questions)
        everything.append(answers)

        return everything


#test
@app.route("/" ,  methods = ["GET", "POST"])
def hello():
    return "HELLO THERE"

#fetch questions and answers
@app.route("/fetchQuestion" ,  methods = ["GET", "POST"])
#NOTE AT FIRST THE FRONT END WILL FETCH FIRST QUESTION
def fetchQuestionInfo():
    if request.method == "GET":
        connect = sql.connect("quiz.db")
        #control database
        cursor  = connect.cursor()
        query = '''select question from questions where q_id = 1;'''
        cursor.execute(query)
        store = cursor.fetchall()
        store = json.dumps(store)
        print store[0]
        return store

#NOTE AFTER FETCHING FIRST QUESTION. PROGRAM GETS FOLLOWING QUESTIONS VIA POSTS
    if request.method == "POST":
        value =  request.data
        value = parse = json.loads(value)
        value =  value["counter"] 
        value =  value["counter"] + 1

        print value
        
        connect = sql.connect("quiz.db")
        #control database
        cursor  = connect.cursor()
        query = '''select question from questions where q_id =''' + str(value) + ''';'''
        print query
        cursor.execute(query)
        store = cursor.fetchall()
        store = json.dumps(store)
        print store
        return store

@app.route("/fetchAnswers" ,  methods = ["GET", "POST"])
#NOTE AT FIRST THE FRONT END WILL FETCH FIRST ANSWER  
def fetchAnswersInfo():
        if request.method == "GET":
            connect = sql.connect("quiz.db")
            #control database
            cursor  = connect.cursor()
            query = '''select answer from answers where q_id = 1;'''
            cursor.execute(query)
            store = cursor.fetchall()
            store = json.dumps(store)
            print store
            return store

#NOTE AFTER FETCHING FIRST ANSWER. PROGRAM GETS FOLLOWING ANSWERS VIA POSTS
        if request.method == "POST":
            value =  request.data
            value = parse = json.loads(value)
            value =  value["counter"] 
            value =  value["counter"] + 1
            
            connect = sql.connect("quiz.db")
            #control database
            cursor  = connect.cursor()
            query = '''select answer from answers where q_id =''' + str(value) + ''';'''
            print query
            cursor.execute(query)
            store = cursor.fetchall()
            store = json.dumps(store)
            print store
            return store


if __name__ == '__main__':
        app.run(debug =True)