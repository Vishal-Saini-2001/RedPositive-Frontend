import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Table.css';
import UpdateForm from './UpdateForm'
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Table = () => {
    const navigate = useNavigate();

    const [allChecked, setAllChecked] = useState(false);
    const [checkBox, setCheckBox] = useState([]);

    const [users, setUsers] = useState([]);
    const [oldEmail, setOldEmail] = useState("");

    const [form, setForm] = useState({
        position: "relative",
        top: "-100rem",
        transition: "0.5s ease-in-out"
    })

    useEffect(() => {
        const getData = async () => {
            await axios.get("https://redpositive-backend-x9ke.onrender.com/get-data")
                .then(data => {
                    setUsers(data.data);
                    let chk = checkBox;
                    for (let i = 0; i < data.data.length; i++)chk[i] = false;
                    setCheckBox(chk);
                })
                .catch(err => console.log(err))
        }
        getData()

    }, [])

    const updateData = async (e) => {
        setForm({
            ...form,
            top: "0rem"
        })
        const index = (e.target.id);
        setOldEmail(users[index].email);
    }

    const deleteData = async (e) => {
        const index = (e.target.id);
        const email = users[index].email;
        await axios.post("https://redpositive-backend-x9ke.onrender.com/delete-data", { email })
            .then(res => navigate("/redirect"))
            .catch(err => console.log(err))

    }

    const handleSelectAll = () => {
        let chk = checkBox;
        for (let i = 0; i < chk.length; i++)chk[i] = !allChecked;
        setAllChecked(!allChecked);
        setCheckBox(chk);
    }

    const handleCheckBoxChange = async (e) => {
        setAllChecked(false);
        const index = e.target.id;
        let chk = [...checkBox];
        chk[index] = !chk[index];
        setCheckBox(chk);
    }

    const [addForm, setAddForm] = useState({
        position: "relative",
        top: "-100vh",
        left: "-100rem",
        transition: "0.5s ease-in-out"
    })

    const addData = () => {
        setAddForm({
            ...addForm,
            left: "0rem",
        })
    }

    const cutAddForm = () => {
        setAddForm({
            ...addForm,
            left: "-100rem",
        })
    }

    const cutUpdateForm = () => {
        setForm({
            ...form,
            top: "-112vh"
        })
    }

    const sendEmail = async (e) => {
        e.preventDefault();

        if (allChecked) {
            const data = {
                service_id: "service_j4uglk9",
                template_id: "template_7u0v1p9",
                user_id: "6qZUjMmUcbK_GNRbm",
                template_params: {
                    message: JSON.stringify(users)
                }
            };

            await axios.post("https://api.emailjs.com/api/v1.0/email/send", data)
                .then(resp => {
                    alert("sent");
                    navigate("/redirect")
                })
                .catch(err => {
                    alert("not sent");
                    navigate("/redirect")
                })

        }
        else {
            const mailData = [];
            for (let i = 0; i < checkBox.length; i++) {
                if (checkBox[i]) {
                    const newData = {
                        name: users[i].name,
                        email: users[i].email,
                        mobile: users[i].mobile,
                        hobbie: users[i].hobbie
                    }
                    mailData.push(newData);
                }
            }
            const data = {
                service_id: "service_j4uglk9",
                template_id: "template_7u0v1p9",
                user_id: "6qZUjMmUcbK_GNRbm",
                template_params: {
                    message: JSON.stringify(mailData)
                }
            };

            await axios.post("https://api.emailjs.com/api/v1.0/email/send", data)
                .then(resp => {
                    alert("Mail Sent");
                    navigate("/redirect")
                })
                .catch(err => {
                    alert("Mail not Sent");
                    navigate("/redirect")
                })
        }
    };


    return (
        <>
            <div style={form} id='update'>
                <button onClick={cutUpdateForm}><b>X</b></button>
                <UpdateForm email={oldEmail} />
            </div>
            <div style={addForm} id="entery">
                <button onClick={cutAddForm}><b>X</b></button>
                <Form />
            </div>
            <div className="container">
                <button className='btn btn-info mx-3' onClick={addData}>Add</button>
                {checkBox.includes(true) && <button className='btn btn-info' onClick={sendEmail}>Send</button>}
            </div>
            <div className='table'>
                <table>
                    <tr>
                        <th><input type="checkbox" onChange={handleSelectAll} checked={allChecked} />Select All</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Hobbies</th>
                        <th>Update/Delete</th>
                    </tr>
                    {
                        users.map((v, i) => {
                            return (
                                <tr key={i}>
                                    <td><input type="checkbox"
                                        id={i}
                                        onChange={handleCheckBoxChange}
                                        checked={checkBox[i]}
                                    />
                                    </td>
                                    <td>{i}</td>
                                    <td>{v.name}</td>
                                    <td>{v.mobile}</td>
                                    <td>{v.email}</td>
                                    <td>{v.hobbie}</td>
                                    <td><button className='btn btn-info manipulate' id={i} onClick={updateData}>Update</button> | <button className='btn btn-danger manipulate' id={i} onClick={deleteData}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </>
    )
}

export default Table
