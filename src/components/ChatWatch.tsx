'use client'

import { useEffect, useState } from 'react'
import { ChatClient } from '@twurple/chat'
import { StaticAuthProvider } from '@twurple/auth'

export const ChatWatch = () => {
    const [latestMessage, setLatestMessage] = useState('Original Message');

    useEffect(() => {
        const authProvider = new StaticAuthProvider(
            process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!,
            process.env.NEXT_PUBLIC_TWITCH_ACCESS_TOKEN!,
            ['chat:read', 'chat:edit']
        );

        const chatClient = new ChatClient({
            authProvider,
            channels: [process.env.NEXT_PUBLIC_TWITCH_CHANNEL!]
        });

        chatClient.onMessage((channel, user, message) => {
            setLatestMessage(`[${channel}] ${user}: ${message}`);
        })

        chatClient.connect()

        return () => {
            chatClient.quit();
        };
    }, []);
    return (
        <div>
            <h1>Watching Twitch Chat</h1>
            <p>{latestMessage}</p>
        </div>
    )
}