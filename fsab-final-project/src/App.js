import './App.css';
import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import ClassesList from './ClassesList';

function App() {
  return (
    <div className="App">
      <h1>Class Planner</h1>
      <img 
        src="https://core-docs.s3.amazonaws.com/owensboro_public_schools_ar/article/image/large_04b2e8ef-0951-4e70-b956-4a4dd4f7a2c7.jpeg"
        alt="School Supplies"
        style={{ width: 'auto', height: 250 }}
      />
      <h1>Classes:</h1>
      <ClassesList />
    </div>
  );
}

export default App;
