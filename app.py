import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

pipe = pickle.load(open('pipe.pkl', 'rb'))
df = pickle.load(open('df.pkl', 'rb'))

@app.route("/", methods=['POST'])
def predict():
    if request.method == "POST":
        data = request.get_json()
        company = data['company']
        cpu = data['cpu']
        gpu = data['gpu']
        hdd = data['hdd']
        ips = data['ips']
        os = data['os']
        ram = data['ram']
        resolution = data['resolution']
        screen_size = data['screen_size']
        ssd = data['ssd']
        touchscreen = data['touchscreen']
        type = data['type']
        weight = data['weight']
        x_res, y_res = map(int, resolution.split('x'))
        ppi = (x_res**2 + y_res**2)**0.5 / float(screen_size)
        query = np.array([company, type, ram, weight, touchscreen, ips, ppi, cpu, hdd, ssd, gpu, os], dtype=object)
        query = query.reshape(1, 12)
        predicted_price = np.exp(pipe.predict(query))[0]
        return {"price": predicted_price}

if __name__ == '__main__':
    app.run(debug=True)
