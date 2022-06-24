export default function Bubble(props) {
    return <div className={`${props.classes} rounded-xl border shadow-lg p-5 mt-5`}>{props.children}</div>;
}