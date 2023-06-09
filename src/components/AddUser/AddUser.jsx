import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {
    const [gender, setGender] = useState(null)
    const [status, setStatus] = useState(null)

    const handleAddUser = (event) => {
        event.preventDefault()

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;

        const user = { name, email, gender, status }

        fetch('http://localhost:5000/add-user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire(
                        'Added!',
                        'Successfully added a new user.',
                        'success'
                    )
                    form.reset()
                }
            })
    }

    return (
        <div className='my-5 w-75 mx-auto'>
            <Link to='/'><p className='px-3 py-2 text-info fw-semibold rounded border shadow-sm d-inline-block'>All Users</p></Link>
            <div className="text-center my-3">
                <h3>New User</h3>
                <p>Use the below form to create a new user</p>
            </div>
            <form onSubmit={handleAddUser} className="w-75 mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="w-100 mb-2 fw-semibold">Name</label>
                    <input type="text" name="name" id="name" className="w-100 border p-2 rounded" placeholder="You name" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="w-100 mb-2 fw-semibold">Email</label>
                    <input type="email" name="email" id="email" className="w-100 border p-2 rounded" placeholder="You email" required />
                </div>
                <div className="mb-4">
                    <span className="fw-semibold me-3">Gender</span>
                    <input type="radio" name="gender" id="male" className="ms-4 me-1" onChange={() => setGender("male")} />
                    <label htmlFor="male" className="mb-2 fw-semibold">Male</label>

                    <input type="radio" name="gender" id="female" className="ms-4 me-1" onChange={() => setGender("female")} />
                    <label htmlFor="female" className="mb-2 fw-semibold">Female</label>
                </div>
                <div className="mb-4">
                    <span className="fw-semibold me-3">Status</span>
                    <input type="radio" name="status" id="active" className="ms-4 me-1" onChange={() => setStatus("active")} />
                    <label htmlFor="active" className="mb-2 fw-semibold">Active</label>

                    <input type="radio" name="status" id="inactive" className="ms-4 me-1" onChange={() => setStatus("inactive")} />
                    <label htmlFor="inactive" className="mb-2 fw-semibold">Inactive</label>
                </div>
                <input type="submit" value="Add User" className="bg-info w-100 py-2 px-3 border-0 fw-semibold rounded" />
            </form>
        </div>
    );
};

export default AddUser;