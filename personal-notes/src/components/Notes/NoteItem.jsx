import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NoteItemContent from "./NoteItemContent";
import NoteItemAction from "./NoteItemAction";
import { showFormattedDate } from "../../utils";

function NoteItem({ title, body, id, createdAt, onDelete, onUpdate }) {
  const formattedDate = showFormattedDate(createdAt);

  return (
    <div className="note-item">
      <NoteItemContent
        title={<Link to={`/notes/${id}`}>{title}</Link>}
        body={body}
        date={formattedDate}
      />
      <NoteItemAction id={id} onDelete={onDelete} onUpdate={onUpdate} />
    </div>
  );
}

NoteItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default NoteItem;
