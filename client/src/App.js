import logo from './logo.svg';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import './App.css';
import Tasks from './components/Tasks/list';
import AddTask from './components/Tasks/add';
import { Toaster } from 'react-hot-toast';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from './store/action';
import EditTask from './components/Tasks/edit';

function App() {
  // const dispatch = useDispatch()
  // useLayoutEffect(() => {
  //   dispatch(fetchTasks())
  // }, [])
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path='/tasks' element={<Tasks/>} />
          <Route path='/add-task' element={<AddTask/>} />
          <Route path='/edit-task/:id' element={<EditTask/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
