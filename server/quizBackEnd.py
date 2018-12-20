from flask import Flask, request
import sqlite3 as sql
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#test
@app.route("/" ,  methods = ["GET", "POST"])
def hello():
    return "HELLO THERE"

#fetch questions and answers
@app.route("/fetchQuestion" ,  methods = ["GET", "POST"])
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
    if request.method == "POST":
        value =  request.data
        value = parse = json.loads(value)
        value =  value["counter"] 
        value =  value["counter"] + 1
        
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