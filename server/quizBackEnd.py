from flask import Flask, request
import sqlite3 as sql
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


#variables that will be used to make sure we fetch Q/A from section
arrangeID = 0

#NOTE data to be sent to deleting sections
@app.route("/deleteSection", methods = ["GET", "POST"])
def deleteSections():
        if(request.method == "GET"):
                cursor = sql.connect("quiz.db").cursor()
                sec = cursor.execute("SELECT DISTINCT arr_name FROM arrange").fetchall()
                sections = []
                paths = []
                description = []
                wrapper = []
                for x in sec:
                        sections.append(x[0])
                for i in range(len(sec)):
                        #store paths
                        pathT = []
                        Tempaths = cursor.execute("SELECT p_path FROM paths WHERE sec_id = ?", (i + 1,))
                        for temp in Tempaths:
                                pathT.append(temp[0])
                        #store descriptions
                        descT = []
                        TempDesc = cursor.execute("SELECT p_description FROM paths WHERE sec_id = ?", (i + 1,))
                        for temp in TempDesc:
                                descT.append(temp[0])
                        paths.append(pathT)
                        description.append(descT)
                wrapper.append(sections)
                wrapper.append(paths)
                wrapper.append(description)
                data = json.dumps(wrapper)
                return data

#NOTE Control DELETING OF ANSWERS, QUESTIONS, SECTIONS, AND PATHS!!
@app.route("/deleteQA", methods = ["GET", "POST"])
def deleteQA():
        if(request.method == "POST"):
                store = json.loads(request.data)
                store = store["content"]
                connect = sql.connect("quiz.db")
                cursor = connect.cursor()
                indexAnswer = 0
                for x in store:
                        count = cursor.execute("SELECT COUNT(answer) FROM answers WHERE q_id = ?", (x["qid"],)).fetchall()
                        for xx in x["answers"]:
                                cursor.execute('''DELETE FROM answers WHERE q_id = ?
                                                AND a_answerNumbers = ?''', (x["qid"], xx))
                                connect.commit()
                                indexAnswer += 1
                                if(indexAnswer == count[0][0]):
                                        #delete question
                                        cursor.execute("DELETE FROM questions WHERE q_id = ?", (x["qid"],))
                                        connect.commit()
                        #restart answNum
                        indexRem = 1 
                        remainingAnswers = cursor.execute("SELECT answer FROM answers WHERE q_id = ?", (x["qid"],)).fetchall()
                        for answer in remainingAnswers:
                                cursor.execute("UPDATE answers SET a_answerNumbers = ? WHERE q_id = ? AND answer = ?", (indexRem, int(x["qid"]), answer[0]))
                                connect.commit()
                                indexRem += 1

                return "DELETED SUCCESSFULLY"

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
        cursor.execute("SELECT q_id FROM questions WHERE question = ?;", (question,))
        questionId = cursor.fetchall()
        return questionId [0][0]

def fetchAnswers(questionId):
        connect = sql.connect("quiz.db")
        cursor  = connect.cursor()
        cursor.execute("SELECT answer FROM answers WHERE q_id = ?;", (questionId,))
        answers = cursor.fetchall()
        directTo1 = cursor.execute("SELECT a_directTo FROM answers WHERE q_id = ?;", (questionId,)).fetchall()
        data = []
        answersList = []
        directTo = []
        for i in range(len(answers)):
                answersList.append(answers[i][0])
                directTo.append(directTo1[i][0])
        answersList.append(questionId)
        data.append(answersList)
        data.append(questionId)
        data.append(directTo)
        data = json.dumps(data)
        return data

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
                directTo = parse["directTo"]
                update(question, answers, q_id, directTo)

        return "cool"

def update(question, answers, q_id, directTo):
        connect = sql.connect("quiz.db")
        cursor = connect.cursor()
        print(answers)
        cursor.execute("UPDATE questions SET question = ? WHERE q_id = ?", (question, q_id))
        for i in range(len(answers)):
                cursor.execute("UPDATE answers SET answer = ?, a_directTo = ? WHERE q_id = ? AND a_answerNumbers = ?", (answers[i], directTo[i], q_id, i+1))
        connect.commit()


#get all questions
@app.route("/getAllQuestions",  methods = ["GET", "POST"])
def getAllQuestions():
        connect = sql.connect("quiz.db")
        cursor  = connect.cursor()
        cursor.execute('''SELECT question from questions;''')
        store = cursor.fetchall()
        store = json.dumps(store)
        return store

