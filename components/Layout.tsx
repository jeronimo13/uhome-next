import Header from "./Header";
import Footer from "./Footer";

export default function Layout(props) {
    return (
        <div className="flex flex-col h-screen justify-between">
            <Header/>
            {props.children}
            <Footer/>
        </div>
    )
}