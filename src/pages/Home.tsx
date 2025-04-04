// cd C:\Users\nicho\.vscode\AIR
// npm run dev

import { useState, useEffect } from "react";

export function Home() {
    const [username, setUsername] = useState('');
    const [topAircraft, setTopAircraft] = useState('');
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

    useEffect(() => {

        const getUsername = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_username');
            if (response.ok) {
                const data = await response.json();
                setUsername(data.message);
            } else { alert('Error') }
        };
        getUsername();

        const getTopAircraft = async () => {
            const response = await fetch('http://127.0.0.1:5000/get_top_aircraft_name');
            if (response.ok) {
                const data = await response.json();
                setTopAircraft(data.message);
            } else { alert('Error') }
        };
        getTopAircraft();

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

    }, [])

    const change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className="flex flex-col gap-5">
            <br></br>
            <h1>Welcome, {username}!</h1>
            <br></br>
            <p className="text-2xl">Your next flight is {nextFlightNumber} on {nextFlightDate}</p>
            <div className="grid grid-cols-[3fr_1fr_3fr] gap-0">
                <div className="bg-indigo-900 leading-[5rem] text-4xl">{nextFlightOrig}</div>
                <div className="bg-black-900 leading-[4.5rem] text-6xl text-indigo-400">→</div>
                <div className="bg-indigo-900 leading-[5rem] text-4xl">{nextFlightDest}</div>
                <div className="bg-indigo-500 leading-[2rem] text-1xl">{nextFlightDprtTime}</div>
                <div></div>
                <div className="bg-indigo-500 leading-[2rem] text-1xl">{nextFlightArrTime}</div>
            </div>
            <br></br>
            <p className="text-2xl">Your aircraft: {nextAircraftManufacturer} {topAircraft}</p>
            <div className="relative grid grid-cols-[2fr_0.1fr_2fr_0.1fr_2fr] grid-rows-[1fr_2fr]">
                <div className="bg-indigo-900 leading-[1.85rem] text-1xl">Seats</div>
                <div></div>
                <div className="bg-indigo-900 leading-[1.85rem] text-1xl">Range</div>
                <div></div>
                <div className="bg-indigo-900 leading-[1.85rem] text-1xl">Speed</div>
                <div className="bg-indigo-500 leading-[3rem] text-1xl">{nextAircraftSeats}</div>
                <div></div>
                <div className="bg-indigo-500 leading-[3rem] text-1xl">{nextAircraftRange} Miles</div>
                <div></div>
                <div className="bg-indigo-500 leading-[3rem] text-1xl">{nextAircraftSpeed} MPG</div>
            </div>
        </div>
    )
}