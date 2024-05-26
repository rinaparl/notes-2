import React from "react";
import PropTypes from "prop-types";

function NoteItemContent({ title, date, body }) {
  return (
    <div className="note-item__content">
      <h3 className="note-item__title">{title}</h3>
      <p className="note-item__date">{date}</p>
      <p className="note-item__body">{body}</p>
    </div>
  );
}

NoteItemContent.propTypes = {
  title: PropTypes.node.isRequired,
  date: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}

export default NoteItemContent;
