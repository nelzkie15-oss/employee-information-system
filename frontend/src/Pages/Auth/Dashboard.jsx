import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
//import Notfound from './../Notfound';
import { Link} from "react-router-dom";

const Dashboard = () => {

    const [setData] = useState(null);
    const [setMessage] = useState('');
    const [counts, setCounts] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get("api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(response.data.email); //email near in logout
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        const timeoutId = setTimeout(() => {
            setMessage(fetchData());

            return () => clearTimeout(timeoutId);

        }, 100);

        fetchData();
    }, []);

      //count my employees
      async function fetchEmployeeCount() {
            const sessionId = localStorage.getItem('user_id');
            const res = await fetch("/api/count", {
                method: "post",
                headers: {
                    'X-Session-ID': sessionId,  // Pass session ID in employee header
                },
                withCredentials: true,
            });

            const data = await res.json();
            console.log('Employee Count:', data.count);

            if (res.ok) {
                setCounts(data.count);
            }
        }

        useEffect(() => {
            fetchEmployeeCount();
    }, []);

     //end count my employees

    return (
        <>
            <Header />
         <div className="gap-1 row">
            <div className="col-md-3">
            <aside id="logo-sidebar" className="left-0 w-64 h-screen pt-10 transition-transform -translate-x-full bg-white border-r border-gray-200 top-30 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="">
                    <ul className="">
                        <li>
                            <a href="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>

                        <li>
                            <Link  to="/employee" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Employee</span>
                            </Link>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Attendance Details</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Salary Details</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Loan Details</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.5 11H5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h4.5M7 11V7a3 3 0 0 1 6 0v1.5m2.5 5.5v1.5l1 1m3.5-1a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Account</span>
                            </a>
                        </li>

                    </ul>
                </div>
               </aside>
               </div>
                <div className="col-md-7">
                  <div className="mt-3 row">

                     <div className="col-lg-3">
                         <div className="card" style={{ "height":"100px", "width": "100%", "marginTop":"10%" }}>
                            <div className="card-body">
                                <h6>Count Employee</h6>
                                <p className="text-lg text-center"><strong>{counts}</strong></p>
                            </div>
                        </div>
                     </div>

                     <div className="col-lg-3">
                         <div className="card" style={{ "height":"100px", "width": "100%", "marginTop":"10%" }}>
                            <div className="card-body">
                              <h6>Count Attendance</h6>
                               <p className="text-lg text-center"><strong>0</strong></p>
                            </div>
                        </div>
                     </div>


                     <div className="col-lg-3">
                         <div className="card" style={{ "height":"100px", "width": "100%", "marginTop":"10%" }}>
                            <div className="card-body">
                               <h6>Total Absent</h6>
                               <p className="text-lg text-center"><strong>0</strong></p>
                            </div>
                        </div>
                     </div>

                     <div className="col-lg-3">
                         <div className="card" style={{ "height":"100px", "width": "100%", "marginTop":"10%" }}>
                            <div className="card-body">
                               <h6>Loan Amount</h6>
                               <p className="text-lg text-center"><strong>0</strong></p>
                            </div>
                        </div>
                     </div>


                     </div>
                  </div>
            </div>
        </>
    );
};

export default Dashboard;
