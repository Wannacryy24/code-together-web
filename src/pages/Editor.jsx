import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react'
import { useParams } from 'react-router-dom';
import './Editor.css'

export const EditorComp = () => {
    const { id: roomId } = useParams();
    const [code, setCode] = useState("// Write or paste code here...");

    const socketRef = useRef(null);

    useEffect(() => {
        // Connect to backend
        // socketRef.current = io('http://localhost:5001'); 
        socketRef.current = io('https://codeeditorbackend-pp93.onrender.com', {
            withCredentials: true,
            transports: ['websocket'],
        });


        socketRef.current.on('connect', () => {
            console.log('Connected to socket server');
            socketRef.current.emit('join-room', roomId)
        });

        // Receive code updates
        socketRef.current.on('code-update', (newCode) => {
            setCode(newCode);
        });

        // Optional: clean up on unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);


    const handleEditorChange = (value) => {
        setCode(value);
        socketRef.current.emit('code-change', {
            roomId,
            data: value,
        });
    };


    return (
        <div className='editor-main-div'>
            <Editor className='editor'
                height="90vh" width="95vw" defaultLanguage="javascript" defaultValue="// Write or paste code here..." theme="vs-dark"
                value={code} onChange={handleEditorChange}
                options={{
                    fontSize: 16,
                    wordWrap: 'on',
                    minimap: { enabled: true },
                    suggest: { enabled: true }, // 👈 Disables IntelliSense
                    formatOnType: true,
                    scrollBeyondLastLine: false,
                    quickSuggestions: false, // 👈 Disables suggestions-as-you-type
                    suggestOnTriggerCharacters: true,
                }}
            />
            <aside className='aside-bar'>
                <button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" /></svg></button>
                <button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-160v-441q0-33 24-56t57-23h439q33 0 56.5 23.5T880-600v320L680-80H360q-33 0-56.5-23.5T280-160ZM81-710q-6-33 13-59.5t52-32.5l434-77q33-6 59.5 13t32.5 52l10 54h-82l-7-40-433 77 40 226v279q-16-9-27.5-24T158-276L81-710Zm279 110v440h280l160-160v-280H360Zm220 220Zm-40 160h80v-120h120v-80H620v-120h-80v120H420v80h120v120Z" /></svg></button>
                <button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" /></svg></button>
            </aside>
        </div>
    );
};