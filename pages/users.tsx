import {GetStaticProps} from "next";
import prisma from "../lib/prisma";
import Link from "next/link";


export default function Users(props) {
    return <div>
        {props.users.map((user, index) => {
            return <div key={index + 1}>
                <Link href={'/users/' + user.id}>{user.email}</Link>
            </div>
        })}
    </div>
}


export const getStaticProps: GetStaticProps = async ({params}) => {
    const users = await prisma.user.findMany({
        select: {
            email: true,
            id: true
        }
    })

    return {
        props: {users}
    }
}