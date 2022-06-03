import {signIn, signOut, useSession} from 'next-auth/react';
import Layout from '../components/Layout';
import TwoColumn from '../components/TwoColumn';

const UserComponent = () => {
    const {data: session} = useSession();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get data from the form.

        console.log(Object.keys(event.target));

        const data = {
            email: event.target.email.value || undefined,
            firstName: event.target.firstName.value || undefined,
            lastName: event.target.lastName.value || undefined,
            phoneNumber: event.target.phoneNumber.value || undefined,
        };
        const JSONdata = JSON.stringify(data);
        const endpoint = '/api/user';

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        };

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options);

        const json = await response.json();
        console.log(json);

        session.user.email = json.email;
    };

    if (session) {
        return (
            <>
                <div className={'p-6'}>
                    <div>
                        <a href="/user/orders" className="">
                            Закази
                        </a>
                        <hr />
                        <button onClick={() => signOut({callbackUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/`})}>Вийти</button>
                    </div>
                    <div className="hidden sm:block" aria-hidden="true">
                        <div className="py-5">
                            <div className="border-t border-gray-200" />
                        </div>
                    </div>

                    <TwoColumn title={'Персональна інформація'}>
                        <form onSubmit={handleSubmit}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                Імʼя
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                placeholder={session.user.firstName || 'Імʼя'}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Прізвище
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                placeholder={session.user.lastName || 'Прізвище'}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email адреса
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                autoComplete="email"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                placeholder={session.user.email}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                                Номер телефону
                                            </label>
                                            <input
                                                type="text"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                autoComplete="phone"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                placeholder={session.user.phoneNumber}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Зберегти
                                    </button>
                                </div>
                            </div>
                        </form>
                    </TwoColumn>

                    <div className="hidden sm:block" aria-hidden="true">
                        <div className="py-5">
                            <div className="border-t border-gray-200" />
                        </div>
                    </div>

                    <TwoColumn title={'Мої адреси'}>
                        <form>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6">
                                            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                                                Вулиця
                                            </label>
                                            <input
                                                type="text"
                                                name="street"
                                                id="street"
                                                autoComplete="street-address"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                Місто
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                autoComplete="address-level2"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                                Область
                                            </label>
                                            <input
                                                type="text"
                                                name="region"
                                                id="region"
                                                autoComplete="address-level1"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                                Поштовий індекс
                                            </label>
                                            <input
                                                type="text"
                                                name="postalCode"
                                                id="postalCode"
                                                autoComplete="postal-code"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Зберегти
                                    </button>
                                </div>
                            </div>
                        </form>
                    </TwoColumn>

                    <div className="hidden sm:block" aria-hidden="true">
                        <div className="py-5">
                            <div className="border-t border-gray-200" />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
};

export default function User() {
    return (
        <Layout>
            <UserComponent />
        </Layout>
    );
}
