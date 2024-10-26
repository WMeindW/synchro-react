import {useEffect, useRef} from 'react';
import {Timeline as VisTimeline} from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';

interface Group {
    id: number;
    content: string;  // Vis.js expects "content" instead of "title"
}

interface Item {
    id: number;
    group: number;
    content: string;  // Vis.js expects "content" instead of "title"
    start: Date;
    end: Date;
}

interface Props {
    eventClick : (event: Item) => void;
    groups: Group[];
    items: Item[];
}

export default function CalendarTimeline({groups = [], items = [], eventClick}: Props) {
    const timelineRef = useRef<HTMLDivElement | null>(null);
    const timelineInstanceRef = useRef<VisTimeline | null>(null);

    useEffect(() => {
        if (timelineRef.current) {
            const options = {
                start: new Date(new Date().setHours(0, 0, 0, 0)),  // Start of today
                end: new Date(new Date().setHours(23, 59, 59, 999)),  // End of today
                width: '100%',
                height: '600px',
                stack: true,
                margin: {
                    item: 10,
                },
            };

            // Initialize the Vis.js Timeline
            timelineInstanceRef.current = new VisTimeline(timelineRef.current, items, groups, options);
            // Event listener for 'select' event (triggered when an item is clicked)
            timelineInstanceRef.current.on('select', function (properties) {
                const selectedItemId = properties.items[0];  // Get the ID of the selected item
                const selectedItem = items.find(item => item.id === selectedItemId);

                if (selectedItem) {
                    eventClick(selectedItem);
                }
            });
        }

        return () => {
            // Clean up the timeline instance when the component unmounts
            if (timelineInstanceRef.current) {
                timelineInstanceRef.current.destroy();
            }
        };
    }, [groups, items]);

    return <div ref={timelineRef}/>;
}
