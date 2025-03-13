import {useEffect, useRef} from 'react';
import {Timeline as VisTimeline, DataSet} from 'vis-timeline/standalone';

interface Group {
    id: number;
    content: string;
}

interface Item {
    id: number;
    group: number;
    content: string;
    start: Date;
    end: Date;
    attendance:boolean;
}

interface Props {
    eventClick: (id: Item) => void;
    groups: Group[];
    items: Item[];
    timelineTime: Date
}

export default function CalendarTimeline({groups = [], items = [], eventClick, timelineTime}: Props) {
    const timelineRef = useRef<HTMLDivElement | null>(null);
    const timelineInstanceRef = useRef<VisTimeline | null>(null);
    const itemsDataSetRef = useRef(new DataSet<Item>(items));
    const groupsDataSetRef = useRef(new DataSet<Group>(groups));
    useEffect(() => {
        if (timelineRef.current) {
            const options = {
                start: new Date(timelineTime.getTime()),
                end: new Date(timelineTime.getTime() + 24 * 60 * 60 * 1000),
                width: '100%',
                height: '600px',
                stack: true,
                zoomable: false,
                moveable: false,
                margin: {
                    item: 10,
                },
            };
            timelineInstanceRef.current = new VisTimeline(timelineRef.current, itemsDataSetRef.current, groupsDataSetRef.current, options);
            timelineInstanceRef.current.on('select', function (properties) {
                const selectedItemId = properties.items[0];
                const selectedItem = itemsDataSetRef.current.get().find(item => item.id === selectedItemId)
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
    }, []);
    useEffect(() => {
        if (timelineInstanceRef.current) {
            timelineInstanceRef.current.setWindow(
                new Date(timelineTime.getTime()),
                new Date(timelineTime.getTime() + 24 * 60 * 60 * 1000)
            );
        }
        itemsDataSetRef.current.clear();
        groupsDataSetRef.current.clear();
        itemsDataSetRef.current.update(items);
        groupsDataSetRef.current.update(groups);
    }, [items, groups, timelineTime]);

    return <div ref={timelineRef}/>;
}
