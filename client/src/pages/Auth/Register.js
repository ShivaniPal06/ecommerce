import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import "../../styles/AuthStyles.css";

const Register = () => {
    //first value in the array is getter and the second value is setter
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    //form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                '/api/v1/auth/register',
                { name, email, password, phone, address, answer }
            );
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Register-Ecommerce App"}>
            <div className='form-container' style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4>Registration Form</h4>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName" placeholder="Enter Your Name" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail" className="form-label">Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder="Enter Your Email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword" className="form-label">Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword" placeholder="Enter Your Password" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPhone" className="form-label">Phone:</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" placeholder="Enter Your Phone no." required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAddress" className="form-label">Address:</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder="Enter Your Address" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAddress" className="form-label">Answer:</label>
                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputAnswer" placeholder="What is Your Favourite sports ?" required />
                    </div>
                    <button type="submit" className="btn btn-primary">REGISTER</button>
                </form>

            </div>
        </Layout>
    )
};

export default Register;