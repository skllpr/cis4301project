from flask import Flask, jsonify
app = Flask(__name__)


@app.route('/')
def hello():
    return "Hello World!"
@app.route('/fish')
def fish():
    fish = {
        "data": [
        {
            "year": 2000,
            "fish": 10
        },
        {
            "year": 2002,
            "fish": 8
        },
        {
            "year": 2003,
            "fish": 5
        },
        {
            "year": 2004,
            "fish": 4
        },
        {
            "year": 2005,
            "fish":3
        }
        ]
    }


    return jsonify(fish)
@app.route('/co2')
def co2():
    return "smoke!"




if __name__ == '__main__':
    app.run()
