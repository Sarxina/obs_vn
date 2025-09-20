import { CharacterDisplay } from "@/components/display/characters/CharacterDisplay";
import { SceneDisplay } from "@/components/display/SceneDisplay";

const DisplayScreen = () => {
    return (
        <main
            className="relative w-[1920px] h-[1080px] overflow-hidden"
            style={{ width: '1920px', height: '1080px' }}
        >
            <SceneDisplay bgImage="/defaultClassroom.jpg"/>
            <CharacterDisplay />
        </main>
    );
}

export default DisplayScreen;
