import sys
import json
import pickle
import numpy as np
from sklearn.preprocessing import LabelEncoder

MODEL_FILE = "event_recommendation_model.pkl"

with open(MODEL_FILE, "rb") as file:
    model, label_encoder_address, label_encoder_city, label_encoder_event = pickle.load(file)

venues = json.loads(sys.argv[1])

def preprocess_data(venues):
    addresses = [v["address"] for v in venues]
    cities = [v["city"] for v in venues]
    event_types = [v["event_type"] for v in venues]
    
    venue_encoded = label_encoder_address.transform(addresses)
    city_encoded = label_encoder_city.transform(cities)
    event_encoded = label_encoder_event.transform(event_types)

    X = np.array([
        [v["rating"], v["reviews"], np.random.randint(50, 500), venue_encoded[i], city_encoded[i], event_encoded[i]]
        for i, v in enumerate(venues)
    ])
    return X, venues

X, venues = preprocess_data(venues)
predictions = model.predict(X)

best_index = np.argmax(predictions)
best_venue = venues[best_index]
best_venue["predicted_popularity"] = predictions[best_index]

print(json.dumps(best_venue))
