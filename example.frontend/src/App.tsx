import React, { useEffect, useState } from 'react';
import './App.css';
import outputs from './backend-outputs.json'

function App() {

  const [greeting, setGreeting] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setMessage(event.target.value);
  };
  
  useEffect(() => {
    const delayFunction = setTimeout(() => {
      fetch(`${process.env.CI ? `http://${outputs.BackendExampleStack.LoadBalancerDNS}/hello/${message}` : 'http://localhost:8080/'}hello/${message}`)
      .then(res => res.text())
      .then(res => setGreeting(res as any));
    }, 500)

    return () => clearTimeout(delayFunction)
  }, [message]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{greeting}</h1>
          <input type="text" id="name" onChange={handleChange} value={message}/>
      </header>
    </div>
  );
}

export default App;
