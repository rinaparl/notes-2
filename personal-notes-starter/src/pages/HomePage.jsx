import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import NoteList from "../components/Notes/NoteList";
import SearchBar from "../components/layout/SearchBar";
import NavAdd from "../components/layout/NavAdd";
import { getNote, getActiveNotes, deleteNote, archiveNote, getArchivedNotes } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [loading, setLoading] = useState(true);
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const { data } = await getActiveNotes();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };
    
    const fetchArchiveData = async () => {
      try {
        const { data } = await getArchivedNotes();
        setArchivedNotes(data);
      } catch (error) {
        console.error("Error fetching archived data:", error);
      }
    };
    
    fetchData();
    fetchArchiveData();
  }, []);

 

  const onDeleteHandler = async (id) => {
    setLoading(true); 
    try {
      await deleteNote(id);
      const { data } = await getActiveNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setLoading(false); 
    }
  };

  const onUpdateArchive = async (id) => {
    setLoading(true); 
    try {
      if (id) {
        const note = await archiveNote(id);
        note.archived = true;
        
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
      }
    } catch (error) {
      console.error("Error updating archive:", error);
    } finally {
      setLoading(false); 
    }
  };

  const onAddNoteHandler = (note) => {
    setNotes((prevNotes) =>  [...prevNotes, note]);
  };

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes && notes.length > 0 ? notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  ) : [];
  

  return (
    <section className="homepage">
      <h2>{locale === "id" ? "Catatan Aktif" : "Active Note"}</h2>
      <section className="search-bar">
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      </section>
      <section>
        
        <NoteList
          notes={filteredNotes}
          // archivedNotes={archivedNotes}
          onDelete={onDeleteHandler}
          onUpdate={onUpdateArchive}
        />
      </section>
      <div className="homepage__action">
        <NavAdd />
      </div>
    </section>
  );
}

export default HomePage;
