import { ChatClient } from '@twurple/chat';
import { StaticAuthProvider } from '@twurple/auth';
import 'dotenv/config';

console.log('DEBUG ENV:', {
  clientId: process.env.TWITCH_CLIENT_ID,
  accessToken: process.env.TWITCH_ACCESS_TOKEN,
  channel: process.env.TWITCH_CHANNEL
});

async function main() {
  const authProvider = new StaticAuthProvider(
    process.env.TWITCH_CLIENT_ID,
    process.env.TWITCH_ACCESS_TOKEN,
    ['chat:read', 'chat:edit']
  );

  const chatClient = new ChatClient({
    authProvider,
    channels: [process.env.TWITCH_CHANNEL]
  });

  chatClient.onMessage((channel, user, message) => {
    console.log(`[${channel}] ${user}: ${message}`);
  });

  await chatClient.connect();
  console.log('✅ Connected to Twitch chat');
}

main().catch(console.error);
