from flask import Flask, request
import sqlite3 as sql
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


#variables that will be used to make sure we fetch Q/A from section
arrangeID = 0

@app.route("/postArrangeID", methods = ["GET", "POST"])
def updateArrID():
        if(request.method == "POST"):
                parse = json.loads(request.data)
                parse = parse["secID"]
                secID = parse["secID"]
                global arrangeID
                arrangeID = int(secID)
                return "ARRANGE ID SET!"

#FETCH SECTIONS
@app.route("/fetchSectionNames")
def fetchSectionNames():
        connect = sql.connect("quiz.db")
        cursor = connect.cursor()
        cursor.execute("SELECT arr_name FROM arrange;")
        sections = json.dumps(cursor.fetchall())
        return sections

#POST NEW SECTION
@app.route("/postNewSection", methods = ["GET", "POST"])
def newSection():
        if request.method == "POST":
                parse = json.loads(request.data)
                parse = parse["newOrder"]
                section = parse["section"]
                order = parse["arrangement1"]

                insertNewSection(section, order)
                return "SUCCESSFULY POSTED"
        
def insertNewSection(section, order):
        connect = sql.connect("quiz.db")
        cursor = connect.cursor()
        cursor.execute("INSERT INTO arrange(arr_name, arr_arrange) VALUES (?,?)", (section, order))
        connect.commit()

#NOTE ARRANGE QUESTION ORDER FOR SECTION
@app.route("/arrangeQuestion", methods = ["GET", "POST"])
def arrange():
        if request.method == "POST":
                parse = json.loads(request.data)
                parse = parse["newOrder"]
                sets = parse["sets"]
                order = parse["arrangement"]

                changeOrder(sets, order)

                return "SUCCESSFUL"
def changeOrder(sets, order):
        connect = sql.connect("quiz.db")
        cursor = connect.cursor()
        print order
        cursor.execute("UPDATE arrange SET arr_arrange = ? WHERE arr_name = ?", (order, sets))
        connect.commit()

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
        answersList = []
        for i in range(len(answers)):
                answersList.append(answers[i][0])
        answersList.append(questionId)
        answers = json.dumps(answersList)
        print ("ANSWERS" , answers)
        return answers

#update question
@app.route("/updateQuestion", methods = ["GET", "POST"])
def updateQuestion():
        if request.method == "POST":
                store = request.data
                parse = json.loads(store)
                parse = parse["post"]
                answers = parse["answers"]
                question = parse["actualQuestion"]
                q_id = parse["q_id"]
                update(question, answers, q_id)

        return "cool"

def update(question, answers, q_id):
        connect = sql.connect("quiz.db")
        cursor = connect.cursor()
        print(answers)
        cursor.execute("UPDATE questions SET question = ? WHERE q_id = ?", (question, q_id))
        for i in range(len(answers)):
                print answers[i]
                cursor.execute("UPDATE answers SET answer = ? WHERE q_id = ? AND a_answerNumbers = ?", (answers[i], q_id, i+1))
        connect.commit()


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

#NOTE ADD A NEW QUESTION WITH ANSWERS
@app.route("/postQuestion",  methods = ["GET", "POST"])
def postQuestion():
        if request.method == "POST":
                check = request.data    
                parse = json.loads(check)
                parse = parse["newQuestion"]
                question = parse["postQuestion"]
                directTo = parse["postDirection"]
                answers = parse["postAnswers"]
                insertNewQuestion(question, answers, directTo)
                return "INSERTED SUCCESSFULLY"

def insertNewQuestion(question, answers, directTo):
        connect = sql.connect("quiz.db")
        cursor  = connect.cursor()

        # get question id
        cursor.execute("SELECT MAX(q_id) FROM questions");
        questionID = cursor.fetchall()
        questionID = questionID[0][0] + 1

        cursor.execute('''INSERT INTO  questions (question) VALUES (?)''' , (question,))

        #insert all answers from answers array posted by front end
        for i in range(len(answers)):
                cursor.execute('''INSERT INTO answers (q_id, answer, a_answerNumbers, a_directTo)
                                VALUES(?,?,?,?)''', (questionID, answers[i], i + 1, directTo[i]))
        connect.commit()

        return "popo"

#NOTE fetch all answers
@app.route("/fetchEverything")
def fetchEverything():
        connect = sql.connect("quiz.db")
        #control database
        cursor  = connect.cursor()
        #COUNT ANSWERS PER QUESTION
        cursor.execute("SELECT MAX(a_answerNumbers) FROM ANSWERS GROUP BY q_id;")
        answersPerQuestion = cursor.fetchall()
        query = '''select distinct question, answer from questions, answers where 
        questions.q_id = answers.q_id;'''
        cursor.execute(query)
        store = cursor.fetchall()

        everything = fixFormat(store, answersPerQuestion)
        store = json.dumps(everything)
        return store

