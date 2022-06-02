import prisma from '../../lib/prisma';
import {GetStaticPaths, GetStaticProps} from "next";


export default function User(props) {
    console.log(props)
    return <div>
        User:
        {' ' + props.user.email}
    </div>
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const user = await prisma.user.findUnique({
        where: {id: String(params?.id)},
        select: {
            email: true
        }
    });

    return {props: {user}};
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}