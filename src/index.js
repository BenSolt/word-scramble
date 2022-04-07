import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import AppSlideLetter from './AppSlideLetter';

// PAUL HELPED WITH THIS ONE
// import AppPaul from './AppPaul';

import AppWordScramble from './AppWordScramble';
// import AppWordScramble2 from './AppWordScramble2';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>

    {/* <AppPaul/> */}

    <AppWordScramble/>
    {/* <AppWordScramble2/> */}

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
