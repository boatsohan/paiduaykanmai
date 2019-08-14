from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
app = Flask(__name__)
# Enable CORS
CORS(app)


@app.route("/id", methods=["POST"])
def id():
    result = 0
    if request.method == "POST":
        input_value = request.form["id"]
        conn = sqlite3.connect('user.db')
        cursor = conn.execute("SELECT * from users where id="+input_value)
        result = cursor.fetchall()
        conn.close()
    return jsonify(
        result
    ), 200


@app.route("/fname", methods=["POST"])
def fname():
    result = 0
    if request.method == "POST":
        input_value = request.form["fname"]
        conn = sqlite3.connect('user.db')
        cursor = conn.execute(
            "SELECT * from users where first_name LIKE '"+input_value+"'")
        result = cursor.fetchall()
        conn.close()
    return jsonify(
        data=result
    ), 200


@app.route("/lname", methods=["POST"])
def lname():
    result = 0
    if request.method == "POST":
        input_value = request.form["lname"]
        conn = sqlite3.connect('user.db')
        cursor = conn.execute(
            "SELECT * from users where last_name LIKE '"+input_value+"'")
        result = cursor.fetchall()
        conn.close()
    return jsonify(
        data=result
    ), 200


@app.route("/email", methods=["POST"])
def email():
    result = 0
    if request.method == "POST":
        input_value = request.form["email"]
        conn = sqlite3.connect('user.db')
        cursor = conn.execute(
            "SELECT * from users where email = '"+input_value+"'")
        result = cursor.fetchall()
        conn.close()
    return jsonify(
        data=result
    ), 200


@app.route("/gender", methods=["POST"])
def gender():
    result = 0
    if request.method == "POST":
        input_value = request.form["gender"]
        conn = sqlite3.connect('user.db')
        cursor = conn.execute(
            "SELECT * from users where gender = '"+input_value+"'")
        result = cursor.fetchall()
        conn.close()
    return jsonify(
        data=result
    ), 200


@app.route("/user", methods=["POST", "DELETE", "PUT", "GET"])
def user():
    result = 0
    if request.method == "POST":
        conn = sqlite3.connect('user.db')
        cursor = conn.execute(
            "SELECT id FROM 'users' ORDER BY id DESC LIMIT 0,1")
        ID = cursor.fetchone()
        first_name = request.form["fname"]
        last_name = request.form["lname"]
        email = request.form["email"]
        gender = request.form["gender"]
        age = str(request.form["age"])
        ids = str(ID[0]+1)
        cursor = conn.execute("INSERT INTO users (id,first_name,last_name,email,gender,age)\
     		VALUES ("+ids+", '"+first_name+"', '"+last_name+"', '"+email+"', '"+gender+"',"+age+")")
        conn.commit()
        conn.close()
        conn = sqlite3.connect('user.db')
        cursor = conn.execute("SELECT * from users")
        result = cursor.fetchall()
        conn.close()
    elif request.method == "DELETE":
        conn = sqlite3.connect('user.db')
        ID = request.form["id"]
        conn.execute("DELETE from users where id = "+ID+"")
        conn.commit()
        conn.close()
        conn = sqlite3.connect('user.db')
        cursor = conn.execute("SELECT * from users")
        result = cursor.fetchall()
        conn.close()
    elif request.method == "PUT":
        first_name = request.form["fname"]
        last_name = request.form["lname"]
        email = request.form["email"]
        gender = request.form["gender"]
        age = str(request.form["age"])
        ids = str(request.form["id"])
        conn = sqlite3.connect('user.db')
        conn.execute("UPDATE users set first_name = '"+first_name+"',last_name='"+last_name+"',\
			email='"+email+"',gender='"+gender+"',age="+age+" where ID = "+ids)
        conn.commit()
        conn.close()
        conn = sqlite3.connect('user.db')
        cursor = conn.execute("SELECT * from users")
        result = cursor.fetchall()
        conn.close()
    elif request.method == "GET":
        conn = sqlite3.connect('user.db')
        cursor = conn.execute("SELECT * from users")
        result = cursor.fetchall()
        conn.close()
    return jsonify(
        result
    ), 201
