export default function Bubble(props) {
    return (
        <div
            className={`${props.classes} rounded-lg border shadow-lg
    px-4 py-6 
    mt-6 
    sm:p-6
    lg:p-10
    `}
        >
            {props.children}
        </div>
    );
}