def fixFormat(arr, answersPerQuestion):
        questions = []
        answers = []
        everything = []
        temp = []
        moveNextSet = 0
        startNewSet = 0
        count = 0
        for x in arr:
                if(x[0] not in questions):
                        questions.append(x[0])
                if(startNewSet < answersPerQuestion[moveNextSet][0]):
                        temp.append(x[1])
                        startNewSet += 1
                else:
                        answers.append(temp)
                        print answers
                        temp = []
                        temp.append(x[1])
                        startNewSet = 1
                        moveNextSet +=1
        answers.append(temp)
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
        cursor  = connect.cursor()

        print "ARRANGE: ", arrangeID
        #FETCH ORDER PATH AND MAKE IT INTO ARRAY
        cursor.execute("SELECT arr_arrange from arrange WHERE arr_id = ?", (arrangeID,))
        order = cursor.fetchall()
        order = order[0][0]
        index = ""
        if (order[1] != ';'):
                index = order[0] + order[1]
        else:
                index = order[0]

        cursor.execute('''select question from questions where q_id = ?;''', (index,))
        store = cursor.fetchall()
        store = json.dumps(store)
        print store[0]
        return store

#NOTE AFTER FETCHING FIRST QUESTION. PROGRAM GETS FOLLOWING QUESTIONS VIA POSTS
    if request.method == "POST":
        value =  request.data
        value = parse = json.loads(value)
        value =  value["counter"] 
        answerNum = value["answerNum"]
        value =  value["counter"] + 1

        print "ANSWER NUMBER ", answerNum
        
        index = int(value)

        connect = sql.connect("quiz.db")
        cursor  = connect.cursor()

        #get id value to be compared to
        cursor.execute("SELECT MAX(q_id) FROM questions")
        valueToCompare = cursor.fetchall()

        #FETCH ORDER PATH AND MAKE IT INTO ARRAY
        cursor.execute("SELECT arr_arrange from arrange WHERE arr_id = 1")
        order = cursor.fetchall()
        order = order[0][0]
        getOrder = []
        x = 0
        while(x + 1 < len(order)):
                if (order[x] != ';' and order[x + 1] == ';' ):
                        getOrder.append(int(order[x]))
                elif(order[x] != ';' and order[x + 1] !=  ';'):
                        temp = order[x] + order[x +1]
                        getOrder.append(int(temp))
                        x += 2
                        continue
                x+=1
        getOrder.append(int(order[x]))
        ############################################

        if(value > valueToCompare[0][0]):
                value = valueToCompare[0][0]

        cursor.execute('''select question from questions where q_id = ?''', (getOrder[index-1],))
        store = cursor.fetchall()
        store = json.dumps(store)
        print store
        return store

@app.route("/fetchAnswers" ,  methods = ["GET", "POST"])
#NOTE AT FIRST THE FRONT END WILL FETCH FIRST ANSWER  
def fetchAnswersInfo():
        if request.method == "GET":
                connect = sql.connect("quiz.db")
                cursor  = connect.cursor()

                #FETCH ORDER PATH
                cursor.execute("SELECT arr_arrange from arrange WHERE arr_id = 1")
                order = cursor.fetchall()
                order = order[0][0]
                index = ""
                if (order[1] != ';'):
                        index = order[0] + order[1]
                else:
                        index = order[0]

                cursor.execute('''select answer from answers where q_id = ?;''', (index,))
                    
                store = cursor.fetchall()
                store = json.dumps(store)
                
                return store

#NOTE AFTER FETCHING FIRST ANSWER. PROGRAM GETS FOLLOWING ANSWERS VIA POSTS
        if request.method == "POST":
                value =  request.data
                value = parse = json.loads(value)
                value =  value["counter"] 
                value =  value["counter"] + 1

                connect = sql.connect("quiz.db")
                cursor  = connect.cursor()

                index = int(value)
                #FETCH ORDER PATH AND MAKE IT INTO ARRAY
                cursor.execute("SELECT arr_arrange from arrange WHERE arr_id = 1")
                order = cursor.fetchall()
                order = order[0][0]
                getOrder = []
                x = 0
                while(x + 1 < len(order)):
                        if (order[x] != ';' and order[x + 1] == ';' ):
                                print "COOL ", order[x]
                                getOrder.append(int(order[x]))
                        elif(order[x] != ';' and order[x + 1] !=  ';'):
                                temp = order[x] + order[x +1]
                                getOrder.append(int(temp))
                                x += 2
                                continue
                        x+=1
                getOrder.append(int(order[x]))
                ############################################

                #get id value to be compared to
                cursor.execute("SELECT MAX(q_id) FROM questions")
                valueToCompare = cursor.fetchall()

                if(value > valueToCompare[0][0]):
                        value = valueToCompare[0][0]

                cursor.execute('''select answer from answers where q_id = ?''', (getOrder[index-1],))
                store = cursor.fetchall()
                store = json.dumps(store)
                print store
                return store


if __name__ == '__main__':
        app.run(debug =True)