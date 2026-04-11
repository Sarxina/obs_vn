# OBS VN

OBS VN lets you turn your Twitch stream into a visual novel, with characters controlled and voiced by your chat! Viewers queue up to take over a character and speak through them with text-to-speech. Chat can also vote on choices throughout the game.

---

## Dependencies

### Things You Need to Install

- [Node.js](https://nodejs.org/) (v18 or later)

### Twitch Credentials

You need four things from Twitch:

- **Client ID** — identifies your application to Twitch
- **Channel Name** — your Twitch username (lowercase)
- **Access Token** — lets OBS VN read and send messages in your chat
- **Refresh Token** — used to automatically get a new access token when it expires

#### Getting your tokens with Twitch Token Generator (easy mode)

1. Go to https://twitchtokengenerator.com/
2. Click **Bot Chat Token**
3. Twitch will ask you to authorize the app — this is just giving it permission to read and send chat messages on your behalf. Click **Authorize**
4. You'll land on a page with a lot of stuff on it. Ignore everything except the **Generated Tokens** section near the top — it has your **Access Token**, **Refresh Token**, and **Client ID**
5. Copy each of those three values into your `.env` file (see the setup section below)

### Azure Text-to-Speech (optional)

This is optional, but without it your characters won't have voices. OBS VN uses Azure Cognitive Services to give each character text-to-speech. You need:

- **TTS Key** — your Azure Speech resource key
- **TTS Region** — the region your resource is in (e.g. `eastus`)

#### Getting your Azure TTS key

You need an Azure account with billing set up. Don't worry — I've been using this for months and have paid like 5 cents total.

1. Go to [portal.azure.com](https://portal.azure.com) and sign in (or create a free Microsoft account)
2. If you don't have billing set up yet, search for **Subscriptions** in the top search bar, click it, and follow the steps to add a payment method
3. Click **Create a resource** (the plus icon near the top left)
4. Search for **Speech** in the search bar
5. Find the one called **Speech** by **Microsoft** (it says "Azure Service" underneath) and click **Create**
6. Fill in the form:
   - **Subscription** — leave it as-is (should be auto-filled)
   - **Resource group** — click **Create new** and give it any name (e.g. `obs-vn`)
   - **Region** — pick one close to you (e.g. `East US`). Remember what you pick — this is your `AZURE_TTS_REGION`
   - **Name** — anything you want (e.g. `obs-vn-speech`)
   - **Pricing tier** — select **Free F0** (gives you 500,000 characters per month for free)
7. Click **Review + create**, then **Create**
8. Once it's deployed, click **Go to resource**
9. Scroll down to the **Keys and endpoint** section on the overview page
10. Copy **KEY 1** — this is your `AZURE_TTS_KEY`
11. Copy **Location/Region** — this is your `AZURE_TTS_REGION` (e.g. `eastus`)

---

## Setup

### 1. Download the Project

Clone the repo (or download it as a zip — either works now):

```
git clone https://github.com/Sarxina/obs_vn.git
cd obs_vn
```

OBS VN depends on [chatgod-js](https://github.com/Sarxina/chatgod-js), but you don't need to do anything special — it's installed automatically from npm when you run the project.

### 2. Add Your Images

- **Character images** → `src/frontend/public/characters/`
  - Expected size: **720×720 px**
  - Characters are cropped just above the waist, so make sure the important parts are in the upper half
- **Location/background images** → `src/frontend/public/locations/`
  - Expected size: **1920×1080 px**

### 3. Fill In Your Keys

Open the `.env` file in the root folder and fill in each value:

```
AZURE_TTS_KEY=your_azure_key_here
AZURE_TTS_REGION=your_azure_region_here
TWITCH_CLIENT_ID=your_client_id_here
TWITCH_CHANNEL_NAME=your_channel_name_here
TWITCH_ACCESS_TOKEN=your_access_token_here
TWITCH_REFRESH_TOKEN=your_refresh_token_here
BACKEND_PORT=5001
```

---

## Running OBS VN

```
npm run dev
```

This starts the app. The control panel is at:

```
http://localhost:3000/controls
```

---

## Setting Up in OBS

### Option A: No VTuber Model

Create a single **Browser Source** pointed at:

```
http://localhost:3000/display
```

Set it to **1920×1080**.

### Option B: With a VTuber Model

Create **two** Browser Sources, both set to **1920×1080**:

| Browser Source | URL | Layer |
|---|---|---|
| Behind model | `http://localhost:3000/behindmodel` | Below your model |
| In front of model | `http://localhost:3000/infrontofmodel` | Above your model |

This way the background sits behind your model and the dialogue box sits in front of it.

---

## Using the Control Panel

Open `http://localhost:3000/controls` in your browser while the app is running.

### Locations

- Click **Add Location** to create a new location entry
- Enter a name and the filename of the image (e.g. `classroom.jpg`)
- Select the radio button next to a location to make it the active background
- Click **Remove** to delete a location

### Characters

- Click **Add Character** to create a new character slot
- Enter a name and the filename of the character image (e.g. `mycharacter.png`)
- Check **In Scene** to make the character visible on screen
- The **Queue** section shows how many viewers are waiting
  - **Next** — hands off control to the next person in the queue (current chatter goes to the back)
  - **Remove** — removes the current chatter entirely and moves to the next person

### Choices

- Click **Add Choice** to add a voting option
- Edit the text for each choice
- Switch to **Choice Mode** to show the choices on screen and allow chat to vote
- Switch back to **Text Mode** to hide choices — votes reset automatically each time you switch modes
- The choice with the most votes is shown in real time

---

## Chat Commands

Viewers type these in your Twitch chat:

- `!howtojoin` — the bot will post instructions listing all available characters and their join commands
- `!joingod#` — join the queue for a character, where `#` is the character's number (e.g. `!joingod1`, `!joingod2`, etc.)
- `!voteChoice#` — vote for a choice when choices are on screen (e.g. `!voteChoice1`, `!voteChoice2`, etc.)

The numbers go up with however many characters or choices you've added in the control panel.
