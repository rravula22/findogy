import Link from 'next/link';

type Props = {}

export default function Header() {
    return (
        <header className="sticky text-white bg-black top-0 p-5 flex items-start justify-between max-w-full mx-auto z-20 xl:items-center">
            <div className="flex flex-grow-0 flex-shrink-0 items-center mx-20">
                <Link href="/">
                    <img src="/fetch.png" alt="Logo" className="w-10 h-10" />
                    <span className="text-xl font-bold">Fetch</span>
                </Link>
            </div>
            <div className="flex flex-grow-0 flex-shrink-0 items-center mx-20">
                <h1 className="text-6xl font-bold">
                    Welcome to <a className="text-blue-600">Dog Search</a>
                </h1>
            </div>
            <div className="flex flex-grow-0 flex-shrink-0 items-center mx-20">
                <Link href="/Login">
                    <span className="mr-2 text-xl font-bold ">Login</span>
                </Link>
                <Link href="/Login">
                    <span className="ml-2 text-xl font-bold">LogOut</span>
                </Link>
            </div>
        </header>
    )
}