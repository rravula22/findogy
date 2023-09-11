import { signOutUser } from '@/utils/service';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

type Props = {}

export default function Header() {
    const { data: session, status } = useSession();
    return (
        <header className="sticky bg-black bg-opacity-90 top-0 p-5 flex items-center justify-between max-w-full mx-auto z-20 xl:items-center">
            <div className="flex flex-grow-0 flex-shrink-0 items-center mx-20">
            <Link href="/">
                <img src="/fetch.png" alt="Logo" className="w-10 h-10" />
                <span className="text-xl font-bold text-white">Fetch</span>
            </Link>
            </div>
            <div className="flex flex-grow-0 flex-shrink-0 items-center mx-20">
            <h1 className="text-4xl font-bold text-white">
                Welcome to <a className="text-blue-600">Dog Search</a>
            </h1>
            </div>
            <div className="flex flex-grow-0 flex-shrink-0 items-center mx-20">
            {session ? (
                <button
                onClick={() => {
                    signOutUser();
                    signOut();
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                <Link href="/login">LogOut</Link>
                </button>
            ) : (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link href="/login">Login</Link>
                </button>
            )}
            </div>
        </header>
    )
}