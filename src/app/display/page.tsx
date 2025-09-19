import { SceneDisplay } from "@/components/display/SceneDisplay";

const DisplayScreen = () => {
    return (
        <main
            className='fixed top-0 left-0 flex items-center justify-center bg-black'
            style={{ width: '1920px', height: '1080px' }}
        >

            <SceneDisplay bgImage="/defaultClassroom.jpg"/>
        </main>
    );
}

export default DisplayScreen;
