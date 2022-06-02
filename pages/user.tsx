import {signIn, signOut, useSession} from "next-auth/react";
import Layout from "../components/Layout";


const UserComponent = ()=> {
    const {data: session} = useSession()

    if(session){
        return <div>{session.user.name}:  {session.user.email}: <img src={session.user.image} alt=""/>
            <a href="/user/orders" className="">Закази</a>
            <hr/>
            <button onClick={() => signOut()}>Sign out</button>
            <hr/>
        </div>


    }

    return (
        <>
            Not signed in <br/>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}

export default function User() {
    return <Layout>
        <UserComponent/>
    </Layout>

}