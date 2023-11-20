// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import './styles.css'
// import Layout from "./../components/Layout/Layout";
// const Login = () => {
//   const [users, setUsers] = useState({
//     email: "",
//     password: "",
//   });
//   const { email, password } = users;
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
//       <h3 className="headline">Sign in to reastorent</h3>
//       {/* <div>
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
//       </div> */}
//       <div>
//         <label htmlFor="email">Email</label>
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
//       <button type="submit" className='btn'>Login</button>
//       <div className=''>
//    Create an account {" "}
// 				{/* <a href='#' className="">
// 					Signup
// 				</a> */}
//         <Link to={`/register`} >Registerd </Link>
// 			</div>
//     </form>
//     </div>
//     </Layout>
//   );
// };

// export default Login;


import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from './FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Layout from "./../components/Layout/Layout";
import Loader from './Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Layout>
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
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

        <Button
          disabled={isLoading}
          type='submit'
          variant='primary'
          className='mt-3'
        >
          Sign In
        </Button>
      </Form>

      {isLoading && <Loader />}

      <Row className='py-3'>
        <Col>
          New Customer? <Link to='/register'>Register</Link>
        </Col>
      </Row>
    </FormContainer>
    </Layout>
  );
};

export default LoginScreen;
