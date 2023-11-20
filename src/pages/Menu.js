import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import classes from './categories.module.css'
// import jwt from 'jsonwebtoken';
import { MdOutlinePreview } from 'react-icons/md'
import { AiFillLike } from 'react-icons/ai'
import { FiArrowRight } from 'react-icons/fi'
import Layout from "./../components/Layout/Layout";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { addToCart } from "../slices/Cart.js";



const Menu = () => {
  const dispatch = useDispatch();
  const [loading ,setloading]=  useState(true)
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const categories = [
    'all',
    'thali',
    'pizza',
    'burger',
    
    'sweets',
  
  ]
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    loadusser();
  }, []);
  const loadusser = async () => {
    var response = await axios.get("https://food-databackend.onrender.com/api/food/getall", {
      headers: { accesstoken: token },
    });
    setFilteredBlogs(response.data);
    setBlogs(response.data);
    setloading(false)
    console.log(response.data)
  };
  useEffect(() => {
    if(activeCategory === 'all'){
      setFilteredBlogs(blogs)
    } else {
      setFilteredBlogs((prev) => {
        const filteredBlogs = blogs.filter((blog) => blog.category.toLowerCase() === activeCategory.toLowerCase())

        return filteredBlogs
      })
    }
  }, [activeCategory])


  const addToCartHandler = (menu) => {
    dispatch(addToCart(menu));
    navigate("/cart");
  };

  return (
    <Layout>
       <div className={classes.categories}>
            {categories.map((category) => (
              <span
                key={crypto.randomUUID()}
                className={`${classes.category} ${activeCategory === category && classes.active}`}
                onClick={() => setActiveCategory(prev => category)}
              >
                {category}
              </span>
            ))}
          </div>
        {loading && <div className={classes.loading}>Loading.....</div>}
        
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredBlogs.map((menu) => (
          <Card sx={{ maxWidth: "390px", display: "flex", m: 2 }}>
            <CardActionArea>
              <CardMedia
              src={menu.avatar}
                // sx={{maxHeight: { xs: 233, md: 340 }}}
                component={"img"}
                sx={{ height: 320 }}
  
              //   sx={{ height: 450 }}
              //   variant="quilted"
              //   cols={4}
              //   rowHeight={121}
              // sx={{
              //   height: 233,
              //   // width: 350,
              //   maxHeight: { xs: 233, md: 167 },
              //   // maxWidth: {md: 250 },
              // }}
              />
              <CardContent sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
              {/* <div className='product-about'>
    <p className='proname'>{item.name}</p>
    <button>order</button> */}
                <Typography variant="h6" gutterBottom component={"div"}>
                  {menu.name}
                 
                </Typography>
                <Button onClick={() =>  addToCartHandler(menu)}
                sx={{ bgcolor: "green", color: "black" }}>add to cart</ Button>
                {/* <button>order</button> */}
                {/* <Typography variant="body2">{menu.description}</Typography> */}
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Layout>
  );
};
export default Menu;
