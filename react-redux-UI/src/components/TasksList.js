import React,{useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import MyVerticallyCenteredModal from './UpdateTask';
import { useSelector, useDispatch } from 'react-redux';
import {fetchUsers} from "../reducer/user";
import axios from 'axios'


const TasksList = () => {
  const updateTask = (user1) => {
    console.log("update Task");
    setModalShow(true)
    setData(user1)
  };

  const deleteTask = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
        try {
            await axios.delete(`http://localhost:8000/task/${id}`);
           
        } catch(err) {
            console.error("Error deleting post:", err);
        }
    }
  };

  const [modalShow,setModalShow] = useState(false)
  const [data,setData] = useState()
  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);


  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {user.map(user1=>(
          <tr className="text-center" key={user1.id}>
              <td>{user1.id}</td>
              <td>{user1.title}</td>
              <td>{user1.desc}</td>
            <td>
              <Button
                variant="primary"
                className="mx-3"
                onClick={() => updateTask(user1)}
              >
                <i className="bi bi-pencil-square"></i>
              </Button>
              <Button variant="primary">
                <i className="bi bi-trash3" onClick={() => deleteTask(user1.id)}></i>
              </Button>
            </td>
          </tr>
            ))}
        </tbody>
      </Table>

      <MyVerticallyCenteredModal
        show={modalShow}
        data = {data}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default TasksList;
