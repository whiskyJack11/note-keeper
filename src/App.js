
import './App.css';

import Header from './components/header/Header';
import AddNote from './components/addNote/AddNote';
import Notes from './components/notes/Notes';
import { useEffect, useState } from 'react';
// import { database } from './Firebase';
import EditModal from './components/editModal/EditModal';



function App() {
  const [note, setNote] = useState({});

  return (
    <div className="App App-header">
      <Header />       
      <div className="row p-4">
        <div className="col-lg-6">
          <AddNote />
        </div>
        <div className="col-lg-6 text-start">
          <h3>Notes</h3>
          <Notes />
        </div>
      </div>
      <EditModal />
    </div>
  );
}

export default App;
