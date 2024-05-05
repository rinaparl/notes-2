import React from "react";
import PropTypes from "prop-types";
import { HiOutlineTrash } from "react-icons/hi";

function DeleteButton({ id, onDelete }) {
  return <button className='note-item__delete' onClick={() => onDelete(id)}><HiOutlineTrash /></button>
}
 
DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}
 
export default DeleteButton;