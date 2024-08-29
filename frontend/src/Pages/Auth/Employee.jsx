import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import { Link} from "react-router-dom";
import AddEmployee from "../Modal/AddEmployee";
import { Pagination } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditEmployee from "../Modal/EditEmployee";

const Employee = () => {

    const [setData] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);


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

        fetchData();
    }, []);


     async function getEmployees() {
            const sessionId = localStorage.getItem('user_id');
            const res = await fetch("/api/employee", {
                headers: {
                    'X-Session-ID': sessionId,  // Pass session ID in employee header
                },
                withCredentials: true,
            });

            const data = await res.json();

            if (res.ok) {
                setEmployees(data);
            }
        }

         useEffect(() => {
            getEmployees();
     }, []);


     useEffect(() => {
        // Retrieve data from localStorage
        const storedData = localStorage.getItem('user_id');
        if (storedData) {
            setEmployees(JSON.parse(storedData));
        }
    }, []);


    useEffect(() => {
        const fetchPosts = async () => {
            const sessionId = localStorage.getItem('user_id');
            try {
                const response = await axios.get('/api/employee', {
                    params: {
                        page: currentPage,
                        per_page: perPage
                    },
                    headers: {
                        'X-Session-ID': sessionId,  // Pass session ID in employee header
                    },
                    withCredentials: true // Ensure cookies are sent with requests
                });
                setEmployees(response.data.data); // Assuming your API returns data in 'data' property
                setTotalPages(response.data.last_page); // Total number of pages

            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [currentPage, perPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEditClick = (employee) => {
        setSelectedItemId(employee);
        setShowModal(true);
      };

      const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItemId(null);
      };
 //end get all employees
    return (
        <>
            <Header />
            <ToastContainer />
            <div className="grid grid-cols-4 gap-4">
                <div>
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
                <div>

                 <div className="grid grid-flow-col mt-3">
                    {/* <div className="object-position: left">Employee Information</div> */}
                  <div className="object-position: right;">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#addemployeeModal" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add Employee</button>
                   <AddEmployee/>
                 </div>
                </div>
                    <table id="customers" className="mt-4 text-gray-500 dark:text-gray-400">
                        <thead>
                        <tr>
                            {/* <th>Created By</th> */}
                            <th>Employee Name</th>
                            <th>Employee ID</th>
                            <th>Branch</th>
                            <th>Designation</th>
                            <th>Availability</th>
                            <th>status</th>
                            <th>Date Created</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                         <tbody>
                          {employees.length > 0 ? (employees.map(employee => (
                               <tr key={employee.id}>
                                 {/* <td>{employee.user_id}</td> */}
                               <td>{employee.employee_name}</td>
                               <td>{employee.employeeId}</td>
                               <td>{employee.branch}</td>
                               <td>{employee.designation}</td>
                               <td>{employee.availability}</td>
                               <td>{employee.status}</td>
                               <td> {new Date(employee.created_at).toLocaleTimeString()}</td>
                               <td className="px-6">
                                <Link href="javaScript:void(0)"  onClick={() => handleEditClick(employee.id)}  data-bs-toggle="modal" data-bs-target="#editemployeeModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                    <EditEmployee
                                     id={selectedItemId}
                                     show={showModal}
                                     handleClose={handleCloseModal}
                                    />

                            </td>
                           </tr>
                          ))
                        ) : (
                          <p>There are no employees</p>
                        )}
                        </tbody>
                    </table>

                    <Pagination>
                <Pagination.Prev
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={currentPage === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>

                </div>
            </div>

        </>
    );
};


export default Employee;
