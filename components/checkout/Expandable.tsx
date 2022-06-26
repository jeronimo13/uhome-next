import {useEffect, useState} from 'react';
import Bubble from './Bubble';

interface IExpandable {
    isExpanded: boolean;
    onTriggerExpanded: (expanded: boolean) => void;
    expandedContent: JSX.Element;
    collapsedContent: JSX.Element;
}
export default function Expandable(props: IExpandable & any) {
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        setExpanded(props.isExpanded);
    }, [props.isExpanded]);

    const trigger = () => {
        setExpanded(!expanded);
        props.onTriggerExpanded && props.onTriggerExpanded(!expanded);
    };

    return (
        <Bubble classes={expanded ? 'bg-white' : 'text-gray-600'}>
            <div>{expanded ? props.expandedContent : props.collapsedContent}</div>
            <div className={'text-center mt-4'}>
                {expanded ? (
                    <button className={'bg-indigo-600 p-3 rounded text-white w-64'} onClick={trigger}>
                        Продовжити замовлення
                    </button>
                ) : (
                    <button className={'border border-indigo-600 text-indigo-600 p-3 rounded text-white w-64'} onClick={trigger}>
                        Змінити
                    </button>
                )}
            </div>
        </Bubble>
    );
}
