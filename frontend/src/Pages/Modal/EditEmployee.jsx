import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditEmployee({ id }) {
  const [emp, setEmp] = useState({
         employee_name: '',
         employeeId: '',
         branch: 'branch',
         designation: 'designation',
         availability: 'availability',
         status: 'status'
     });
  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      axios.get(`/api/employee/${id}`).then((response) => {
        setEmp(response.data);
      });

    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmp({ ...emp, [name]: value });
  };

  async function handleUpdate(e) {
    e.preventDefault();

    const res = await fetch(`/api/employee/${id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(emp),
    });

    const data = await res.json();

    console.log(data);

    if (data.errors) {
      setErrors(data.errors);
    } else {
        toast.success("Updated Employee successfully");
        setTimeout(() => {
            window.location.href = "/employee";
            //navigate("/employee");
        }, 1500);
    }
  }

  return (
    <div className="modal fade" id="editemployeeModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Edit Employee</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form onSubmit={handleUpdate}  method="POST">
        <div className="modal-body">
          <div className="row">
              <div className="col-lg-6">
                  <div className="mb-2">
                      <label htmlFor="employeeName" className="form-label">Employee Name</label>
                      <input type="text"
                      className="form-control"
                      id="employee_name"
                      name="employee_name"
                      value={emp.employee_name}
                      onChange={handleInputChange}
                       aria-describedby="emailHelp"
                     />
                  </div>

              </div>
              <div className="col-lg-6">
                  <div className="mb-2">
                      <label htmlFor="employeeId" className="form-label">Employee ID</label>
                      <input type="text"
                       className="form-control"
                        id="employeeId"
                        name="employeeId"
                        value={emp.employeeId}
                        onChange={handleInputChange}
                         />
                  </div>

              </div>
          </div>
          <div className="row">
              <div className="col-lg-6">
                  <div className="mb-2">
                      <label htmlFor="branch" className="form-label">Branch</label>
                      <input type="text"
                       className="form-control"
                        id="branch"
                        name="branch"
                        value={emp.branch}
                        onChange={handleInputChange}
                         aria-describedby="emailHelp"
                       />
                  </div>

              </div>
              <div className="col-lg-6">
                  <div className="mb-2">
                      <label htmlFor="designation" className="form-label">Designation</label>
                      <input type="text"
                       className="form-control"
                        id="designation"
                        name="designation"
                        value={emp.designation}
                        onChange={handleInputChange}
                         />
                  </div>
              </div>
          </div>

          <div className="row">
              <div className="col-lg-6">
                  <div className="mb-2">
                      <label htmlFor="availability" className="form-label">Availability</label>
                      <input type="text"
                       className="form-control"
                        id="availability"
                        name="availability"
                        value={emp.availability}
                        onChange={handleInputChange}
                         aria-describedby="emailHelp" />
                  </div>
              </div>
              <div className="col-lg-6">
                  <div className="mb-2">
                      <label htmlFor="status" className="form-label">Status</label>
                      <input type="text"
                       className="form-control"
                        id="status"
                        name="status"
                        value={emp.status}
                        onChange={handleInputChange}
                      />
                  </div>

              </div>
          </div>

        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button className="btn btn-primary">Update</button>
        </div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default EditEmployee;
