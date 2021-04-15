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
    Natural JOIN (Select Sum(count(location)) Over (Order By Year) as locs, year from kbarredo.coral_bleaching group by year order by year desc)
      ORDER BY year desc
    """)
    #cur.execute("SELECT Avg(PPM) as ppm, year FROM kbarredo.CO2 GROUP BY Year ORDER BY Year ASC")
    res = cur.fetchall()
    newres = []
    for point in res:
        tempDict = {}
        tempDict['CO2 PPM']=point[0]
        tempDict['Total Bleaching Instances']=point[1]
        tempDict['year']=point[2]
        newres.insert(0,tempDict)
    return jsonify({"data":newres})


@app.route('/coral_bleaching/weather_anomalies2')
def coral_bleaching_weather():
    cur.execute("""
    SELECT locs, amount, year FROM
    (Select Sum(count(location)) Over (Order By Year) as locs, year from kbarredo.coral_bleaching group by year order by year desc)
    Natural JOIN (SELECT COUNT(id) as amount, year FROM edisonxie.weather_anomalies2 GROUP BY Year)
     ORDER BY year desc
    """)
    res = cur.fetchall()
    newres = []
    for point in res:
        tempDict = {}
        tempDict['Total Bleaching Instances']=point[0]
        tempDict['Amount of Weather Anomalies']=point[1]
        tempDict['year']=point[2]
        newres.insert(0,tempDict)
    return jsonify({"data":newres})
@app.route('/co2/temperature')
def co2_temperature():
    cur.execute("""
    SELECT ppm, average_temp, year FROM
    (SELECT Avg(PPM) as ppm, year FROM kbarredo.CO2 GROUP BY Year)
    Natural JOIN (Select Round(AVG(monthly_temperature),2) as average_temp, year FROM
(Select AVG(temp) as monthly_temperature ,month, year from edisonxie.global_temperatures group by month,year order by year desc)
Group by year ORDER BY year desc)
     ORDER BY year desc
    """)
    res = cur.fetchall()
    newres = []
    for point in res:
        tempDict = {}
        tempDict['CO2 PPM']=point[0]
        tempDict['Average Temperature (F)']=point[1]
        tempDict['year']=point[2]
        newres.insert(0,tempDict)
    return jsonify({"data":newres})
@app.route('/coral_bleaching/temperature')
def coral_temperature():
    cur.execute("""
    SELECT locs, average_temp, year FROM
    (Select Sum(count(location)) Over (Order By Year) as locs, year from kbarredo.coral_bleaching group by year order by year desc)
    Natural JOIN (Select Round(AVG(monthly_temperature),2) as average_temp, year FROM
(Select AVG(temp) as monthly_temperature ,month, year from edisonxie.global_temperatures group by month,year order by year desc)
Group by year ORDER BY year desc)
     ORDER BY year desc
    """)
    res = cur.fetchall()
    newres = []
    for point in res:
        tempDict = {}
        tempDict['Total Bleaching Instances']=point[0]
        tempDict['Average Temperature (F)']=point[1]
        tempDict['year']=point[2]
        newres.insert(0,tempDict)
    return jsonify({"data":newres})
@app.route('/weather_anomalies2/temperature')
def weather_temperature():
    cur.execute("""
    SELECT amount, average_temp, year FROM
    (SELECT COUNT(id) as amount, year FROM edisonxie.weather_anomalies2 GROUP BY Year)
    Natural JOIN (Select Round(AVG(monthly_temperature),2) as average_temp, year FROM
(Select AVG(temp) as monthly_temperature ,month, year from edisonxie.global_temperatures group by month,year order by year desc)
Group by year ORDER BY year desc)
     ORDER BY year desc
    """)
    res = cur.fetchall()
    newres = []
    for point in res:
        tempDict = {}
        tempDict['Amount of Weather Anomalies']=point[0]
        tempDict['Average Temperature (F)']=point[1]
        tempDict['year']=point[2]
        newres.insert(0,tempDict)
    return jsonify({"data":newres})

@app.route('/count')
def temperature():
    cur.execute("""
select Sum("Column")
From ((select Count(*) as "Column" From KBARREDO.CO2)
        union (select Count(*) as "Column" From EDISONXIE.Weather_Anomalies2)
        union (select Count(*) as "Column" From EDISONXIE.Global_Temperatures)
        union (select Count(*) as "Column" From KBARREDO.Coral_Bleaching))
    """)
    res = cur.fetchall()
    return jsonify({"data":res})



if __name__ == '__main__':
    app.run()
