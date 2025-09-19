import { CharacterControl } from "@/components/controls/CharacterControl";
import { ChoiceControl } from "@/components/controls/ChoiceControl";
import { ConfigControl } from "@/components/controls/ConfigControl";
import { SceneControl } from "@/components/controls/SceneControl";
const ControlPage = () => {
	return (
		<main className="grid grid-cols-2 grid-rows-2 gap-4 h-screen w-full p-4 bg-neutral-900">
			<div className='border border-gray-500 p-2 rounded'><SceneControl /></div>
			<div className='border border-gray-500 p-2 rounded'><ChoiceControl /></div>
			<div className='border border-gray-500 p-2 rounded'><CharacterControl /></div>
			<div className='border border-gray-500 p-2 rounded'><ConfigControl /></div>
		</main>
	)
}
export default ControlPage;
