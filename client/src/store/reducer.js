export const tasks = (state = {tasks: []}, action) => {
    switch(action.type) {
        case "ADD_TASK":
            console.log(action.payload)
            return {
                ...state,
                tasks: [...state.tasks, {...action.payload}]
            }
        case "ALL_TASKS":
            console.log(action.payload)
            return {
                ...state,
                tasks: action.payload
            }
        case "DELETE_TASK":
            console.log(action.payload)
            return {
                ...state,
                tasks: state.tasks.filter((task) => task._id !== action.payload)
            }           
        default: 
            return {
                ...state
            }    
    }
}