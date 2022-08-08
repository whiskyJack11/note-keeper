import AddNote from "../addNote/AddNote";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useEffect } from "react";
const EditModal = (props) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#282c34',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        color: 'white'
    };

    const closeModal = () => {
    };

    useEffect(() => {
        console.log(props);
    }, []);

    return(
        <div>
            <Modal
                open={props.open}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <AddNote fetchNotes={props.notesFetch} handleModalClose={props.closeModal} note={props.note} noteKey={props.noteKey} editMode={props.editMode} />
                </Box>
            </Modal>
        </div>
    )
};
export default EditModal;