import { ChatWatch } from "@/components/ChatWatch";
import { ChoiceView } from "@/components/ChoiceView";
import { CurrentState } from "@/components/CurrentState";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/**Left Panel */}
      <section>
        {/** Save /Load */}
        <header>
          <button>Save</button>
          <button>Load</button>
        </header>

        <CurrentState />
        <ChoiceView />
      </section>

      {/** Right panel = Scene Tree / JSON */}
      <aside>
        <h2>Scene List</h2>
        <pre>
          Placeholder
        </pre>
      </aside>
    </main>
  );
}
