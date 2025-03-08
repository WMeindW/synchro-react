import {useEffect, useRef} from 'react';
import {Timeline as VisTimeline} from 'vis-timeline/standalone';

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
    eventClick: (event: Item) => void;
    groups: Group[];
    items: Item[];
    timelineTime: Date
}

export default function CalendarTimeline({groups = [], items = [], eventClick, timelineTime}: Props) {
    const timelineRef = useRef<HTMLDivElement | null>(null);
    const timelineInstanceRef = useRef<VisTimeline | null>(null);

    useEffect(() => {
        if (timelineRef.current) {
            const options = {
                start: new Date(timelineTime.getTime()),  // Start of today
                end: new Date(timelineTime.getTime() + 24 * 60 * 60 * 1000),  // End of today
                width: '100%',
                height: '600px',
                stack: true,
                zoomable: false,
                margin: {
                    item: 10,
                },
            };
            timelineInstanceRef.current = new VisTimeline(timelineRef.current, items, groups, options);
            timelineInstanceRef.current.on('select', function (properties) {
                const selectedItemId = properties.items[0];
                const selectedItem = items.find(item => item.id === selectedItemId);

                if (selectedItem) {
                    eventClick(selectedItem);
                }
            });
        }
        return () => {
            if (timelineInstanceRef.current) {
                timelineInstanceRef.current.destroy();
            }
        };
    }, [groups, items, timelineTime]);

    return <div ref={timelineRef}/>;
}
