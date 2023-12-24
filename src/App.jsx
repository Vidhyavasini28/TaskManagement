import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button } from 'flowbite-react';

const App = () => {

  const urlwithproxy="/api/v1";
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  const [submissionStatus, setSubmissionStatus] = useState('');

  function detDatafromServer(){
    axios
    -get(urlwithproxy)
    -then((res)=>setAssignedTasks(res.data))
    .catch((e)=>{console.log(e)});
  }


  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };


  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

  };


  const addTaskToAssigned = () => {
    if (newTask.trim() !== '' && selectedTime !== '') {
      const time = selectedPeriod === 'AM' ? selectedTime : `${parseInt(selectedTime.split(':')[0], 10) + 12}:${selectedTime.split(':')[1]}`;
      const deadline = new Date(`${selectedDate.toISOString().substr(0, 10)}T${time}`);
      const currentTime = new Date();


      const isOverdue = !deadline || deadline < currentTime;

      setAssignedTasks([
        ...assignedTasks,
        { name: newTask, deadline, completed: false, color: isOverdue ? 'text-red' : 'text-grey' }
      ]);
      try {
        // Make a POST request to your backend endpoint
        const response =  axios.post('/api/v1/tasks', {
          name: newTask,
          deadline,
          completed: false,
          color: isOverdue ? 'text-red' : 'text-grey'
        });

        console.log('Task added:', response.data); // Log the added task data
        // Update the state or perform any necessary actions based on the response
      } catch (error) {
        console.error('Error adding task:', error);
        // Handle errors if the task addition fails
      }
      setNewTask('');
      setSelectedTime('');
      setSelectedPeriod('AM');
    }
  };
  const submitFile = () => {
    if (selectedFile) {
      setSubmissionStatus('File submitted successfully!');
      setSelectedFile(null);
    } else {
      setSubmissionStatus(' Please choose a file.');
    }
  };


  const removeTask = (index) => {
    const updatedTasks = [...assignedTasks];
    updatedTasks.splice(index, 1);
    setAssignedTasks(updatedTasks);
  };


  return (
    <main className=" text-center bg-gradient-to-br from-blue-900 to-black min-h-screen py-20">
      <h1 className="text-blue text-4xl font-bold">Task Management</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="py-6 w-[70%] border border-gray-800"
          placeholder="Add a new Task and set date and time and submit"
        />
        <Button className="bg-blue-700 text-white py-10 rounded-md ml-5" onClick={addTaskToAssigned}>Add Task</Button>
        
      </div>
      <div className="flex justify-center items-center ">
        <div className="flex flex-col gap-10 gap-x-36 w-[75%] h-[50%] bg-indigo-950 rounded-lg  border-black border-4 font-['satisfy'] ">
          <input
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
            className="px-15 w-[20%] border border-white"
          />
          <select value={selectedPeriod} onChange={handlePeriodChange} className=" w-[20%] border border-gray-400">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
          <div className=" w-[20%]">
            <input
              type="date"
              value={selectedDate.toISOString().substr(0, 10)}
              onChange={handleDateChange}
              placeholder="Set Date"
            />
          </div>


          <div id="Assigned">
            {/* Inside the return statement */}
            <div id="Assigned">
              {assignedTasks.map((task, index) => (
                <div key={index} className="task-item">
                  <input
                    type="text"
                    value={`${task.name} - Date: ${task.deadline.toLocaleDateString()}, Time: ${task.deadline.toLocaleTimeString()}`}
                    className={`p-6 w-[70%] border border-gray-800 ${task.color}`}
                    readOnly
                  />
                  <Button className="bg-blue-700 text-white p-3 rounded-md ml-6" onClick={() => removeTask(index)}>Delete</Button>
                  
                </div>
              ))}
            </div>


          </div>

          <div className=" text-black w-[20%]" >
            <input
              type="file"
              id="upload"
              onChange={handleFileChange}
              placeholder="Upload a file"

            />
            <input
              type="text"
              value={submissionStatus}
              className={`p-6 w-[70%] border border-gray-800 ${submissionStatus.includes('successfully') ? 'bg-success' : 'bg-failure'
                }`}
              readOnly
            />
           <Button className="bg-blue-700 text-white p-3 rounded-md ml-6" onClick={submitFile}>Submit file</Button>

          

          </div>

        </div>
      </div>


    </main>
  );
};

export default App;
