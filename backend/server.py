from flask import Flask, jsonify
import cx_Oracle
import os
from dotenv import load_dotenv
import json
from json import dumps
from flask_cors import CORS

load_dotenv()
print(os.getenv('USER'))
cx_Oracle.init_oracle_client(lib_dir=r"C:\Users\sohil\Documents\GitHub\cis4301project\backend\instantclient_19_10")
connection = cx_Oracle.connect(
user=os.getenv('USER'),
password=os.getenv('PASSWORD'),
dsn=os.getenv('DSN')
)
app = Flask(__name__)
CORS(app)

cur=connection.cursor()
cur.execute("SELECT Avg(PPM), year FROM kbarredo.CO2 GROUP BY Year ORDER BY Year ASC")
res = cur.fetchall()
total = 0
for row in res:
    print(row)
print(total)
cur.execute("SELECT COUNT(YEAR) FROM EDISONXIE.Weather_Anomalies")
res=cur.fetchall()
print(res)
@app.route('/')
def hello():
    return "Hello World!"
@app.route('/fish')
def fish():
    cur.execute("SELECT year FROM kbarredo.fish_population GROUP BY Year ORDER BY Year ASC")
    res = cur.fetchall()
    return jsonify({"data":res})
@app.route('/co2/coral_bleaching')
def co2():
    #    With average_coral(average, year) As
    #    (SELECT AVG(Location) as average, year FROM kbarredo.coral_bleaching WHERE YEAR!=2017 GROUP BY Year ORDER BY Year ASC)
    cur.execute("""
    SELECT ppm, locs, year FROM
    (SELECT Avg(PPM) as ppm, year FROM kbarredo.CO2 GROUP BY Year)
    Natural JOIN (SELECT COUNT(Location) as locs, year FROM kbarredo.coral_bleaching GROUP BY Year)
     WHERE year!=2017 and year>=2002 ORDER BY year desc
    """)
    #cur.execute("SELECT Avg(PPM) as ppm, year FROM kbarredo.CO2 GROUP BY Year ORDER BY Year ASC")
    res = cur.fetchall()
    newres = []
    for point in res:
        tempDict = {}
        tempDict['ppm']=point[0]
        tempDict['locs']=point[1]
        tempDict['year']=point[2]
        newres.insert(0,tempDict)
    return jsonify({"data":newres})
@app.route('/coral_bleaching')
def coral_bleaching():
    cur.execute("SELECT AVG(Location), year FROM kbarredo.coral_bleaching WHERE YEAR!=2017 GROUP BY Year ORDER BY Year ASC")
    res = cur.fetchall()
    return jsonify({"data":res})
@app.route('/temperature')
def temperature():
    cur.execute("SELECT AVG(average_temp), year FROM kbarredo.temperature GROUP BY Year ORDER BY Year ASC")
    res = cur.fetchall()
    return jsonify({"data":res})



if __name__ == '__main__':
    app.run()
