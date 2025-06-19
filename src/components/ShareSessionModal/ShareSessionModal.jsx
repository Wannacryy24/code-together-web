import React, { useState } from 'react';
import { FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import './ShareModal.css';

const ShareSessionModal = ({ roomUrl, onClose }) => {
    const [copied, setCopied] = useState(false);
    console.log("In share Modal");

    const handleCopy = () => {
        navigator.clipboard.writeText(roomUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <h2>🔗 Share Your Room</h2>
                <p>Invite someone by sharing the link below</p>
                <div className="share-input-group">
                    <input type="text" value={roomUrl} readOnly />
                    <button onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</button>
                </div>
                <div className='share-buttons-div'>
                    {/* WhatsApp */}
                    <button>
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(`Join this collaborative session: ${roomUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaWhatsapp />
                        </a>
                    </button>

                    {/* Telegram */}
                    <button>
                        <a
                            href={`https://t.me/share/url?url=${encodeURIComponent(roomUrl)}&text=${encodeURIComponent('Join this collaborative session!')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaTelegramPlane />
                        </a>
                    </button>

                    {/* Twitter */}
                    <button>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Join this collaborative session: ${roomUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FiTwitter />
                        </a>
                    </button>
        
                    {/* Email */}
                    <button>
                        <a
                            href={`mailto:?subject=${encodeURIComponent('Join this collaborative session')}&body=${encodeURIComponent(`Here is the room link: ${roomUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MdOutlineEmail />
                        </a>
                    </button>
                </div>

                <div className="modal-actions">
                    <button onClick={onClose} className="close-btn">Close</button>
                </div>
            </div>
        </div>
    );
};

export default ShareSessionModal;
