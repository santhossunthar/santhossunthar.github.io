import React from 'react';
import NavBar from './components/NavBar';
import ProfileBody from './components/ProfileBody';

const App = () => {
  return (
     <div className='container'>
          <ProfileBody/>
          <NavBar/>
      </div>     
  );
}

export default App;
