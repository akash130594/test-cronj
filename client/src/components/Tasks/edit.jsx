import React, { useLayoutEffect, useState } from 'react'
import styles from './add.module.scss'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateTask } from '../../store/action'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';

const EditTask = () => {
    const [status, setStatus] = useState('Pending')
    const [error, setError] = useState(null)
    const [taskDetails, setTaskDetails] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let {id}= useParams();
    useLayoutEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/tasks/${id}`)
                setTaskDetails(res.data.data)
            }catch(err) {
                toast.error(err.message)
            }
        }
        if(id) {
            fetchTask()
        }
    }, [id])
    const validate = () => {
        let errObj = {}
        let valid = true
        if(!status || !status.length) {
            valid = false
            errObj.status = "Please provide status name"
        }
        if(!valid) {
            setError(errObj)
        }
        return valid
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const isValid = validate()
        if(isValid) {
            dispatch(updateTask({status}, id))
            navigate('/tasks')
        }
    }
    return (
        <div className={styles.container}>  
            <div className={styles.header}>
                <h2>Edit Tasks</h2>
            </div>
            <form onSubmit={onSubmit}>
                <div className={styles.formControl}>
                    <label htmlFor='name'>Task Name</label>
                    <select name="" id="" onChange={(e) => setStatus(e.target.value)}>
                        <option value={"Pending"} selected={taskDetails?.status === "Pending"}>Pending</option>
                        <option value={"Completed"} selected={taskDetails?.status === "Completed"}>Completed</option>
                    </select>
                    {error?.status && <span style={{color: "red"}}>{error.status}</span>}
                </div>
                <div className={styles.button}>
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    )
}

export default EditTask