import { useEffect, useState, useSyncExternalStore } from 'react';
import './styles.css';
import {database}   from '../../Firebase';
import { set, ref, push, child, update } from 'firebase/database';
import { collection, addDoc } from '@firebase/firestore';

const AddNote = (props) => {
    const [noteAdded, setNoteAdded] = useState(false);
    const [note, setNote] = useState({ title: '', tagline: '', note: '', isPinned: false});
    const [editNote, setEditNote] = useState({});
    const [message, setMessage] = useState('');
    
    const addNote = async () => {

        if(note.title == '' ){
            setMessage('Title cant be empty');
            setTimeout(() => setMessage(''), 2000)
            return
        }
        const noteData = note;
        noteData.createdAt = new Date().toISOString();
        // const docRef = await addDoc(collection(database, 'notes'), {noteData});
        // console.log(docRef);

        // setNote({title: '', tagline: '', note: '', isPinned: false});
        // setMessage('Note Added Succesfully');
        // setNoteAdded(true);
        // setTimeout(() => setMessage(''), 2000)
        
        console.log(noteData);
        const notesListReference = ref(database, 'notes');
        const newNoteReference = push(notesListReference);
        

        await set(newNoteReference, noteData)
        .then((res) => {
            console.log("IN HERE");
            setNote({title: '', tagline: '', note: '', isPinned: false});
            setMessage('Note Added Succesfully');
//             props.fetchNotes();
            setNoteAdded(true);
            setTimeout(() => setMessage(''), 2000)
        })
        .catch((err) => {
            console.log(err);
            setNoteAdded(false);
            setMessage('Some error occured, try again later!!');
            setTimeout(() => setMessage(''), 2000);
        });
    };

    const updateNote = () => {
        console.log(note);
        const newNoteKey = push(child(ref(database), 'notes')).key;
        console.log(newNoteKey);
        const updates = {};
        updates['/notes/' + props.noteKey] = note;
        update(ref(database), updates);

    }
    useEffect(() => {
        console.log(props);
        if (props.note) {
            setNote(props.note);
        }
    }, [])

    const handleModalClose = () => {

    }

    return (
        <div className="sticky text-start mt-3">
            <h5 className="text-start">{props.editMode ? 'Edit Note' : 'Add Note'}</h5>
            <div className="add-note mb-3">
                <div className="input input-group-lg mb-2">
                    <input value={note.title} onChange={(e) => setNote({...note, title: e.target.value})} placeholder="Title" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                </div>
                <div className="input input-group-lg mb-2">
                    <input value={note.tagline} onChange={(e) => setNote({...note, tagline: e.target.value})} placeholder="Tagline" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                </div>
                <div className="input input-group-lg">
                    <textarea value={note.note} onChange={(e) => setNote({...note, note: e.target.value})} placeholder="Note" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <button onClick={props.editMode ? updateNote : addNote} className=" btn btn-primary">{props.editMode ? 'Save' : 'Add note'}</button>
                </div>
                {!props.editMode && noteAdded ? <div className="col-lg-9 text-end" style={{color: 'green'}}><p>{message}</p></div> : <div className="col-lg-9 text-end" style={{color: 'red'}}><p>{message}</p></div>}
                
                    {props. editMode ? <div className="col-lg-9 mt-1"><button onClick={props.handleModalClose}  className=" btn btn-secondary">Cancel</button></div> : null}

            </div>
        </div>
    )
}
export default AddNote;
