import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './list.module.scss'
import { deleteTask, fetchTasks } from '../../store/action';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useEffect } from 'react';

const Tasks = () => {
    const dispatch = useDispatch()
    const [alert, setAlert] = useState(false)
    const [search, setSearch] = useState("")
    const [filteredTasks, setFilteredTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState(0)
    const [pendingTasks, setPendingTasks] = useState(0)
    const tasks = useSelector(state => state.tasks)
    useLayoutEffect(() => {
        dispatch(fetchTasks())
    }, [])

    useEffect(() => {
        let totalPending = 0
        let totalCompleted = 0
        if(tasks?.tasks && tasks?.tasks.length) {
            tasks?.tasks.forEach((task) => {
                return task.status === 'Completed' ? totalCompleted += 1 : totalPending += 1
            })
            setCompletedTasks(totalCompleted)
            setPendingTasks(totalPending)
            setFilteredTasks(tasks?.tasks)
        }
    }, [tasks])
    const handleDelete = (taskId) => {
        const getAlert = () => (
          <SweetAlert 
            danger 
            closeOnClickOutside={true}
            onCancel={() => setAlert(null)}
            title={"Are you sure to delete this task?"} 
            confirmBtnCssClass={"deleteButton"}
            onConfirm={() => {
              dispatch(deleteTask(taskId))
              setAlert(null)
            }}
            confirmBtnBsStyle="danger"
          >
            Delete Task
          </SweetAlert>
        );
        setAlert(getAlert())
    }
    useEffect(() => {
        if(tasks?.tasks && tasks?.tasks.length) {
            const searchedTasks = tasks?.tasks.filter((data) => {
                if(data.name.toLowerCase().includes(search.toLowerCase())) {
                    console.log(data.name.toLowerCase(), search.toLowerCase())
                }
                return data.name.toLowerCase().includes(search.toLowerCase())
            })
            setFilteredTasks(searchedTasks)
        }
    }, [search])
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>Tasks</h2>
                    <input type="text" placeholder='Search by keyword' name="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Link className={styles.button} to="/add-task">Add Tasks</Link>
                </div>
                <div className={styles.subHeader}>
                    <span>Pending Tasks: {pendingTasks}</span><br />
                    <span>Completed Tasks: {completedTasks}</span>
                </div>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    {
                        filteredTasks.length ?  filteredTasks.map((task, i) => 
                            <tr key={i}>
                                <td>{task.name}</td>
                                <td>{task.status}</td>
                                <td>
                                    <Link to={`/edit-task/${task._id}`} style={{backgroundColor: "#4CAF50", padding: '5px', marginRight: "5px"}}><BiEdit style={{color: "white", cursor: "pointer"}} /></Link>
                                    <button style={{backgroundColor: "#4CAF50",  padding: '5px', borderWidth: "0px"}} onClick={() => handleDelete(task._id)}>
                                        <AiFillDelete style={{color: "white", cursor: "pointer"}} />
                                    </button>
                                </td>
                            </tr>
                        )
                        :
                        "No Tasks Available"
                    }
                    {alert}
                </table>
            </div>
        </>
    )
}

export default Tasks