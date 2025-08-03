from flask import Flask, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow frontend requests

@app.route("/resume")
def serve_resume():
    return send_from_directory("static", "Rudrashya_Resume.pdf")

if __name__ == "__main__":
    app.run(debug=True)
