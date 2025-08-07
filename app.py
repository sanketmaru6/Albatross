import os
from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np
from werkzeug.utils import secure_filename
from datetime import datetime
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, OperationFailure

# Initialize Flask app
app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Configuration
BASE_PATH = "dataset/csv files"
MODELS_PATH = os.path.join(BASE_PATH, "models")
os.makedirs(MODELS_PATH, exist_ok=True)

# MongoDB Configuration
MONGO_URI = "mongodb+srv://sanketmaru3:Rk0AWe1Tzqem4TYR@cluster0.fiste.mongodb.net/"
DB_NAME = "farmfresh_db" # Your database name
COLLECTION_NAME = "processed_market_data" # Collection to store processed data

# MongoDB Client
mongo_client = None
try:
    mongo_client = MongoClient(MONGO_URI)
    # The ping command is cheap and does not require auth.
    mongo_client.admin.command('ping')
    print("MongoDB connection successful!")
except ConnectionFailure as e:
    print(f"MongoDB connection failed: {e}")
    mongo_client = None
except OperationFailure as e:
    print(f"MongoDB authentication or operation failed: {e}")
    mongo_client = None
except Exception as e:
    print(f"An unexpected error occurred during MongoDB connection: {e}")
    mongo_client = None

# Load models and preprocessor
price_model = None
demand_model = None
preprocessor = None
try:
    price_model = joblib.load(os.path.join(MODELS_PATH, "price_model.pkl"))
    demand_model = joblib.load(os.path.join(MODELS_PATH, "demand_model.pkl"))
    preprocessor = joblib.load(os.path.join(MODELS_PATH, "preprocessor.pkl"))
    print(" Models loaded successfully from file system")
except Exception as e:
    print(f" Error loading models from file system: {e}. Please ensure .pkl files are in {MODELS_PATH}")
    # Models remain None if loading fails

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['commodity', 'state', 'quantity']
        if not all(field in data for field in required_fields):
            return jsonify({
                'success': False,
                'error': f"Missing required fields. Please provide: {', '.join(required_fields)}"
            }), 400

        # Create DataFrame from input
        input_data = {
            'commodity': [data['commodity']],
            'state': [data['state']],
            'month': [data.get('month', datetime.now().month)],
            'year': [data.get('year', datetime.now().year)],
            'quantity': [data['quantity']],
            'week': [data.get('week', datetime.now().isocalendar()[1])],
            'is_gujarat': [data['state'].lower() == 'gujarat']
        }
        input_df = pd.DataFrame(input_data)
        
        # Make predictions
        results = {}
        
        if price_model:
            price_pred = price_model.predict(input_df)
            results['price_per_unit'] = round(float(price_pred[0]), 2)
        else:
            results['price_per_unit'] = "Price model not loaded (check backend logs)"
            
        if demand_model:
            demand_pred = demand_model.predict(input_df)
            results['demand_velocity'] = round(float(demand_pred[0]), 4)
        else:
            results['demand_velocity'] = "Demand model not loaded (check backend logs)"
        
        return jsonify({
            'success': True,
            'predictions': results,
            'input_data': input_data
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/commodities', methods=['GET'])
def get_commodities():
    if not mongo_client:
        return jsonify({
            'success': False,
            'error': 'MongoDB connection not established. Check backend logs.'
        }), 500
    
    try:
        db = mongo_client[DB_NAME]
        collection = db[COLLECTION_NAME]
        
        # Fetch distinct commodities and states from MongoDB
        commodities = sorted(collection.distinct('commodity'))
        states = sorted(collection.distinct('state'))
        
        if not commodities and not states:
            # Fallback for demonstration if collection is empty
            commodities = ["Spinach", "Carrot", "Potato", "Tomato", "Onion", "Cabbage"]
            states = ["Gujarat", "Maharashtra", "Karnataka", "Uttar Pradesh", "Punjab"]
            return jsonify({
                'success': True,
                'commodities': sorted(commodities),
                'states': sorted(states),
                'message': 'Using dummy data for commodities/states as MongoDB collection is empty or data not found.'
            })

        return jsonify({
            'success': True,
            'commodities': commodities,
            'states': states
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            save_path = os.path.join(BASE_PATH, filename)
            file.save(save_path)
            
            return jsonify({
                'success': True,
                'message': f'File {filename} uploaded successfully to backend file system'
            })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in {'csv'}

if __name__ == '__main__':
    # Ensure the base path exists for models and data
    os.makedirs(BASE_PATH, exist_ok=True)
    os.makedirs(MODELS_PATH, exist_ok=True)
    app.run(host='0.0.0.0', port=5000, debug=True)
