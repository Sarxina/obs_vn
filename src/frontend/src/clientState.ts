'use client'

import { useEffect, useState } from "react"
import { defaultVNState, VNStateData, VNStateField, VNSubject } from "../../common/types"
import { Socket, io } from "socket.io-client"

export type UpdateVNStateFun = <F extends VNStateField>(
    field: F,
    subject: VNSubject<F>,
    data: any
) => void

export const useVNState = (): [VNStateData, UpdateVNStateFun] => {
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

    const updateVNState = <F extends VNStateField>(
        field: F,
        subject: VNSubject<F>,
        data: any
    ) => {
        if (!socket) return;

        // Route to the proper update procedures
        socket.emit(subject, data)
    }

    return [vnState, updateVNState];
}
