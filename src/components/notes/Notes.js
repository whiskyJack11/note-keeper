import { useEffect, useState } from 'react';
import Note from './note/Note';
import { ref, get, child} from 'firebase/database';
import { database } from '../../Firebase';
import Loader from '../loader/Loader';
import EditModal from '../editModal/EditModal';

const Notes = (props) => {

    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [noteKey, setNoteKey] = useState('');



    const openEditModal = (note, key) => {
        console.log("IN HERE");
        console.log(key);
        // console.log(notes);
        // console.log(notes[key])
        setSelectedNote(note);
        setNoteKey(key);
        setModalOpen(true);
        console.log(selectedNote);
    }
    const fetchNotes = async () => {
        const databaseReference = ref(database);
        await get(child(databaseReference, 'notes'))
        .then((snapshot) => {
          if(snapshot) {
            setNotes(snapshot.val());
          } else {
            console.log('No Notes Available')
          }
        });
    };
    
    useEffect(() => {
        setLoading(true);
        fetchNotes();
        setLoading(false);
    }, []);

    if(loading) {
        <Loader /> 
    }

    return (
        <div>
        {    notes && Object.keys(notes).map(key => {
            return (
                <div className="text-start" onClick={() => openEditModal(notes[key], key)} key={key}>
                    <Note note={notes[key]} />
                </div>
                )
            }
        )}
        <EditModal open={modalOpen} closeModal={() => setModalOpen(false)} note={selectedNote} noteKey={noteKey} editMode={true}/>
        </div>
        
            
    )
}
export default Notes;