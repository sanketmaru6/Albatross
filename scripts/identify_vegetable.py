import json

def identify_object(item_name: str):
    """
    Simulates an AI model identifying an object and classifying it.
    In a real application, this would involve image processing and a trained ML model.
    """
    vegetables = [
        "spinach", "carrot", "potato", "onion", "tomato", "cucumber",
        "broccoli", "cauliflower", "cabbage", "bell pepper", "eggplant",
        "zucchini", "pumpkin", "peas", "beans", "corn", "garlic", "ginger"
    ]
    
    non_vegetables_or_persons = [
        "person", "cat", "dog", "chair", "table", "car", "book", "phone",
        "apple", "banana", "orange", "grape", "mango", # Fruits are not vegetables for this purpose
        "water bottle", "cup", "laptop"
    ]

    item_name_lower = item_name.lower()

    if item_name_lower in vegetables:
        return {
            "status": "success",
            "category": "vegetable",
            "identified_item": item_name
        }
    elif item_name_lower in non_vegetables_or_persons:
        return {
            "status": "error",
            "message": f"'{item_name}' is not a vegetable. Please scan a vegetable.",
            "category": "non-vegetable"
        }
    else:
        # For anything else not explicitly listed, assume it's not a vegetable
        return {
            "status": "error",
            "message": f"Could not identify '{item_name}' as a vegetable. Please scan a vegetable.",
            "category": "unknown"
        }

if __name__ == "__main__":
    # Example usage (simulating input from an API call)
    # In a real scenario, image data would be passed and processed.
    
    # Test cases
    print("Scanning 'Spinach':")
    result_spinach = identify_object("Spinach")
    print(json.dumps(result_spinach, indent=2))

    print("\nScanning 'Person':")
    result_person = identify_object("Person")
    print(json.dumps(result_person, indent=2))

    print("\nScanning 'Apple':")
    result_apple = identify_object("Apple")
    print(json.dumps(result_apple, indent=2))

    print("\nScanning 'Chair':")
    result_chair = identify_object("Chair")
    print(json.dumps(result_chair, indent=2))

    print("\nScanning 'Potato':")
    result_potato = identify_object("Potato")
    print(json.dumps(result_potato, indent=2))
