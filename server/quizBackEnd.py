from flask import Flask, request
import sqlite3 as sql
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#fetch answers when a question is posted
@app.route("/editAnswersFetch" , methods = ["GET", "POST"])
def editAnswersFetch():
        if request.method == "POST":
                store = request.data
                parse = json.loads(store)
                question = parse["question1"]
                
                questionId = getQuestionId(question["question1"])
                return fetchAnswers(questionId)
        return "cool1"

def getQuestionId(question):
        connect = sql.connect("quiz.db")
        cursor = connect.cursor()
        print question
        cursor.execute("SELECT q_id FROM questions WHERE question = ?;", (question,))
        questionId = cursor.fetchall()
        return questionId [0][0]

def fetchAnswers(questionId):
        connect = sql.connect("quiz.db")
        cursor  = connect.cursor()
        cursor.execute("SELECT answer FROM answers WHERE q_id = ?;", (questionId,))
        answers = cursor.fetchall()
        answers = json.dumps(answers)
        print ("ANSWERS" , answers)
        return answers

#update question
@app.route("/updateQuestion", methods = ["GET", "POST"])
def updateQuestion():
        if request.method == "POST":
                store = request.data
                parse = json.loads(store)
                print parse

        return "cool"

#get all questions
@app.route("/getAllQuestions",  methods = ["GET", "POST"])
def getAllQuestions():
        connect = sql.connect("quiz.db")
        cursor  = connect.cursor()
        cursor.execute('''SELECT question from questions;''')
        store = cursor.fetchall()
        store = json.dumps(store)
        print store
        return store

#check path and give back outcome
@app.route("/returnOutcome", methods = ["GET", "POST"])
def returnOutcome():
        if request.method == "POST":
                check = request.data
                parse = json.loads(check)

                path = parse["path"]
                print path

                outcome = getOutcome(path)
                print outcome
                return outcome

def getOutcome(path):
        connect = sql.connect("quiz.db")
        cursor  = connect.cursor()

        cursor.execute("SELECT p_output FROM paths where p_path = ?", (path,))

        outcome = cursor.fetchall()
        try:
                outcome = outcome[0][0]
        except IndexError:
                return "PATH DOES NOT EXITS, SORRY :("

        return outcome

#post new path and outcome
@app.route("/postPath", methods = ["GET", "POST"])
def postPath():
        if request.method == "POST":
                check = request.data
                parse = json.loads(check)
                parse = parse["newPath"]

                outcome = parse["outcome"]
                path = parse["path"]

                #CHECK FORMAT IS CORRECT FOR PATH, ONLY NUMBERS ALLOWED
                #MODIFY HERE :D
                # checkFormat(path)
                
                insertNewPath(outcome, path)
        return "cool"

#MODIFY FUNCTION HERE :D
# def checkFormat(path):


def insertNewPath(outcome, path):
        connect = sql.connect("quiz.db")
        cursor  = connect.cursor()

        cursor.execute('''INSERT INTO paths(p_path, p_output)
                        VALUES (?, ?)''', (path, outcome))
        connect.commit()

        return "cool"

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
        
        connect = sql.connect("quiz.db")
        #control database
        cursor  = connect.cursor()

        #get id value to be compared to
        cursor.execute("SELECT MAX(q_id) FROM questions")
        valueToCompare = cursor.fetchall()

        if(value > valueToCompare[0][0]):
                value = valueToCompare[0][0]

        print "VALUE1: ", value

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

                #get id value to be compared to
                cursor.execute("SELECT MAX(q_id) FROM questions")
                valueToCompare = cursor.fetchall()

                if(value > valueToCompare[0][0]):
                        value = valueToCompare[0][0]
        
                print "VALUE: ", value
        
                query = '''select answer from answers where q_id =''' + str(value) + ''';'''
                print query
                cursor.execute(query)
                store = cursor.fetchall()
                store = json.dumps(store)
                print store
                return store


if __name__ == '__main__':
        app.run(debug =True)