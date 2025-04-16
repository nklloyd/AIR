// cd C:\Users\nicho\.vscode\AIR
// npm run dev

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

export function Home() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [flightCount, setFlightCount] = useState('');
    const [mlg, setMlg] = useState('');
    const [aroundEarth, setAroundEarth] = useState('');

    const [nextFlightNumber, setNextFlightNumber] = useState('');
    const [nextFlightDate, setNextFlightDate] = useState('');
    const [nextFlightOrig, setNextFlightOrig] = useState('');
    const [nextFlightDest, setNextFlightDest] = useState('');
    const [nextFlightDprtTime, setNextFlightDprtTime] = useState('');
    const [nextFlightArrTime, setNextFlightArrTime] = useState('');
    const [nextFlightAircraft, setNextFlightAircraft] = useState('');
    const [nextFlightAirline, setNextFlightAirline] = useState('');
    const [nextFlightMlg, setNextFlightMlg] = useState('');

    const [nextAircraftName, setNextAircraftName] = useState('');
    const [nextAircraftManufacturer, setNextAircraftManufacturer] = useState('');
    const [nextAircraftMtow, setNextAircraftMtow] = useState('');
    const [nextAircraftEngines, setNextAircraftEngines] = useState('');
    const [nextAircraftEngineThrust, setNextAircraftEngineThrust] = useState('');
    const [nextAircraftWingspan, setNextAircraftWingspan] = useState('');
    const [nextAircraftRange, setNextAircraftRange] = useState('');
    const [nextAircraftSpeed, setNextAircraftSpeed] = useState('');
    const [nextAircraftSeats, setNextAircraftSeats] = useState('');
    const [nextAircraftFunFact, setNextAircraftFunFact] = useState('');

    const [topAircraftName, setTopAircraftName] = useState('');
    const [topAircraftManufacturer, setTopAircraftManufacturer] = useState('');
    const [topAircraftMtow, setTopAircraftMtow] = useState('');
    const [topAircraftEngines, setTopAircraftEngines] = useState('');
    const [topAircraftEngineThrust, setTopAircraftEngineThrust] = useState('');
    const [topAircraftWingspan, setTopAircraftWingspan] = useState('');
    const [topAircraftRange, setTopAircraftRange] = useState('');
    const [topAircraftSpeed, setTopAircraftSpeed] = useState('');
    const [topAircraftSeats, setTopAircraftSeats] = useState('');
    const [topAircraftFunFact, setTopAircraftFunFact] = useState('');

    useEffect(() => {

        const getUsername = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_username');
            if (response.ok) {
                const data = await response.json();
                setUsername(data.message);
            } else { alert('Error') }
        };
        getUsername();

        const getFlightCount = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_flight_count');
            if (response.ok) {
                const data = await response.json();
                setFlightCount(data.message);
            } else { alert('Error') }
        };
        getFlightCount();

        const getMlg = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_mlg');
            if (response.ok) {
                const data = await response.json();
                setMlg(data.message);
            } else { alert('Error') }
        };
        getMlg();

        const getAroundEarth = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_around_earth');
            if (response.ok) {
                const data = await response.json();
                setAroundEarth(data.message);
            } else { alert('Error') }
        };
        getAroundEarth();

        const getNextFlightNumber = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_flight_number');
            if (response.ok) {
                const data = await response.json();
                setNextFlightNumber(data.message);
            } else { alert('Error') }
        };
        getNextFlightNumber();

        const getNextFlightDate = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_flight_date');
            if (response.ok) {
                const data = await response.json();
                setNextFlightDate(data.message);
            } else { alert('Error') }
        };
        getNextFlightDate();

        const getNextFlightOrig = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_flight_orig');
            if (response.ok) {
                const data = await response.json();
                setNextFlightOrig(data.message);
            } else { alert('Error') }
        };
        getNextFlightOrig();

        const getNextFlightDest = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_flight_dest');
            if (response.ok) {
                const data = await response.json();
                setNextFlightDest(data.message);
            } else { alert('Error') }
        };
        getNextFlightDest();

        const getNextFlightDprtTime = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_flight_dprt_time');
            if (response.ok) {
                const data = await response.json();
                setNextFlightDprtTime(data.message);
            } else { alert('Error') }
        };
        getNextFlightDprtTime();

        const getNextFlightArrTime = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_flight_arr_time');
            if (response.ok) {
                const data = await response.json();
                setNextFlightArrTime(data.message);
            } else { alert('Error') }
        };
        getNextFlightArrTime();

        const getNextFlightAircraft = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_flight_aircraft');
            if (response.ok) {
                const data = await response.json();
                setNextFlightAircraft(data.message);
            } else { alert('Error') }
        };
        getNextFlightAircraft();

        const getNextFlightAirline = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_flight_airline');
            if (response.ok) {
                const data = await response.json();
                setNextFlightAirline(data.message);
            } else { alert('Error') }
        };
        getNextFlightAirline();

        const getNextFlightMlg = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_flight_mlg');
            if (response.ok) {
                const data = await response.json();
                setNextFlightMlg(data.message);
            } else { alert('Error') }
        };
        getNextFlightMlg();

        const getNextAircraftName = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_aircraft_name');
            if (response.ok) {
                const data = await response.json();
                setNextAircraftName(data.message);
            } else { alert('Error') }
        };
        getNextAircraftName();

        const getNextAircraftManufacturer = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_aircraft_manufacturer');
            if (response.ok) {
                const data = await response.json();
                setNextAircraftManufacturer(data.message);
            } else { alert('Error') }
        };
        getNextAircraftManufacturer();

        const getNextAircraftMtow = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_aircraft_mtow');
            if (response.ok) {
                const data = await response.json();
                setNextAircraftMtow(data.message);
            } else { alert('Error') }
        };
        getNextAircraftMtow();

        const getNextAircraftEngines = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_aircraft_engines');
            if (response.ok) {
                const data = await response.json();
                setNextAircraftEngines(data.message);
            } else { alert('Error') }
        };
        getNextAircraftEngines();

        const getNextAircraftEngineThrust = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_aircraft_engine_thrust');
            if (response.ok) {
                const data = await response.json();
                setNextAircraftEngineThrust(data.message);
            } else { alert('Error') }
        };
        getNextAircraftEngineThrust();

        const getNextAircraftWingspan = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_aircraft_wingspan');
            if (response.ok) {
                const data = await response.json();
                setNextAircraftWingspan(data.message);
            } else { alert('Error') }
        };
        getNextAircraftWingspan();

        const getNextAircraftRange = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_aircraft_range');
            if (response.ok) {
                const data = await response.json();
                setNextAircraftRange(data.message);
            } else { alert('Error') }
        };
        getNextAircraftRange();

        const getNextAircraftSpeed = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_aircraft_speed');
            if (response.ok) {
                const data = await response.json();
                setNextAircraftSpeed(data.message);
            } else { alert('Error') }
        };
        getNextAircraftSpeed();

        const getNextAircraftSeats = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_aircraft_seats');
            if (response.ok) {
                const data = await response.json();
                setNextAircraftSeats(data.message);
            } else { alert('Error') }
        };
        getNextAircraftSeats();

        const getNextAircraftFunFact = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_next_aircraft_fun_fact');
            if (response.ok) {
                const data = await response.json();
                setNextAircraftFunFact(data.message);
            } else { alert('Error') }
        };
        getNextAircraftFunFact();

        const getTopAircraftName = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_top_aircraft_name');
            if (response.ok) {
                const data = await response.json();
                setTopAircraftName(data.message);
            } else { alert('Error') }
        };
        getTopAircraftName();

        const getTopAircraftManufacturer = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_top_aircraft_manufacturer');
            if (response.ok) {
                const data = await response.json();
                setTopAircraftManufacturer(data.message);
            } else { alert('Error') }
        };
        getTopAircraftManufacturer();

        const getTopAircraftMtow = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_top_aircraft_mtow');
            if (response.ok) {
                const data = await response.json();
                setTopAircraftMtow(data.message);
            } else { alert('Error') }
        };
        getTopAircraftMtow();

        const getTopAircraftEngines = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_top_aircraft_engines');
            if (response.ok) {
                const data = await response.json();
                setTopAircraftEngines(data.message);
            } else { alert('Error') }
        };
        getTopAircraftEngines();

        const getTopAircraftEngineThrust = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_top_aircraft_engine_thrust');
            if (response.ok) {
                const data = await response.json();
                setTopAircraftEngineThrust(data.message);
            } else { alert('Error') }
        };
        getTopAircraftEngineThrust();

        const getTopAircraftWingspan = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_top_aircraft_wingspan');
            if (response.ok) {
                const data = await response.json();
                setTopAircraftWingspan(data.message);
            } else { alert('Error') }
        };
        getTopAircraftWingspan();

        const getTopAircraftRange = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_top_aircraft_range');
            if (response.ok) {
                const data = await response.json();
                setTopAircraftRange(data.message);
            } else { alert('Error') }
        };
        getTopAircraftRange();

        const getTopAircraftSpeed = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_top_aircraft_speed');
            if (response.ok) {
                const data = await response.json();
                setTopAircraftSpeed(data.message);
            } else { alert('Error') }
        };
        getTopAircraftSpeed();

        const getTopAircraftSeats = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_top_aircraft_seats');
            if (response.ok) {
                const data = await response.json();
                setTopAircraftSeats(data.message);
            } else { alert('Error') }
        };
        getTopAircraftSeats();

        const getTopAircraftFunFact = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_top_aircraft_fun_fact');
            if (response.ok) {
                const data = await response.json();
                setTopAircraftFunFact(data.message);
            } else { alert('Error') }
        };
        getTopAircraftFunFact();
    }, [])
    var favorite = localStorage.getItem("favorites");
    localStorage.setItem("favorite", JSON.parse(JSON.stringify(favorite)));
    let fav1
    if (favorite?.[6]) {
        fav1 = "" + favorite?.[2] + favorite?.[3] + favorite?.[4] + favorite?.[5] + favorite?.[6]
    } else { fav1 = "Add favorites in explore" }

    let fav2
    if (favorite?.[14]) {
        fav2 = "" + favorite?.[10] + favorite?.[11] + favorite?.[12] + favorite?.[13] + favorite?.[14]
    } else { fav2 = "Add favorites in explore" }

    let fav3
    if (favorite?.[22]) {
        fav3 = "" + favorite?.[18] + favorite?.[19] + favorite?.[20] + favorite?.[21] + favorite?.[22]
    } else { fav3 = "Add favorites in explore" }

    let fav4
    if (favorite?.[30]) {
        fav4 = "" + favorite?.[26] + favorite?.[27] + favorite?.[28] + favorite?.[29] + favorite?.[30]
    } else { fav4 = "Add favorites in explore" }

    let fav5
    if (favorite?.[38]) {
        fav5 = "" + favorite?.[34] + favorite?.[35] + favorite?.[36] + favorite?.[37] + favorite?.[38]
    } else { fav5 = "Add favorites in explore" }

    return (
        <div className="flex flex-col gap-4">
            <br></br>
            <p className="text-5xl text-slate-700">Welcome, {username}</p>
            <br></br>

            <p className="text-2xl">Your favorite flights:</p>
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-1">
                <button onClick={() => {navigate(`/map/${fav1}`); }} className="bg-sky-700 hover:bg-sky-800 leading-[5rem] text-3xl text-white">
                <p></p>
                <p className="leading-normal">{fav1}</p>
                </button>
                <button onClick={() => {navigate(`/map/${fav2}`); }} className="bg-sky-700 hover:bg-sky-800 leading-[5rem] text-3xl text-white">
                <p></p>
                <p className="leading-normal">{fav2}</p>
                </button>
                <button onClick={() => {navigate(`/map/${fav3}`); }} className="bg-sky-700 hover:bg-sky-800 leading-[5rem] text-3xl text-white">
                <p></p>
                <p className="leading-normal">{fav3}</p>
                </button>
                <button onClick={() => {navigate(`/map/${fav4}`); }} className="bg-sky-700 hover:bg-sky-800 leading-[5rem] text-3xl text-white">
                <p></p>
                <p className="leading-normal">{fav4}</p>
                </button>
                <button onClick={() => {navigate(`/map/${fav5}`); }} className="bg-sky-700 hover:bg-sky-800 leading-[5rem] text-3xl text-white">
                <p></p>
                <p className="leading-normal">{fav5}</p>
                </button>
            </div>
            <br></br>

            <p className="text-2xl">Your next flight is {nextFlightNumber} on {nextFlightDate}</p>
            <div className="grid grid-cols-[3fr_1fr_3fr] gap-0">
                <div className="bg-slate-400 leading-[5rem] text-4xl">{nextFlightOrig}</div>
                <div className="bg-slate-400 leading-[4.5rem] text-6xl text-sky-700">→</div>
                <div className="bg-slate-400 leading-[5rem] text-4xl">{nextFlightDest}</div>
                <div className="bg-gray-300 leading-[2rem] text-1xl">{nextFlightDprtTime}</div>
                <div className="bg-gray-300 leading-[2rem] text-1xl"></div>
                <div className="bg-gray-300 leading-[2rem] text-1xl">{nextFlightArrTime}</div>
            </div>
            <br></br>

            <p className="text-2xl">You'll be flying on an {nextAircraftManufacturer} {nextAircraftName}</p>
            <div className="relative grid grid-cols-[2fr_0.1fr_2fr_0.1fr_2fr] grid-rows-[1fr_2fr]">
                <div className="bg-slate-400 leading-[1.85rem] text-1xl">Seats</div>
                <div></div>
                <div className="bg-slate-400 leading-[1.85rem] text-1xl">Range</div>
                <div></div>
                <div className="bg-slate-400 leading-[1.85rem] text-1xl">Speed</div>
                <div className="bg-gray-300 leading-[3.5rem] text-2xl">{nextAircraftSeats}</div>
                <div></div>
                <div className="bg-gray-300 leading-[3.5rem] text-2xl">{nextAircraftRange} Miles</div>
                <div></div>
                <div className="bg-gray-300 leading-[3.5rem] text-2xl">{nextAircraftSpeed} MPH</div>
            </div>
            <br></br>

            <p className="text-2xl">{nextAircraftManufacturer} {nextAircraftName}: Technical Specs</p>
            <div className="relative grid grid-cols-[3fr_3fr] grid-rows-[3fr_1fr_3fr_1fr_3fr_1fr_3fr_1fr]">
                <div className="bg-slate-400 leading-[3rem] text-1xl">Maximum Takeoff Weight</div>
                <div className="bg-gray-300 leading-[3rem] text-1xl">{nextAircraftMtow} lbs</div>
                <div></div><div></div>
                <div className="bg-slate-400 leading-[3rem] text-1xl">Wingspan</div>
                <div className="bg-gray-300 leading-[3rem] text-1xl">{nextAircraftWingspan} ft</div>
                <div></div><div></div>
                <div className="bg-slate-400 leading-[3rem] text-1xl">Engines</div>
                <div className="bg-gray-300 leading-[3rem] text-1xl">{nextAircraftEngines}</div>
                <div></div><div></div>
                <div className="bg-slate-400 leading-[3rem] text-1xl">Engine Thrust</div>
                <div className="bg-gray-300 leading-[3rem] text-1xl">{nextAircraftEngineThrust} lbs</div>
            </div>
            <div className="pl-4 pr-4 pt-2 pb-2 bg-gray-300">
                <p className="leading-loose text-slate-500 font-bold">Did you know?</p>
                <p className="text-1xl leading-normal">{nextAircraftFunFact}</p>
            </div>
            <br></br>
            <br></br>

            <p className="text-2xl">Your Stats:</p>
            <div className="relative grid grid-cols-[2fr_0.1fr_2fr_0.1fr_2fr] grid-rows-[1fr_2fr]">
                <div className="bg-indigo-950 leading-[1.85rem] text-1xl text-white">Miles Flown</div>
                <div></div>
                <div className="bg-indigo-950 leading-[1.85rem] text-1xl text-white">Total Flights</div>
                <div></div>
                <div className="bg-indigo-950 leading-[1.85rem] text-1xl text-white">Top Airline</div>
                <div className="bg-indigo-800 leading-[3.5rem] text-2xl text-white">{mlg}</div>
                <div></div>
                <div className="bg-indigo-800 leading-[3.5rem] text-2xl text-white">{flightCount}</div>
                <div></div>
                <div className="bg-indigo-800 leading-[3.5rem] text-2xl text-white">Delta</div>
            </div>
            <div className="pl-4 pr-4 pt-2 pb-2 bg-indigo-800">
                <p className="leading-loose text-indigo-300 font-bold">Around the world</p>
                <p className="text-1xl leading-normal text-white">You've flown around the world {aroundEarth} times.</p>
            </div>
            <br></br>
            <br></br>


            <p className="text-2xl">You're top aircraft is the {topAircraftManufacturer} {topAircraftName}</p>
            <div className="relative grid grid-cols-[2fr_0.1fr_2fr_0.1fr_2fr] grid-rows-[1fr_2fr]">
                <div className="bg-rose-950 leading-[1.85rem] text-1xl text-white">Seats</div>
                <div></div>
                <div className="bg-rose-950 leading-[1.85rem] text-1xl text-white">Range</div>
                <div></div>
                <div className="bg-rose-950 leading-[1.85rem] text-1xl text-white">Speed</div>
                <div className="bg-rose-800 leading-[3.5rem] text-2xl text-white">{topAircraftSeats}</div>
                <div></div>
                <div className="bg-rose-800 leading-[3.5rem] text-2xl text-white">{topAircraftRange} Miles</div>
                <div></div>
                <div className="bg-rose-800 leading-[3.5rem] text-2xl text-white">{topAircraftSpeed} MPH</div>
            </div>
            <br></br>

            <p className="text-2xl">{topAircraftManufacturer} {topAircraftName}: Technical Specs</p>
            <div className="relative grid grid-cols-[3fr_3fr] grid-rows-[3fr_1fr_3fr_1fr_3fr_1fr_3fr_1fr]">
                <div className="bg-rose-950 leading-[3rem] text-1xl text-white">Maximum Takeoff Weight</div>
                <div className="bg-rose-800 leading-[3rem] text-1xl text-white">{topAircraftMtow} lbs</div>
                <div></div><div></div>
                <div className="bg-rose-950 leading-[3rem] text-1xl text-white">Wingspan</div>
                <div className="bg-rose-800 leading-[3rem] text-1xl text-white">{topAircraftWingspan} ft</div>
                <div></div><div></div>
                <div className="bg-rose-950 leading-[3rem] text-1xl text-white">Engines</div>
                <div className="bg-rose-800 leading-[3rem] text-1xl text-white">{topAircraftEngines}</div>
                <div></div><div></div>
                <div className="bg-rose-950 leading-[3rem] text-1xl text-white">Engine Thrust</div>
                <div className="bg-rose-800 leading-[3rem] text-1xl text-white">{topAircraftEngineThrust} lbs</div>
            </div>
            <div className="pl-4 pr-4 pt-2 pb-2 bg-rose-800">
                <p className="leading-loose text-rose-300 font-bold">Did you know?</p>
                <p className="text-1xl text-white leading-normal">{topAircraftFunFact}</p>
            </div>
        </div>
    )
}