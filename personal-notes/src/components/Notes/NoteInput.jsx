import React from "react";
import PropTypes from "prop-types";
import { HiCheck } from "react-icons/hi";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: Date.now(),
      title: "",
      body: "",
      archived: false,
      createdAt: Date.now(),
  }
  this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
  this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
  this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      }
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      }
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }


  render() {
    return (
      <section className="add-new-page">
      <form className="add-new-page__input" onSubmit={this.onSubmitEventHandler}>
        <input
          className="add-new-page__input__title"
          type="text"
          placeholder="Catatan Rahasia"
          value={this.state.title}
          onChange={this.onTitleChangeEventHandler}
        />
        <input
          className="add-new-page__input__body"
          placeholder="Sebenarnya saya adalah ..."
          type="text"
          value={this.state.body}
          onChange={this.onBodyChangeEventHandler}
        />
        <div className="add-new-page__action">
          <button
           className="action"
           type="Submit"
           title="Simpan">
            <HiCheck />
           </button>
        </div>
        
      </form>
      </section>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
}

export default NoteInput;
