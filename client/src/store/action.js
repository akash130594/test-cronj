import axios from 'axios'
import toast from 'react-hot-toast'

export const fetchTasks = () => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/tasks`).then((res) => {
            dispatch({
                type: "ALL_TASKS",
                payload: res?.data
            })
        }).catch((err) => {
            toast.error(err?.response?.data?.message)
        })
    }
}

export const addTask = (name) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/tasks`, {
            name
        }).then((res) => {
            console.log(res)
            dispatch({
                type: "ADD_TASK",
                payload: res?.data
            })
            toast.success("Task Added!")
        }).catch((err) => {
            console.log(err)
            toast.error(err?.response?.data?.message)
        })
    }
}

export const updateTask = (data, id) => {
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_API_ENDPOINT}/tasks/${id}`, {
            ...data
        }).then((res) => {
            console.log(res)
            toast.success("Task Updated!")
        }).catch((err) => {
            console.log(err)
            toast.error(err?.response?.data?.message)
        })
    }
}

export const deleteTask = (id) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/tasks/${id}`).then((res) => {
            console.log(res)
            dispatch({
                type: "DELETE_TASK",
                payload: id
            })
            toast.success("Task Deleted!")
        }).catch((err) => {
            console.log(err)
            toast.error(err?.response?.data?.message)
        })
    }
}
