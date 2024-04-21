from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo
import urllib.parse

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes

# Configure the MongoDB connection URI
username = 'cmjadav1425'
password = '7Tnhh79teOGFYpVo'  # Updated password (remove URL encoding)
host = 'cluster0.33g4bwi.mongodb.net'
database = 'Stackoverflowstars'  # Updated database name
uri = f'mongodb+srv://{urllib.parse.quote_plus(username)}:{urllib.parse.quote_plus(password)}@{host}/{database}?retryWrites=true&w=majority'
app.config['MONGO_URI'] = uri

# Initialize PyMongo
mongo = PyMongo(app)

@app.route('/api/login', methods=['POST'])  # Define route for login
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Check if the user exists in the MongoDB collection
    user = mongo.db.users.find_one({'email': email, 'password': password})


    if user:
        return jsonify({'success': True, 'message': 'Login successful'})
        
    else:
        return jsonify({'success': False, 'message': 'Invalid username or password'})


@app.route('/api/register', methods=['POST'])  # Route for user registration
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if the username or email already exists in the database
    if mongo.db.users.find_one({'$and': [{'username': username}, {'email': email}]}):
        return jsonify({'success': False, 'message': 'Username or email already exists'})

    # Insert new user into MongoDB collection
    new_user = {'username': username, 'email': email, 'password': password}
    mongo.db.users.insert_one(new_user)

    return jsonify({'success': True, 'message': 'Registration successful'})

if __name__ == '__main__':
    app.run(debug=True)
