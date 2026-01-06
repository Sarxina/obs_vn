'use client'

import { useEffect, useState } from "react"
import { CharacterData, ChoiceData, defaultVNState, GamePiece, GamePieces, LocationData, VNStateData} from "../../common/types"
import { Socket, io } from "socket.io-client"

export interface UpdateVNStateFuns {
    updateGamePiece: (...args: any[]) => void
    addGamePiece: (pieceType: GamePiece) => void
    removeGamePiece: (pieceType: GamePiece, keyWord: string) => void
    setMode: (newMode: 'text' | 'choice') => void
    setCurrentLoc: (newLoc: string) => void
}

export const useVNState = (): [VNStateData, UpdateVNStateFuns] => {
    const [vnState, setVNState] = useState<VNStateData>(defaultVNState);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // In dev: connects to backend on 5001. In prod: connects to same origin
        const newSocket = io(window.location.origin.includes('3000') ? 'http://localhost:5001' : window.location.origin);
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    // Effect to connect, then get the vnstate of the backend, upon new socket
    useEffect(() => {
        if (!socket) return;

        socket.on('connect', () => {
            socket.emit('get-vnstate');
        });

        socket.on('vn-update', (vnState: VNStateData) => {
            setVNState(vnState);
        });

        return () => {
            socket.off('connect');
            socket.off('vn-update');
        }
    }, [socket]);

    // Function for updating any of the Characters, Locations, or Choices
    const updateGamePiece = (
        newPiece: CharacterData | LocationData | ChoiceData,
        pieceType: GamePiece,
        pieceArray: GamePieces

    ) => {
        const newPieces = vnState[pieceArray].map(currentPiece =>
            currentPiece.keyWord === newPiece.keyWord
            ? newPiece
            : currentPiece
        )
        setVNState({
            ...vnState,
            [pieceArray]: newPieces
        })
        socket?.emit(`update-${pieceType}`, newPiece);
    }

    const addGamePiece = (
        pieceType: GamePiece,
    ) => {
        socket?.emit(`add-${pieceType}`);
    };

    const removeGamePiece = (
        pieceType: GamePiece,
        keyWord: string
    ) => {
        socket?.emit(`remove-${pieceType}`, {keyWord: keyWord})
    }

    const setMode = (
        newMode: 'text' | 'choice'
    ) => {
        setVNState({
            ...vnState,
            currentMode: newMode
        });
        socket?.emit('set-mode', {mode: newMode});
    }

    const setCurrentLoc = (
        newLoc: string
    ) => {
        setVNState({
            ...vnState,
            currentLocation: newLoc
        });
        socket?.emit('set-current-location', {keyWord: newLoc});
    }

    // Final object containing all the callbacks to update the VN state
    const updateVNState = {
        updateGamePiece: updateGamePiece,
        addGamePiece: addGamePiece,
        removeGamePiece: removeGamePiece,
        setMode: setMode,
        setCurrentLoc: setCurrentLoc
    }

    return [vnState, updateVNState];
}
