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
cur.execute("SELECT COUNT(id) as amount, year FROM edisonxie.weather_anomalies2 Group By year Order by year Desc")
res=cur.fetchall()
print(res)
@app.route('/')
def hello():
    return "Hello World!"
@app.route('/co2/weather_anomalies2')
def weatherco2():
    cur.execute("""
    SELECT ppm, amount, year FROM
    (SELECT Avg(PPM) as ppm, year FROM kbarredo.CO2 GROUP BY Year)
    Natural JOIN (SELECT COUNT(id) as amount, year FROM edisonxie.weather_anomalies2 GROUP BY Year)
     ORDER BY year desc
    """)
    res = cur.fetchall()
    newres = []
    for point in res:
        tempDict = {}
        tempDict['CO2 PPM']=point[0]
        tempDict['Amount of Weather Anomalies']=point[1]
        tempDict['year']=point[2]
        newres.insert(0,tempDict)
    return jsonify({"data":newres})
@app.route('/co2/coral_bleaching')
def co2coral():
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
        tempDict['CO2 PPM']=point[0]
        tempDict['New Bleaching Instances']=point[1]
        tempDict['year']=point[2]
        newres.insert(0,tempDict)
    return jsonify({"data":newres})


@app.route('/coral_bleaching/weather_anomalies2')
def coral_bleaching_weather():
    cur.execute("""
    SELECT locs, amount, year FROM
    (SELECT COUNT(Location) as locs, year FROM kbarredo.coral_bleaching GROUP BY Year)
    Natural JOIN (SELECT COUNT(id) as amount, year FROM edisonxie.weather_anomalies2 GROUP BY Year)
     ORDER BY year desc
    """)
    res = cur.fetchall()
    newres = []
    for point in res:
        tempDict = {}
        tempDict['New Bleaching Instances']=point[0]
        tempDict['Amount of Weather Anomalies']=point[1]
        tempDict['year']=point[2]
        newres.insert(0,tempDict)
    return jsonify({"data":newres})
@app.route('/co2/temperature')
def co2_temperature():
    cur.execute("""
    SELECT ppm, average_temp, year FROM
    (SELECT Avg(PPM) as ppm, year FROM kbarredo.CO2 GROUP BY Year)
    Natural JOIN (SELECT AVG(TEMP) as average_temp, year FROM edisonxie.global_temperatures GROUP BY Year)
     ORDER BY year desc
    """)
    res = cur.fetchall()
    newres = []
    for point in res:
        tempDict = {}
        tempDict['CO2 PPM']=point[0]
        tempDict['Average Temperature (F)']=point[1]
        tempDict['Year']=point[2]
        newres.insert(0,tempDict)
    return jsonify({"data":newres})
@app.route('/coral_bleaching/temperature')
def coral_temperature():
    cur.execute("""
    SELECT loc, average_temp, year FROM
    (SELECT count(Location) as loc, year FROM kbarredo.coral_bleaching WHERE YEAR!=2017 GROUP BY Year)
    Natural JOIN (SELECT AVG(TEMP) as average_temp, year FROM edisonxie.global_temperatures GROUP BY Year)
     ORDER BY year desc
    """)
    res = cur.fetchall()
    newres = []
    for point in res:
        tempDict = {}
        tempDict['New Bleaching Instances']=point[0]
        tempDict['Average Temperature (F)']=point[1]
        tempDict['Year']=point[2]
        newres.insert(0,tempDict)
    return jsonify({"data":newres})
@app.route('/weather_anomalies2/temperature')
def weather_temperature():
    cur.execute("""
    SELECT amount, average_temp, year FROM
    (SELECT COUNT(id) as amount, year FROM edisonxie.weather_anomalies2 GROUP BY Year)
    Natural JOIN (SELECT AVG(TEMP) as average_temp, year FROM edisonxie.global_temperatures GROUP BY Year)
     ORDER BY year desc
    """)
    res = cur.fetchall()
    newres = []
    for point in res:
        tempDict = {}
        tempDict['Amount of Weather Anomalies']=point[0]
        tempDict['Average Temperature (F)']=point[1]
        tempDict['Year']=point[2]
        newres.insert(0,tempDict)
    return jsonify({"data":newres})




@app.route('/fish')
def coral_bleaching():
    cur.execute("SELECT count(species), year FROM kbarredo.fish_population GROUP BY Year ORDER BY Year ASC")
    res = cur.fetchall()
    return jsonify({"data":res})
@app.route('/temperature')
def temperature():
    cur.execute("SELECT AVG(average_temp), year FROM kbarredo.temperature GROUP BY Year ORDER BY Year ASC")
    res = cur.fetchall()
    return jsonify({"data":res})



if __name__ == '__main__':
    app.run()
