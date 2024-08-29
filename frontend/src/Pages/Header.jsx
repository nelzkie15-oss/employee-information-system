import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {

    const [data, setData] = useState(null);


    async function handleLogout(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const res = await fetch("/api/logout", {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            localStorage.removeItem("token");
            toast.success("Add Employee successfully");
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);

        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get("api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(response.data.email);
                setData(response.data.name);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    return (

         <header>
                <nav>
                    {data ? (
                        <div className="mt-3 space-x-3">
                        <Link to="/" className="nav-link text-light">
                            Employee Management System
                        </Link>
                        </div>
                        ) : (
                        <div className="mt-3 space-x-3">
                            <Link to="/" className="nav-link text-light">
                                Home
                            </Link>
                        </div>
                    )}

                    {data ? (

                        <div className="flex items-center space-x-4">

                            <p className="mt-3 text-xs text-slate-400">
                                Welcome back!,{" "}
                                <span style={{ "color": "rgb(245 158 11)","textTransform": "capitalize" }}> {JSON.stringify(data).replace(/"/g, "")}</span>
                            </p>
                            <form onSubmit={handleLogout}>
                                <button className="nav-link text-light">Logout</button>
                            </form>
                        </div>
                    ) : (
                        <>
                        {/* <div className="">
                          <Link  to="/login" className="p-2 nav-item nav-link" style={{ "backgroundColor": "#e85c29" }}>login</Link>
                        </div> */}
                        </>
                    )}
                </nav>
            </header>

    );
}
