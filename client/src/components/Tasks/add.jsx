import React, { useState } from 'react'
import styles from './add.module.scss'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addTask } from '../../store/action'
import { useNavigate } from 'react-router-dom'

const AddTask = () => {
    const [name, setName] = useState("")
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const validate = () => {
        let errObj = {}
        let valid = true
        if(!name || !name.length) {
            valid = false
            errObj.name = "Please provide task name"
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
            dispatch(addTask(name))
            navigate('/tasks')
        }
    }
    return (
        <div className={styles.container}>  
            <div className={styles.header}>
                <h2>Add Tasks</h2>
            </div>
            <form onSubmit={onSubmit}>
                <div className={styles.formControl}>
                    <label htmlFor='name'>Task Name</label>
                    <input id="name" type="text" name="name" value={name} onChange={(e) => {
                        setError(null)
                        setName(e.target.value)
                    }} />
                    {error?.name && <span style={{color: "red"}}>{error.name}</span>}
                </div>
                <div className={styles.button}>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddTask