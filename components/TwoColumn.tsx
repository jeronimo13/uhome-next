export default function Layout(props) {
    return (
        <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">{props.title}</h3>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">{props.children}</div>
            </div>
        </div>
    );
}
