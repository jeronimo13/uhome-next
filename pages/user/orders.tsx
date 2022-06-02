import Layout from "../../components/Layout";
import {useSession} from "next-auth/react";

export default function Orders(){
    const {data: session, status} = useSession()

    if(status === 'loading') return <div>Loading</div>
    return <Layout>

    </Layout>

}