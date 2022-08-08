import { useEffect, useState } from 'react';
import Note from './note/Note';
import { ref, get, orderByChild, child, limitToLast, limitToFirst, query} from 'firebase/database';
import { database } from '../../Firebase';
import { limit, orderBy,  startAt, collection, getDocs, Firestore } from 'firebase/firestore';
import Loader from '../loader/Loader';
import EditModal from '../editModal/EditModal';
import './styles.css';
import { current } from 'immer';
// import firebase from 'firebase';

const Notes = (props) => {

    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [noteKey, setNoteKey] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [notesPerPage, setNotesPerPage] = useState(6);



    const openEditModal = (note, key) => {
        console.log("IN HERE");
        console.log(key);
        setSelectedNote(note);
        setNoteKey(key);
        setModalOpen(true);
        console.log(selectedNote);
    }
    const fetchNotes = async () => {
        // const q = query(orderByChild('/notes/title'), limitToLast(6));
        // console.log(q)
        // const q = query(ref(database, 'notes'), orderBy('createdAt'), startAt(new Date().toISOString()), limitToFirst(6));
        // await get(q)
        // .then((snapshot) => {
        //   if(snapshot) {
        //       console.log(snapshot.val())
        //     setNotes(snapshot.val());
        //   } else {
        //     console.log('No Notes Available')
        //   }
        // });
        // const querySnapshot = await getDocs(collection(database, 'notes'));
        // console.log(querySnapshot); 
        // console.log(querySnapshot.docs)
        // querySnapshot.forEach((doc) => {
        //     console.log(`${doc.id} => ${doc.data()}`);
        //   });
        const databaseReference = ref(database);
        await get(query(ref(database, 'notes')))
        .then((snapshot) => {
          if(snapshot) {
              const notes = snapshot.val();
              const pinnedNotes = {}
              const unpinnedNotes = {}
              Object.entries(notes).forEach(([key, note]) => {
                  if (note.isPinned) {
                      pinnedNotes[key] = note
                  } else {
                      unpinnedNotes[key] = note
                  }
              })

              setNotes(Object.assign(pinnedNotes, unpinnedNotes))
          } else {
            console.log('No Notes Available')
          }
        });
        // const snapshot = await database.collection('notes').get();
        // console.log(snapshot);
    };
    
    useEffect(() => {
        setLoading(true);
        fetchNotes();
        setLoading(false);
    }, []);

    //Get current notes\
    // const indexOfLastNote = currentPage * notesPerPage;
    // const indexOfFirstNote = indexOfLastNote - notesPerPage;
    // let currentNotes;
    // if(notes) currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote)

    if(loading) {
        return (<Loader />) 
    }

    let i = 0;
    return (
        
        <div className="container">
            <div className="row">
                
            {    
                
            notes && Object.keys(notes).map(key => {

            return (
                <div className="col-lg-6 text-start" onClick={() => openEditModal(notes[key], key)} key={key}>
                    <Note note={notes[key]} noteKey={key} />
                    
                </div>
                )
            }
        )}
            </div>
       
        <EditModal open={modalOpen} notesFetch={() => fetchNotes()} closeModal={() => setModalOpen(false)} note={selectedNote} noteKey={noteKey} editMode={true}/>
        </div>
        
            
    )
}
export default Notes;