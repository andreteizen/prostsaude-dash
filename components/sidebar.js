import React from 'react'
import {SidebarData} from './SidebarData.js'
import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react";

function Sidebar() {
    const router = useRouter();

    return (
        <div className="Sidebar">
            <ul className="SidebarList d-flex flex-row flex-wrap justify-content-center">
                <li className="py-5">
                    <Link className="py-5" href="/nf">
                        <a style={{ fontSize: '2rem', color: 'white'}}>
                            Logo
                        </a>
                    </Link>
                </li>
                {SidebarData.map((val, key) => {
                    return (
                        <li
                            key={key}
                            className="NavRow"
                            id={router.pathname === val.link ? "active" : ""}
                            onClick={() => {
                                router.push(val.link);
                            }}>
                            {" "}
                            <div className={router.pathname === val.link ? "SidebarChosen" : "d-none"}></div>
                            <div id="icon">{val.icon}</div> <div id="title">{val.title}</div>
                        </li>
                    );
                })}
            </ul>
            <ul className="SidebarList d-flex flex-row flex-wrap justify-content-center">
                <li
                    className="NavRow"
                    onClick={() => signOut()}>
                    {" "}
                    <div id="icon">{}</div> <div id="title">Logout</div>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar