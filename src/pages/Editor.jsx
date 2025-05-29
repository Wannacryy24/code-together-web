import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react'
import { useParams } from 'react-router-dom';
import AsideBar from '../layouts/AsideBar'

export const EditorComp = () => {

    const { id: roomId } = useParams();
    const [code, setCode] = useState("// Write or paste code here...");
    const [socketId, setSocketId] = useState(null);
    
    const [remoteCursors, setRemoteCursors] = useState({});
    const [remoteSelection, setRemoteSelection] = useState(null);

    const socketRef = useRef(null);
    const editorRef = useRef(null);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Connect to backend
        socketRef.current = io('http://localhost:5001'); 
        // socketRef.current = io('https://codeeditorbackend-pp93.onrender.com', {
        //     withCredentials: true,
        //     transports: ['websocket'],
        // });

        socketRef.current.on('connect', () => {
            console.log('Connected to socket server');
            const username = localStorage.getItem('user_name') || 'Anonymous';
            socketRef.current.emit('join-room', { roomId, username });
            setSocketId(socketRef.current.id);
        });

          socketRef.current.on('user-list', (userList) => {
              console.log('Updated user list:', userList);
            setUsers(userList);
        });

        // Receive code updates
        socketRef.current.on('code-update', (newCode) => {
            setCode(newCode);
        });

        // Receive remote cursor position
        socketRef.current.on('cursor-position-update', ({ lineNumber, column, senderId, username }) => {
            if (senderId === socketRef.current.id) return;
            setRemoteCursors(prev => ({
                ...prev,
                [senderId]: { lineNumber, column, username },
            }));
        });


         socketRef.current.on('selection-update', ({ senderId, selection }) => {
            if (senderId === socketRef.current.id) return;
            setRemoteSelection(selection);
        });

        // Optional: clean up on unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);


   useEffect(() => {
  if (!editorRef.current) return;

  const editor = editorRef.current;

  const decorations = Object.entries(remoteCursors).map(([userId, cursor]) => ({
    range: new window.monaco.Range(
      cursor.lineNumber,
      cursor.column,
      cursor.lineNumber,
      cursor.column
    ),
    options: {
      className: 'remote-cursor',
      hoverMessage: { value: `**${cursor.username}**` }, // 👈 Show username on hover
      after: {
        content: `Test`,
        inlineClassName: 'cursor-label',
    },
      stickiness: window.monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
    }
  }));

  const applied = editor.deltaDecorations([], decorations);

  return () => {
    editor.deltaDecorations(applied, []);
  };
}, [remoteCursors]);


    const handleEditorChange = (value) => {
        setCode(value);
        socketRef.current.emit('code-change', {
            roomId,
            data: value,
        });
    };

    const handleEditorMount = (editor) => {
        editorRef.current = editor;
        editor.onDidChangeCursorPosition((e) => {
        const position = e.position;
        socketRef.current.emit('cursor-position-change', {
            roomId,
            lineNumber: position.lineNumber,
            column: position.column,
        });
        });

        editor.onDidChangeCursorSelection((e) => {
        const selection = e.selection;
        socketRef.current.emit('selection-change', {
            roomId,
            selection: {
                startLineNumber: selection.startLineNumber,
                startColumn: selection.startColumn,
                endLineNumber: selection.endLineNumber,
                endColumn: selection.endColumn,
                },
            });
        });
    };

    return (
        <div className='editor-main-div'>
            <Editor className='editor'
                height="92vh" width="100vw" defaultLanguage="javascript" defaultValue="// Write or paste code here..." theme="vs-dark"
                value={code} 
                onChange={handleEditorChange}
                onMount={handleEditorMount}
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
            <AsideBar/>
        </div>
    );
};