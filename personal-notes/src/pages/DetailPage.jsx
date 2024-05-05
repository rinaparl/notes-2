import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../utils/local-data";
import { showFormattedDate } from "../utils";
import NotFound from "./NotFound";
import NoteAction from "../components/Notes/NoteAction";

const DetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState();

  const fetchNote = (id) => {
    try {
      const note = getNote(id);
      setNote(note);
    } catch (error) {}
  };

  

  useEffect(() => {
    fetchNote(id);
  }, [id]);

  return (
    <section className="detail-page">
      { id && note ? (
        <>
          <h3 className="detail-page__title">
            {note.title}
          </h3>
          <p className="detail-page__createdAt">
            {showFormattedDate(note.createdAt)}
          </p>
          <div className="detail-page__body">
            {note.body}
          </div>
    
        </>
      ) : (
        <NotFound/>
      )}
      

    </section>
  );
};

export default DetailPage;
