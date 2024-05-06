import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

function NoteList({ notes, onDelete, onUpdate }) {
  
  return (
    <div className="notes-list">
      {notes.length ?  (
       
        <>
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              id={note.id}
              onDelete={onDelete}
              onUpdate={onUpdate}
              {...note}
            />
          ))}
        </>
      ) : (
        <p className="notes-list__empty-message">Tidak ada catatan</p>
      )}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default NoteList;
