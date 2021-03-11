from flask import Flask, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json
import tensorflow.compat.v1 as tf

from PIL import Image

import requests

app = Flask(__name__)

# Allow 
CORS(app)

# Path for uploaded images
UPLOAD_FOLDER = ''

# Allowed file extransions
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def hello():
	return "Hello World!"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
	if request.method == 'POST':
		print("request data", request.data)
		print("request files", request.files)

		# check if the post request has the file part
		if 'file' not in request.files:
			return "No file part"
		file = request.files['file']

		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			
			# Send uploaded image for prediction
			predicted_image_class = predict_img(UPLOAD_FOLDER+filename)
			print("predicted_image_class", predicted_image_class)

	return json.dumps(predicted_image_class)

def predict_img(img_path):
	image_data = tf.gfile.GFile(img_path, 'rb').read()
	label_lines = [line.rstrip() for line in tf.gfile.GFile("tf_files/retrained_labels.txt")]
	
	with tf.gfile.GFile("tf_files/retrained_graph.pb", 'rb') as f:
		graph_def = tf.GraphDef()
		graph_def.ParseFromString(f.read())
		_ = tf.import_graph_def(graph_def, name='')
		
	with tf.Session() as sess:
		softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')
		predictions = sess.run(softmax_tensor, {'DecodeJpeg/contents:0': image_data})
		top_k = predictions[0].argsort()[-len(predictions[0]):][::-1]
		for node_id in top_k:
			human_string = label_lines[node_id]
			score = predictions[0][node_id]
			print('%s (Prob: %.2f)' % (human_string, score))
			return human_string


if __name__ == "__main__":
	app.run(debug=True)