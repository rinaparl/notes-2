import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import NoteList from "../components/Notes/NoteList";
import SearchBar from "../components/layout/SearchBar";
import { getArchivedNotes, deleteNote, getNote } from "../utils/local-data";
import NoteListEmpty from "../components/Notes/NoteListEmpty";
import LocaleContext from "../contexts/LocaleContext";

function ArchivPage({ defaultKeyword, keywordChange }) {
  const [notes, setNotes] = useState(getArchivedNotes());
  const [keyword, setKeyword] = useState(defaultKeyword || "");
  const { locale } = useContext(LocaleContext);

  const onDeleteHandler = (id) => {
    deleteNote(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const onUpdateArchive = (id) => {
    if (id) {
      const note = getNote(id);
      note.archived = false;
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
    }
  };

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    if (typeof keywordChange === "function") {
      keywordChange(keyword);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section className="archive-page">
      <h2>{locale === "id" ? "Catatan Arsip" : "Archive Note"}</h2>
      <section className="search-bar">
        <SearchBar
          keyword={keyword}
          keywordChange={onKeywordChangeHandler}
        />
      </section>
      <section className="notes-list">
        {filteredNotes.length > 0 ? (
          <NoteList
            notes={filteredNotes}
            onDelete={onDeleteHandler}
            onUpdate={onUpdateArchive}
          />
        ) : (
          <NoteListEmpty />
        )}
      </section>
    </section>
  );
}

ArchivPage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func,
};

export default ArchivPage;
