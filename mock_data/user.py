# cd C:\Users\nicho\.vscode\AIR\mock_data
# python user.py

import logging
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.logger.setLevel(logging.DEBUG)

# Define classes
class User:
    def __init__(self, name):
        self.name = name
        self.top_aircraft = ""
        self.flight_count = 0
        self.mlg = 0
        self.next_flight = ""
        self.flights = []

class Airline:
    def __init__(self):
            self.fleet = []

class Aircraft:
     def __init__(self, name, manufacturer, mtow, engines, engine_thrust, wingspan, range, speed, seats, fun_fact):
          self.name = name
          self.manufacturer = manufacturer
          self.mtow = mtow #lbs
          self.engines = engines
          self.engine_thrust = engine_thrust #lbs
          self.wingspan = wingspan #ft
          self.range = range #miles
          self.speed = speed #mph
          self.seats = seats
          self.fun_fact = fun_fact

class Flight:
     def __init__(self, date, dprt_time, arr_time, number, orig, dest, aircraft, airline, mlg):
          self.date = date
          self.dprt_time = dprt_time
          self.arr_time = arr_time
          self.number = number
          self.orig = orig
          self.dest = dest
          self.aircraft = aircraft
          self.airline = airline
          self.mlg = mlg

# Define aircraft
A359 = Aircraft(
     name = "A350-900",
     manufacturer = "Airbus",
     mtow = 617000, #lbs
     engines = "Rolls Royce Trent XWB-84",
     engine_thrust = 84000, #lbs
     wingspan = 212, #ft
     range = 9320, #miles
     speed = 561, #mph
     seats = 306,
     fun_fact = "The Airbus A350 is pressurized to 6000 feet, less than the standard 8000 ft in most airaft, enhancing comfort."
)

# Define airlines
Delta = Airline()
Delta.fleet.append(A359)

# Define Flights
DL108ATLMAD20250414 = Flight("Monday, April 14, 2025", "7:20 PM", "9:35 AM +", "DL108", "ATL", "MAD", A359, Delta, 4598)

# Set user data
Nicholas = User("Nicholas")
Nicholas.top_aircraft = A359
Nicholas.next_flight = DL108ATLMAD20250414

# API Functions
@app.route('/get_username')
def get_username():
     return(jsonify({"message": Nicholas.name}))

@app.route('/get_top_aircraft_name')
def get_top_aircraft_name():
     return(jsonify({"message": Nicholas.top_aircraft.name}))

@app.route('/get_next_flight_date')
def get_next_flight_date():
     return(jsonify({"message": Nicholas.next_flight.date}))

@app.route('/get_next_flight_dprt_time')
def get_next_flight_dprt_time():
     return(jsonify({"message": Nicholas.next_flight.dprt_time}))

@app.route('/get_next_flight_arr_time')
def get_next_flight_arr_time():
     return(jsonify({"message": Nicholas.next_flight.arr_time}))

@app.route('/get_next_flight_number')
def get_next_flight_number():
     return(jsonify({"message": Nicholas.next_flight.number}))

@app.route('/get_next_flight_orig')
def get_next_flight_orig():
     return(jsonify({"message": Nicholas.next_flight.orig}))

@app.route('/get_next_flight_dest')
def get_next_flight_dest():
     return(jsonify({"message": Nicholas.next_flight.dest}))

@app.route('/get_next_flight_aircraft')
def get_next_flight_aircraft():
     return(jsonify({"message": Nicholas.next_flight.aircraft}))

@app.route('/get_next_flight_airline')
def get_next_flight_airline():
     return(jsonify({"message": Nicholas.next_flight.airline}))

@app.route('/get_next_flight_mlg')
def get_next_flight_mlg():
     return(jsonify({"message": Nicholas.next_flight.mlg}))

# Next Aircraft API
@app.route('/get_next_aircraft_name')
def get_next_aircraft_name():
     return(jsonify({"message": Nicholas.next_flight.aircraft.name}))

@app.route('/get_next_aircraft_manufacturer')
def get_next_aircraft_manufacturer():
     return(jsonify({"message": Nicholas.next_flight.aircraft.manufacturer}))

@app.route('/get_next_aircraft_mtow')
def get_next_aircraft_mtow():
     return(jsonify({"message": Nicholas.next_flight.aircraft.mtow}))

@app.route('/get_next_aircraft_engines')
def get_next_aircraft_engines():
     return(jsonify({"message": Nicholas.next_flight.aircraft.engines}))

@app.route('/get_next_aircraft_engine_thrust')
def get_next_aircraft_engine_thrust():
     return(jsonify({"message": Nicholas.next_flight.aircraft.engine_thrust}))

@app.route('/get_next_aircraft_wingspan')
def get_next_aircraft_wingspan():
     return(jsonify({"message": Nicholas.next_flight.aircraft.wingspan}))

@app.route('/get_next_aircraft_range')
def get_next_aircraft_range():
     return(jsonify({"message": Nicholas.next_flight.aircraft.range}))

@app.route('/get_next_aircraft_speed')
def get_next_aircraft_speed():
     return(jsonify({"message": Nicholas.next_flight.aircraft.speed}))

@app.route('/get_next_aircraft_seats')
def get_next_aircraft_seats():
     return(jsonify({"message": Nicholas.next_flight.aircraft.seats}))

@app.route('/get_next_aircraft_fun_fact')
def get_next_aircraft_fun_fact():
     return(jsonify({"message": Nicholas.next_flight.aircraft.fun_fact}))

# Start App
if __name__ == "__main__":
     app.run(debug=True)