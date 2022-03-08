from app import app
from flask import request, jsonify
from pymongo import MongoClient
from bson import json_util

user = "" 
passwd = ""
host = ""
base = ""

client = MongoClient(f'mongodb://{user}:{passwd}@{host}/{base}')
db = client[base]

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/form', methods=['GET'])
def get_form():
    collection = db['form']
    cursor = collection.find({})
    results = list(cursor)

    return jsonify(json_util.dumps(results))

@app.route('/forms', methods=['POST'])
def forms():
    collection = db['form']

    forms = request.json
    for form in forms:
        form = {
            'gender': form['gender'],
            'position': form['position'],
            'language': form['language']
        }

        collection.insert(form)
    return "Inserted "

@app.route('/form', methods=['POST'])
def form():
    collection = db['form']

    form = {
        'gender': request.json['gender'],
        'position': request.json['position'],
        'language': request.json['language']
    }

    collection.insert(form)
    return "Inserted "

@app.route('/register', methods=['POST'])
def register():
    collection = db['user']

    register_form = {
        'email': request.json['email'],
        'pass': request.json['pass']
    }

    collection.insert(register_form)
    return {
        'status': 'OK'
    }

@app.route('/login', methods=['POST'])
def login():
    collection = db['user']
    
    email = request.json['email']
    passwd = request.json['pass']

    cursor = collection.find({'email': email, 'pass': passwd})
    results = list(cursor)

    if len(results)>0:
        return jsonify(
            status='OK',
            sessionID='tmp'
        )
    else:
        return 'Authentication Failed', 401
