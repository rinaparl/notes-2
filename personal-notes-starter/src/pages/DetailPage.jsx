import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getNote, deleteNote, getActiveNotes, archiveNote } from "../utils/network-data";
import { showFormattedDate } from "../utils";
import NotFound from "./NotFound";
import NoteAction from "../components/Notes/NoteAction";


const DetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await getNote(id);
        setNote(data);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [id]);

  const onDeleteHandler = async () => {
    try {
      await deleteNote(id);
      const { data } = await getActiveNotes();
      setNote(data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const onUpdateArchive = async () => {
    try {
      if (id) {
        // const note = await getNote(id);
        // note.archived = true;
        await archiveNote(id);
        setNote((prevNote) => ({
          ...prevNote,
          archived: true
        }));
        // const updatedNotes = note.filter((note) => note.id !== id);
        // setNote(updatedNotes);
      }
    } catch (error) {
      console.error("Error updating archive:", error);
    }
  };

  return (
    <section className="detail-page">
      {id && note ? (
        <>
          <h3 className="detail-page__title">{note.title}</h3>
          <p className="detail-page__createdAt">
            {showFormattedDate(note.createdAt)}
          </p>
          <div className="detail-page__body">{note.body}</div>
         
        </>
      ) : (
        <NotFound />
      )}
    </section>
  );
};

export default DetailPage;
