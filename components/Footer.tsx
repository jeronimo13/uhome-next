export default function Footer() {
    return <footer
        className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://uhome.com"
                                                                                        className="hover:underline">UHome</a>. All Rights Reserved.
    </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">Про нас</a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">Політика конфеденційності</a>
            </li>
            <li>
                <a href="#" className="hover:underline">Контакти</a>
            </li>
        </ul>
    </footer>
}