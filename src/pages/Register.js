// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Layout from "./../components/Layout/Layout";
// import './styles.css'
// const  Register = () => {
//   const [users, setUsers] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const { username, email, password } = users;
//   const inputchange = (e) => {
//     console.log(e.target.value);
//     setUsers({ ...users, [e.target.name]: e.target.value });
//   };
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:2000/auth/register", users);
//   };
//   return (
//     <Layout>
//     <div className="registation">
//     <form onSubmit={(e) => onSubmit(e)} className="form">
//       <h3 className="headline">Register to LeetClone</h3>
//       <div>
//         <label htmlFor="email">Username</label>
//         <input
//           type="text"
//           placeholder="enter username"
//           name="username"
//           value={username}
//           className="form-control"
//           onChange={(e) => inputchange(e)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Your Email</label>
//         <input
//           type="text"
//           placeholder="enter email"
//           name="email"
//           value={email}
//           className="form-control"
//           onChange={(e) => inputchange(e)}
//           required
//         />
//       </div>
      
//       <div>
//         <label>password</label>

//         <input
//           type="text"
//           className="form-control"
//           placeholder="enter password"
//           name="password"
//           value={password}
//           onChange={(e) => inputchange(e)}
//           required
//         />
//       </div>
//       <button type="submit" className='btn'>Register</button>
//       <div className=''>
// 				Already have an account?{" "}
// 				{/* <a href='#' className="">
// 					Log In
// 				</a> */}
//           <Link to={`/Login`}>Log In</Link>
          
// 			</div>
//     </form>
//     </div>
//     </Layout>
//   );
// };

// export default Register;





import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from './FormContainer';
import Loader from './Loader';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Layout from "./../components/Layout/Layout";
const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Layout>
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Register
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
    </Layout>
  );
};

export default RegisterScreen;
