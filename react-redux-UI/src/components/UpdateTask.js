import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from 'react-redux';
import {fetchUsers} from "../reducer/user";
import axios from 'axios'

const MyVerticallyCenteredModal = (props) => {
  const { data } = props;
  
  const id = data?.id

  console.log(".......id",id)

  // const findUser = 
  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  
  useEffect(()=>{
    const foundUser = user.find(u => u.id === id);
    setTitle(foundUser?.title)
    setDesc(foundUser?.desc)
  },[id])
  
  // console.log("findUser:", foundUser);
  console.log("findUser:", title , desc);

  
  const updateTask = async () => {
    try {
      const updatedData = { id, title, desc };
      await axios.patch(`http://localhost:8000/task/${id}`, updatedData);
      console.log("Task updated successfully");
      window.location.reload(); // Reload the page
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };
  

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Task Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-end">
          <Button
            variant="primary"
            type="submit"
            onClick={() => updateTask()}
          >
            Update Task
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
