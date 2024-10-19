import CalendarTimeline from "./components/Timeline.tsx";
import CreateForm from "./components/CreateForm.tsx";

export default function App() {

    return (
        <>
            <div>
                <CreateForm/>
            </div>
            <div style={{height: '600px'}}>
                <CalendarTimeline groups={[]} items={[]}/>
            </div>
        </>
    );
};