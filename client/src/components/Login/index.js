import './Login.css';
import { useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

export const Login = ({ onIdSubmit }) => {
  const inputIDRef = useRef(null);
  const inputUsernameRef = useRef(null);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    onIdSubmit({
      roomID: inputIDRef.current.value,
      username: inputUsernameRef.current.value
    });
  };

  const createNewID = () => {
    inputIDRef.current.value = uuidv4();
    if (inputUsernameRef.current.value) {
      onIdSubmit({
        roomID: inputIDRef.current.value,
        username: inputUsernameRef.current.value
      });
    } else {
      inputUsernameRef.current.focus();
    }
  };

  return (
    <div className="login_container">
      <form onSubmit={handleSubmit} className="form_container">
        <div className="form_field form_field_username">
          <label className="form_label form_label_username">Username:</label>
          <input name="username" className="form_input form_input_username" type="text" ref={inputUsernameRef} placeholder="Enter your username" required/>
        </div>
        <div className="form_field form_field_room">
          <label name="room_id" className="form_label form_label_room">Room ID:</label>
          <input className="form_input form_input_room" type="text" ref={inputIDRef} placeholder="Enter the room's ID" required/>
        </div>
        <div className="buttons_container">
          <input type="submit" className="button button_submit" value="Go with this"/>
          <button type="button" className="button button_create" onClick={createNewID}>Random ID</button>
        </div>
      </form>
    </div>
  );
};