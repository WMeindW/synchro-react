import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';

interface Props {
    groups: [],
    items: []
}

export default function CalendarTimeline(props: Props) {

    return (
        <div style={{height: '600px'}}>
            <Timeline
                groups={props.groups}
                items={props.items}
                defaultTimeStart={new Date(new Date().setHours(0, 0, 0, 0))} // Start of today
                defaultTimeEnd={new Date(new Date().setHours(23, 59, 59, 999))} // End of today
                sidebarWidth={150}
                // You can also customize the time label component if needed
            />
        </div>
    );
};