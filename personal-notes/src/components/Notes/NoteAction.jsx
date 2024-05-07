import React from "react";
import PropTypes from "prop-types";
import { HiOutlineTrash } from "react-icons/hi";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import PageAction from "./PageAction";

function NoteAction({ archived, onUpdateArchive, onDeleteHandler }) {
  return (
    <PageAction page="detail-page">
      <>
        <button
          className="action"
          type="button"
          title={archived ? "Aktifkan" : "Archive"}
          onClick={() => onUpdateArchive()}
        >
          {archived ? <BiArchiveOut /> : <BiArchiveIn />}
        </button>
        <button
          className="action"
          type="button"
          title="Delete"
          onClick={() => onDeleteHandler()}
        >
          <HiOutlineTrash />
        </button>
      </>
    </PageAction>
  );
}

NoteAction.propTypes = {
  archived: PropTypes.bool.isRequired,
  onUpdateArchive: PropTypes.func.isRequired,
  onDeleteHandler: PropTypes.func.isRequired,
};

export default NoteAction;
