import loginHandler from "../pages/api/login"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setEmail(foundUser.email);
            setName(foundUser.name);
        }
    }, []);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginHandler(email, name).then((res) => {
            if (res.status === 200 && !res.error) {
                localStorage.setItem("user", JSON.stringify({name, email}));
                router.push("/dashboard");
            }
        });
    };

    return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 py-6 w-1/4">
              <h2 className="text-2xl font-bold mb-6">Login</h2>
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    LogIn
                  </button>
                </div>
              </form>
            </div>
          </div>
    );
}

export default Login;