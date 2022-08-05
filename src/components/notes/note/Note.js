import './styles.css';

const Note = (props) => {
    return (
        <div className="note mb-3">
            <p>{props.note.title}</p>
            <p>{props.note.tagline}</p>
            <p>{props.note.note}</p>
        </div>
    )
}
export default Note;