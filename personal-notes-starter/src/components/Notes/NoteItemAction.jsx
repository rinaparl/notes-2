import React from "react";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";
import PropTypes from "prop-types";

function NoteItemAction({ id, onDelete, onUpdate }) {
  return (
    <div className="note-item__action">
      <DeleteButton id={id} onDelete={onDelete} />
      <ArchiveButton id={id} onUpdate={onUpdate} />
    </div>
  );
}

NoteItemAction.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default NoteItemAction;
