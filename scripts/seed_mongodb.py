import os
import pandas as pd
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, OperationFailure

# MongoDB Configuration (MUST match app.py)
MONGO_URI = "mongodb+srv://sanketmaru3:Rk0AWe1Tzqem4TYR@cluster0.fiste.mongodb.net/"
DB_NAME = "farmfresh_db"
COLLECTION_NAME = "processed_market_data"

# Path to your processed_data.csv
# Ensure this path is correct relative to where you run this script
PROCESSED_DATA_PATH = "dataset/csv files/processed_data.csv" 

def seed_data():
    print("Attempting to connect to MongoDB...")
    try:
        client = MongoClient(MONGO_URI)
        client.admin.command('ping') # Test connection
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]
        print(f"Connected to MongoDB. Database: {DB_NAME}, Collection: {COLLECTION_NAME}")

        if not os.path.exists(PROCESSED_DATA_PATH):
            print(f"Error: '{PROCESSED_DATA_PATH}' not found. Please ensure your 'main.ipynb' generates this file and it's in the correct location.")
            print("Skipping MongoDB seeding.")
            return

        print(f"Reading data from '{PROCESSED_DATA_PATH}'...")
        df = pd.read_csv(PROCESSED_DATA_PATH)
        
        # Convert DataFrame to a list of dictionaries (JSON-like documents)
        data_to_insert = df.to_dict(orient='records')

        if data_to_insert:
            # Clear existing data in the collection before inserting new data
            # This prevents duplicate entries if you run the script multiple times
            print(f"Clearing existing data in collection '{COLLECTION_NAME}'...")
            collection.delete_many({})
            
            print(f"Inserting {len(data_to_insert)} documents into MongoDB...")
            collection.insert_many(data_to_insert)
            print("Data successfully seeded into MongoDB!")
        else:
            print("No data found in processed_data.csv to insert.")

    except ConnectionFailure as e:
        print(f"MongoDB connection failed: {e}. Please check your MONGO_URI and network.")
    except OperationFailure as e:
        print(f"MongoDB authentication or operation failed: {e}. Check your username/password in MONGO_URI.")
    except Exception as e:
        print(f"An unexpected error occurred during seeding: {e}")
    finally:
        if 'client' in locals() and client:
            client.close()
            print("MongoDB connection closed.")

if __name__ == "__main__":
    seed_data()