#check path and give back outcome
@app.route("/returnOutcome", methods = ["GET", "POST"])
def returnOutcome():
        if request.method == "POST":
                check = request.data
                parse = json.loads(check)

                path = parse["path"]

                outcome = getOutcome(path)
                return outcome

def getOutcome(path):
        connect = sql.connect("quiz.db")
        cursor  = connect.cursor()
        outcome = cursor.execute('''SELECT p_output, p_description FROM paths 
                WHERE p_path = ? AND sec_id = ?''', (path, arrangeID)).fetchall()
        try:
                temp = outcome[0][0]
        except IndexError:
                return "PATH DOES NOT EXITS, SORRY :("
        outcome1 = []
        outcome1.append(outcome[0][0])
        outcome1.append(outcome[0][1])
        outcome = json.dumps(outcome1)
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
                section = parse["section"]
                comment = parse["comment"]
           
                insertNewPath(outcome, path, section, comment)
        return "POSTED PATH SUCCESSFULLY"

def insertNewPath(outcome, path, section, comment):
        connect = sql.connect("quiz.db")
        cursor  = connect.cursor()
        #GET SECTION ID
        secID = cursor.execute("SELECT arr_id FROM arrange WHERE arr_name = ?", (section,)).fetchall()
        cursor.execute('''INSERT INTO paths(p_path, p_output, sec_id, p_description)
                        VALUES (?, ?, ?, ?)''', (path, outcome, secID[0][0], comment))
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
        query = '''select distinct question, answer, a_directTo from questions, answers where 
        questions.q_id = answers.q_id;'''
        cursor.execute(query)
        store = cursor.fetchall()

        everything = fixFormat(store, answersPerQuestion)
        store = json.dumps(everything)
        return store

def fixFormat(arr, answersPerQuestion):
        questions = []
        answers = []
        directTo = []
        everything = []
        temp = []
        temp2 = []
        moveNextSet = 0
        startNewSet = 0
        count = 0
        # print ("ANSWER PER QUESTION: ", arr)
        for x in arr:
                if(x[0] not in questions):
                        questions.append(x[0])
                if(startNewSet < answersPerQuestion[moveNextSet][0]):
                        temp.append(x[1])
                        temp2.append(x[2])
                        startNewSet += 1
                else:
                        answers.append(temp)
                        directTo.append(temp2)
                        temp = []
                        temp2 = []
                        temp.append(x[1])
                        temp2.append(x[2])
                        startNewSet = 1
                        moveNextSet +=1
        answers.append(temp)
        directTo.append(temp2)
        everything.append(questions)
        everything.append(answers)
        everything.append(directTo)
        print ("EVERYTHING: ", everything)
        return everything


#test
@app.route("/" ,  methods = ["GET", "POST"])
def hello():
    return "HELLO THERE"


#NOTE VARIABLE TO STORE PREVIOUS Q_ID FOR QUESTION TO DIRECT TO
questionID = ""

#BETTER VERSION!!
@app.route("/fetchAnswerAndQuestion", methods = ["GET", "POST"])
def fetchAnswerAndQuestion():
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
                #question ID saved here
                global questionID
                questionID = index
                
                data = []
                tempAnswers = cursor.execute('''select answer from answers where q_id = ?;''', (index,)).fetchall()
                tempQuestion = cursor.execute('''select question from questions where q_id = ?;''', (index,)).fetchall()
                data.append(tempQuestion[0][0])
                data.append(tempAnswers)
                data = json.dumps(data)
                return data
                
        if request.method == "POST":
                value =  request.data
                value = parse = json.loads(value)
                value =  value["counter"] 
                answerNum = value["answerNum"]

                connect = sql.connect("quiz.db")
                cursor  = connect.cursor()
                data = []

                tempAnswers = cursor.execute('''SELECT answer FROM answers
                        WHERE q_id =  (SELECT a_directTo FROM answers WHERE a_answerNumbers = ?
                        AND q_id = ?)''', (answerNum, questionID)).fetchall()

                tempQuestion = cursor.execute('''SELECT question, q_id FROM questions 
                        WHERE q_id = (SELECT a_directTo FROM answers WHERE a_answerNumbers = ?
                        AND q_id = ?)''', (answerNum, questionID)).fetchall()
                
                data.append(tempQuestion[0][0])
                data.append(tempAnswers)

                #UPDATE QUESTION ID HERE!!!
                global questionID
                questionID = tempQuestion[0][1]

                data = json.dumps(data)

                return data



if __name__ == '__main__':
        app.run(debug =True)