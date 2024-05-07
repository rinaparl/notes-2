import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import NoteList from "../components/Notes/NoteList";
import SearchBar from "../components/layout/SearchBar";
import { getArchivedNotes, deleteNote, getNote, unarchiveNote } from "../utils/network-data";
import NoteListEmpty from "../components/Notes/NoteListEmpty";
import LocaleContext from "../contexts/LocaleContext";

function ArchivPage({ defaultKeyword, keywordChange }) {
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(defaultKeyword || "");
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    fetchData();
  }, []);

    const fetchData = async () => {
      try {
        const archivedNotes = await getArchivedNotes();
        setNotes(archivedNotes);
      } catch (error) {
        console.error("Error fetching archived notes:", error);
      }
    };

  const onDeleteHandler = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const onUpdateArchive = async (id) => {
    try {
      const note = getNote(id);
      note.archived = false;
      // await unarchiveNote(id);
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error updating archive:", error);
    }
  };

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    if (typeof keywordChange === "function") {
      keywordChange(keyword);
    }
  };

  const filteredNotes = notes && notes.length > 0 ? notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  ) : [];

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
