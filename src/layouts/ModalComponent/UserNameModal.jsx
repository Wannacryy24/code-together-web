import React, { useContext } from "react";
import { userNameContext } from '../../ContextAPI/UserNameContext';
import './UserNameModal.css';

const UserNameModal = () => {
  const { showModal, userName, setUserName, setShowModal } = useContext(userNameContext);

  if (!showModal) return null;

  const handleUserNameChange = (e) => {
    const typedValue = e.target.value;
    setUserName(typedValue);
    localStorage.setItem('user_name', typedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setShowModal(false);
    }
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="modal-form">
        <label htmlFor="username-input">Welcome! 👋</label>
        <p className="modal-description">
          No need for emails or passwords — just a username and you're in. Fast, private, and effortless. Choose something unique and memorable!
        </p>
        <input
          id="username-input"
          type="text"
          placeholder="e.g., john_doe"
          value={userName}
          onChange={handleUserNameChange}
          required
          autoFocus
        />
        <div className="modal-button-row">
          <button type="button" onClick={() => setUserName('')}>Clear</button>
          <button type="submit">Save</button>
        </div>
        <button type="button" onClick={() => setShowModal(false)} className="closeBtn">X</button>
      </form>
    </div>
  );
};

export default UserNameModal;