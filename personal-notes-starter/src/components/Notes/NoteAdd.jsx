import React from "react";
import NoteList from "./NoteList";
import { getAllNotes } from ".../utils/local-data";
import NoteInput from "./NoteInput";
import SearchInput from "./SearchInput";

class NoteAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getAllNotes(),
      searchTerm: "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onUpdateArchive = this.onUpdateArchive.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onUpdateArchive(id) {
    const notes = this.state.notes;
    const indexData = notes.findIndex((note) => note.id === id);

    if (notes[indexData].archived) {
      notes[indexData].archived = false;
      this.setState({ notes: notes });
    } else {
      notes[indexData].archived = true;
      this.setState({ notes: notes });
    }
  }

  onAddNoteHandler(data) {
    this.setState((prevState) => {
      return {
        notes: [...prevState.notes, data],
      };
    });
  }

  handleSearch(searchTerm) {
    this.setState({ searchTerm });
  }

  render() {
    const data = this.state.notes;
    const searchTerm = this.state.searchTerm;

    function dataNotes(bool) {
      const filteredNotes = data.filter(
        (item) =>
          item.archived === bool &&
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filteredNotes;
    }

    return (
      <div className="note-app__body">
        <h1>Notes</h1> <hr />
        <h2>Tambah Catatan</h2>
        <NoteInput addNote={this.onAddNoteHandler} />
        <h2>Pencarian</h2>
        <SearchInput onSearch={this.handleSearch} />
        <h2>Catatan Aktif</h2>
        <NoteList
          notes={dataNotes(false)}
          onDelete={this.onDeleteHandler}
          onUpdate={this.onUpdateArchive}
        />
        <h2>Arsip</h2>
        <NoteList
          notes={dataNotes(true)}
          onDelete={this.onDeleteHandler}
          onUpdate={this.onUpdateArchive}
        />
      </div>
    );
  }
}

export default NoteAdd;
