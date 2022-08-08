import { useEffect } from 'react';
import { database } from '../../../Firebase';
import './styles.css';
import {ref, update,push, child} from 'firebase/database';

const Note = (props) => {

    const pinNote = (event) => {
        event.stopPropagation();
        const dbRef = ref(database, 'notes');
        const newNoteKey = push(child(ref(database), 'notes')).key;
        console.log(newNoteKey);
        const updates = {};
        updates['/notes/' + props.noteKey] = {...props.note, isPinned: true};
        update(ref(database), updates);
        // dbRef.child("notes").child(props.noteKey).child("isPinned").setValue(true);
    };

    const unpinNote = (event) => {
        event.stopPropagation();
        const newNoteKey = push(child(ref(database), 'notes')).key;
        console.log(newNoteKey);
        const updates = {};
        updates['/notes/' + props.noteKey] = {...props.note, isPinned: false};
        update(ref(database), updates);
        // dbRef.child("notes").child(props.noteKey).child("isPinned").setValue(true);
    }
    useEffect(() => {
        console.log(props);
    }, []);

    return (
        <div className="note mb-3">
            <div className="row">
                <div className="text-start col-lg-6">
                    <p>{props.note.title}</p>
                </div>
                <div className="text-end col-lg-6">
                    <button onClick={props.note.isPinned ? unpinNote : pinNote} className="btn btn-primary">{props.note.isPinned ? 'Unpin': 'Pin'}</button>
                </div>
            </div>
            <p>{props.note.tagline}</p>
            <p>{props.note.note}</p>
        </div>
    )
}
export default Note;