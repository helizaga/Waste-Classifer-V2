from flask import Flask, request, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json
import tensorflow as tf
from flask import send_from_directory


# app = Flask(__name__)
app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
app.secret_key = "secret key"

# Allow
cors = CORS(app)

# Allowed file extransions
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])


@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, "index.html")


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            return "No file part"
        file = request.files['file']

        if file and allowed_file(file.filename):
            image_data = file.read()
            predicted_image_class = predict_img(image_data)
            print("predicted_image_class", predicted_image_class)

        return json.dumps(predicted_image_class)


def predict_img(image_data):

    print("These are the folders and files in the current directory:", os.listdir())

    label_lines = [line.rstrip() for line in tf.io.gfile.GFile(
        "backend/tf_files/retrained_labels.txt")]
    with tf.io.gfile.GFile("backend/tf_files/retrained_graph.pb", 'rb') as f:
        graph_def = tf.compat.v1.GraphDef()
        graph_def.ParseFromString(f.read())
        _ = tf.import_graph_def(graph_def, name='')

    with tf.compat.v1.Session() as sess:
        softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')
        predictions = sess.run(
            softmax_tensor, {'DecodeJpeg/contents:0': image_data})
        top_k = predictions[0].argsort()[-len(predictions[0]):][::-1]
        for node_id in top_k:
            human_string = label_lines[node_id]
            score = predictions[0][node_id]
            print('%s (Prob: %.2f)' % (human_string, score))
            return human_string


if __name__ == "__main__":
    app.run(debug=True)
