import '../styles/globals.css';
import {SessionProvider} from 'next-auth/react';
import {ReactNotifications} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {QueryClientProvider} from 'react-query';
import queryClient from '../mutations/queryClient';

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
                <div className={'app-container'}>
                    <ReactNotifications />
                    <Component {...pageProps} />
                </div>
            </SessionProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
