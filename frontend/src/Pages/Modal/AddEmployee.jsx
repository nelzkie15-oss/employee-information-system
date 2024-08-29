import {  useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import loading from "../components/images/ajax-loader.gif";

export default function AddEmployee() {

    //const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employee_name: "",
        employeeId: "",
        branch: "",
        designation: "",
        availability: "",
        status: ""
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem("token");

    async function handleEmployee(e) {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/employee", {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
          setErrors(data.errors);
          setLoading(false);
        } else {
            toast.success("Add Employee successfully");
            setTimeout(() => {
                window.location.href = "/employee";
                //navigate("/employee");
            }, 1500);

        }
      }

  return (
        <div className="modal fade" id="addemployeeModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Employee</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleEmployee} method="POST">
            <div className="modal-body">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="mb-2">
                            <label htmlFor="employeeName" className="form-label">Employee Name</label>
                            <input type="text"
                            className="form-control"
                            id="employee_name"
                            value={formData.employee_name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    employee_name: e.target.value,
                                })
                            }
                            aria-describedby="emailHelp"
                        />
                        </div>
                        {errors.employee_name && (
                                    <p className="error">{errors.employee_name[0]}</p>
                                )}
                    </div>
                    <div className="col-lg-6">
                        <div className="mb-2">
                            <label htmlFor="employeeId" className="form-label">Employee ID</label>
                            <input type="text"
                            className="form-control"
                            id="employeeId"
                            value={formData.employeeId}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    employeeId: e.target.value,
                                })
                            }
                            />
                        </div>
                        {errors.employeeId && (
                                    <p className="error">{errors.employeeId[0]}</p>
                                )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="mb-2">
                            <label htmlFor="branch" className="form-label">Branch</label>
                            <input type="text"
                            className="form-control"
                            id="branch"
                            value={formData.branch}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    branch: e.target.value,
                                })
                            }
                            aria-describedby="emailHelp"
                            />
                        </div>
                        {errors.branch && (
                                    <p className="error">{errors.branch[0]}</p>
                                )}
                    </div>
                    <div className="col-lg-6">
                        <div className="mb-2">
                            <label htmlFor="designation" className="form-label">Designation</label>
                            <input type="text"
                            className="form-control"
                            id="designation"
                            value={formData.designation}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    designation: e.target.value,
                                })
                            }
                            />
                        </div>
                        {errors.designation && (
                                    <p className="error">{errors.designation[0]}</p>
                                )}
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="mb-2">
                            <label htmlFor="availability" className="form-label">Availability</label>
                            <input type="text"
                            className="form-control"
                            id="availability"
                            value={formData.availability}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    availability: e.target.value,
                                })
                            }
                            aria-describedby="emailHelp" />
                        </div>
                        {errors.availability && (
                                    <p className="error">{errors.availability[0]}</p>
                                )}
                    </div>
                    <div className="col-lg-6">
                        <div className="mb-2">
                            <label htmlFor="status" className="form-label">Status</label>
                            <input type="text"
                            className="form-control"
                            id="status"
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    status: e.target.value,
                                })
                            }
                            />
                        </div>
                        {errors.status && (
                                    <p className="error">{errors.status[0]}</p>
                                )}
                    </div>
                </div>

            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button className="btn btn-primary" disabled={loading}>
                {loading ? <LoadingIcon /> : 'Submit'}
                </button>
            </div>
            </form>
            </div>
        </div>
        </div>


  )
}

const LoadingIcon = () => (
    <div className="loading-spinner">
        Loading...
</div>
);

