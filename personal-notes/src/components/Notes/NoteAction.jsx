import React from "react";
import PropTypes from "prop-types";
import { HiOutlineTrash } from "react-icons/hi";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import PageAction from "./PageAction";

function NoteAction({ archived, handleArchive, handleDelete }) {
  return (
    <PageAction page="detail-page">
      <>
        <button
          className="action"
          type="button"
          title={archived ? "Aktifkan" : "Archive"}
          onClick={() => handleArchive()}
        >
          {archived ? <BiArchiveOut /> : <BiArchiveIn />}
        </button>
        <button
          className="action"
          type="button"
          title="Delete"
          onClick={() => handleDelete()}
        >
          <HiOutlineTrash />
        </button>
      </>
    </PageAction>
  );
}

NoteAction.propTypes = {
  archived: PropTypes.bool.isRequired,
  handleArchive: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default NoteAction;
