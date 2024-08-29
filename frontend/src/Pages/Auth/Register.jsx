import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Header from "../Header";

export default function Register() {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({});

    async function handleRegister(e) {
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "post",
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/login");
        }
    }

    return (
        <>
            <Header />
            {/* {token} */}
            <div className="flex items-center justify-center mt-10">
                <form
                    onSubmit={handleRegister}
                    className="p-8 bg-white rounded-lg shadow-md shadow-2xl w-96"
                >
                    <h2 className="mb-4 text-2xl font-bold text-center">
                        Register here
                    </h2>
                    <div className="mb-2">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full p-2 border border-gray-300"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                        />
                        {errors.name && (
                            <p className="error">{errors.name[0]}</p>
                        )}
                    </div>

                    <div className="mb-2">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="text"
                            placeholder="Email"
                            className="w-full p-2 border border-gray-300"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />
                        {errors.email && (
                            <p className="error">{errors.email[0]}</p>
                        )}
                    </div>

                    <div className="mb-2">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 border border-gray-300"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                        {errors.password && (
                            <p className="error">{errors.password[0]}</p>
                        )}
                    </div>

                    <div className="mb-2">
                        <label className="block text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full p-2 border border-gray-300"
                            value={formData.password_confirmation}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password_confirmation: e.target.value,
                                })
                            }
                        />
                    </div>

                    <button className="w-full p-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        Register
                    </button>
                    Already have an acccount ?<Link to="/login">login Now</Link>
                </form>
            </div>
        </>
    );
}
