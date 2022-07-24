import React from 'react';
import ReactDOM from 'react-dom/client';

import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

function App() {
  return (
    <div>
      This is a React app!
    </div>
  )
}


/* function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component()); */