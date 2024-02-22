import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const AddTask = () => {
    // const [id,setId]= useState('')
    const [title,setTitle] = useState('');
    const [desc,setDesc] = useState('');
    const [res,setRes]= useState('');

    const addTask = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8000/task", { title, desc });
          console.log("res", response.data);
          setRes(response.data);
  
        }   
        catch(error) {
          console.error("addTask Error", error);
        }
        setTitle('')
        setDesc('')
    };
  
  //  const length = setRes.length + 1
  //   length = setId
    // console.log('.......',length)

    return (
        <section className="my-5">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Task Title" value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Task Description" value={desc}
                        onChange={(e) => setDesc(e.target.value)}/>
                </Form.Group>
                <div className="text-end">
                    <Button variant="primary" type="submit" onClick={(e) => addTask(e)}>
                        Add Task
                    </Button>
                </div>
            </Form>
        </section>
    );
};

export default AddTask;
