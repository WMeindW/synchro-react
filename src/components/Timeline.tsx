import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';

interface Props {
    groups: never[], // Specify the type or use `any[]` to represent an array
    items: never[]  // Specify the type or use `any[]`
}

// Define default values for the `groups` and `items` parameters
export default function CalendarTimeline({ groups = [], items = [] }: Props) {

    return (
        <div style={{ height: '600px' }}>
            <Timeline
                groups={groups}
                items={items}
                defaultTimeStart={new Date(new Date().setHours(0, 0, 0, 0))} // Start of today
                defaultTimeEnd={new Date(new Date().setHours(23, 59, 59, 999))} // End of today
                sidebarWidth={150}
            />
        </div>
    );
};