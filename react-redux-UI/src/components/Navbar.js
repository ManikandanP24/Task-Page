import React, { useState, useEffect } from "react";
import axios from 'axios';

const Navbar = () => {
  const [res, setRes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/task");
        // console.log("res", response.data);
        setRes(response.data);
      } catch(error) {
        console.error("addTask Error", error);
      }
    };

    fetchData();
  }, []);

  const length = res.length;

  return (
    <>
      <h1 className="text-center my-4 text-primary">Project Management</h1>
      <p className="text-center lead">Currently {length} task(s) pending</p>
    </>
  );
};

export default Navbar;
