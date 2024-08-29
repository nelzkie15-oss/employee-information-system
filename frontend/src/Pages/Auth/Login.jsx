import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.get("/sanctum/csrf-cookie");
            const response = await axios.post("/api/login", {
                email,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem('user_id', response.data.user_id);
                console.log("Token:", response.data.access_token);
                localStorage.setItem("token", response.data.access_token);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else if (error.response && error.response.status === 401) {
                setErrorMessage("Invalid login credentials");
            } else {
                setErrorMessage("Something went wrong.");
            }
        }
    };

    return (
        <>
            <Header />
            <div className="flex items-center justify-center mt-20">
                <form
                    className="p-8 bg-white rounded-lg shadow-md shadow-2xl w-96"
                    onSubmit={handleLogin}
                >
                    <h2 className="mb-6 text-2xl font-bold text-center">
                        Login here
                    </h2>
                    {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-2 border ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded mt-1`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email[0]}
                            </p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full p-2 border ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded mt-1`}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password[0]}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>

                    Not a member ?<Link to="/register">Signup Now</Link>
                </form>
            </div>
        </>
    );
};

export default Login;
