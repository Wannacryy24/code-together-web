import { createContext, useRef, useState } from "react";

export const RrwebContext = createContext();

export const RrwebContextProvider = ({ children }) => {
    const [recording, setRecording] = useState(false);
    const replayerContainerRef = useRef(null);
    const stopFnRef = useRef(null);
    const [showReplayModal, setShowReplayModal] = useState(false);

    return (
        <RrwebContext.Provider 
            value={
                { 
                    recording, setRecording,
                    showReplayModal, setShowReplayModal,
                    replayerContainerRef,
                    stopFnRef 
                }}>
            {children}
        </RrwebContext.Provider>
    );
};