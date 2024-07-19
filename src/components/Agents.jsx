import React, { useState, useEffect } from 'react';

const Agents= () => {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [tripType, setTripType] = useState('');
  const [month, setMonth] = useState('');
  const [logs, setLogs] = useState([]);
  const [crewResult, setCrewResult] = useState('');

  useEffect(() => {
    const fetchLogs = () => {
      fetch('http://localhost:5000/logs')
        .then(response => response.json())
        .then(data => {
          if (data.logs.length > 0) {
            setLogs(prevLogs => [...prevLogs, ...data.logs.map(cleanLog)]);
          }
        })
        .catch(error => console.error('Error fetching logs:', error));
    };

    const interval = setInterval(fetchLogs, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAnalyze = async () => {
    if (parseInt(budget) < 5000) {
      alert('Budget must be at least 5000.');
      return;
    }

    try {
      await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          budget,
          num_people: numPeople,
          trip_type: tripType,
          month,
        }),
      });

      const pollCrewResult = setInterval(() => {
        fetch(`http://localhost:5000/crew_result?category=${category}&budget=${budget}&num_people=${numPeople}&trip_type=${tripType}&month=${month}`)
          .then(response => response.json())
          .then(data => {
            if (data.crew_result !== "Result not available yet.") {
              setCrewResult(data.crew_result);
              clearInterval(pollCrewResult);
            }
          })
          .catch(error => console.error('Error fetching crew result:', error));
      }, 5000);
    } catch (error) {
      console.error('Error analyzing product:', error);
    }
  };

  const cleanLog = log => log.replace(/\x1b\[[0-9;]*m/g, '');

  return (
    <div className="min-h-screen flex">
      <aside className="bg-yellow-400 p-5 w-1/3 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">trip bharat</h1>
        <div className="mb-4">
          <input
            type="text"
            value={tripType}
            onChange={e => setTripType(e.target.value)}
            placeholder="trip type"
            className="border border-gray-300 p-2 rounded-lg w-full mb-4"
          />
          <input
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="category"
            className="border border-gray-300 p-2 rounded-lg w-full mb-4"
          />
          <input
            type="number"
            value={numPeople}
            onChange={e => setNumPeople(e.target.value)}
            placeholder="people"
            className="border border-gray-300 p-2 rounded-lg w-full mb-4"
          />
          <input
            type="number"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            placeholder="budget"
            className="border border-gray-300 p-2 rounded-lg w-full mb-4"
          />
          <input
            type="text"
            value={month}
            onChange={e => setMonth(e.target.value)}
            placeholder="month"
            className="border border-gray-300 p-2 rounded-lg w-full mb-4"
          />
        </div>
        <button
          onClick={handleAnalyze}
          className="bg-white text-black p-2 rounded-lg w-full mb-4"
        >
          RECOMMEND
        </button>
      </aside>
      <main className="bg-white flex-grow p-5">
        <h2 className="text-2xl font-bold mb-4">Agents Making recommendation</h2>
        <div className="mb-4 p-4 bg-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Researching</h3>
          <div className="bg-gray-200 p-4 rounded-lg overflow-y-scroll max-h-96">
            {logs.map((log, index) => (
              <div key={index} className="mb-2">
                <div className="font-bold text-blue-500">Log Entry {index + 1}</div>
                <pre className="text-sm whitespace-pre-wrap bg-gray-100 p-2 rounded-lg">{log}</pre>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-yellow-300 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Final Result</h3>
          <pre className="text-sm whitespace-pre-wrap">{crewResult}</pre>
        </div>
      </main>
    </div>
  );
}

export default Agents;