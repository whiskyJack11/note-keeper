import { useEffect, useState, useSyncExternalStore } from 'react';
import './styles.css';
import {database}   from '../../Firebase';
import { set, ref, push, child, update } from 'firebase/database';

const AddNote = (props) => {
    const [noteAdded, setNoteAdded] = useState(false);
    const [note, setNote] = useState({ title: '', tagline: '', note: '', isPinned: false});
    const [editNote, setEditNote] = useState({});
    
    const addNote = async () => {

        const noteData = note;
        console.log(noteData);
        const notesListReference = ref(database, 'notes');
        const newNoteReference = push(notesListReference);

        await set(newNoteReference, noteData)
        .then((res) => {
            console.log("IN HERE");
            setNoteAdded(true);
            setNote({title: '', tagline: '', note: '', isPinned: false});
        })
        .catch((err) => {
            console.log(err);
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
        // props.editMode ?
        <div className=" text-start mt-3">
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
                <div className="col-lg-9">
                    {props. editMode ? <button onClick={props.handleModalClose}  className=" btn btn-secondary">Cancel</button> : null}
                </div>
            </div>
        </div>
        // :
        // <div className=" text-start mt-3">
        //     <h5 className="text-start">Edit Note</h5>
        //     <div className="add-note mb-3">
        //         <div className="input input-group-lg mb-2">
        //             <input value={props.note.title} onChange={(e) => setNote({...note, title: e.target.value})} placeholder="Title" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
        //         </div>
        //         <div className="input input-group-lg mb-2">
        //             <input value={props.note.tagline} onChange={(e) => setNote({...note, tagline: e.target.value})} placeholder="Tagline" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
        //         </div>
        //         <div className="input input-group-lg">
        //             <textarea value={props.note.note} onChange={(e) => setNote({...note, note: e.target.value})} placeholder="Note" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-lg-6">
        //             <button onClick={addNote} className=" btn btn-primary">Add note</button>
        //         </div>
        //         <div className="col-lg-6">
        //             <p></p>
        //         </div>
        //     </div>
        // </div>

    )
}
export default AddNote;