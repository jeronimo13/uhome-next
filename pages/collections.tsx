import {GetStaticProps} from "next";
import prisma from "../lib/prisma";

import React, {useState} from "react";
import Layout from "../components/Layout";


const callouts = [
    {
        name: 'Кухня',
        description: 'Все для втілення ваших кулінарних ідей',
        imageSrc: 'kitchen.jpg',
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '/products',
    },
    {
        name: 'Вітальня',
        description: 'Виєбони перед друзями',
        imageSrc: 'living_room.jpg',
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '/products',
    },
    {
        name: 'Сральня',
        description: 'Духовна рівновага в момент полегшання',
        imageSrc: 'toilet.jpg',
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/products',
    },
]

export default function Example() {
    return (
        <Layout>
            <div className="bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
                        <h2 className="text-4xl font-extrabold text-gray-900">Колекції</h2>

                        <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                            {callouts.map((callout) => (
                                <div key={callout.name} className="group relative">
                                    <div
                                        className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                        <img
                                            src={callout.imageSrc}
                                            alt={callout.imageAlt}
                                            className="w-full h-full object-center object-cover"
                                        />
                                    </div>
                                    <h3 className="mt-6 text-sm text-gray-500">
                                        <a href={callout.href}>
                                            <span className="absolute inset-0"/>
                                            {callout.name}
                                        </a>
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export const getStaticProps: GetStaticProps = async ({params}) => {
    const categories = await prisma.category.findMany({
        select: {
            name: true
        }
    })

    return {props: {categories}};
};