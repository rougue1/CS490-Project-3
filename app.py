''' Our server file'''
# disabling some of the errors
# pylint: disable= E1101, C0413, R0903, W0603, W1508


import os
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='./build/static')


@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    '''starting point'''
    return send_from_directory('./build', filename)


app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
