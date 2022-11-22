import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [greeting, setGreeting] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setMessage(event.target.value);
  };
  
  useEffect(() => {
    const delayFunction = setTimeout(() => {
      fetch(`http://localhost:8080/hello/${message}`)
      .then(res => res.text())
      .then(res => setGreeting(res as any));
    }, 500)

    return () => clearTimeout(delayFunction)
  }, [message]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{greeting}</h1>
        <form>
          <input type="text" id="name" onChange={handleChange} value={message}/>
        </form>
        
      </header>
    </div>
  );
}

export default App;
