import React, { useState, useEffect } from 'react';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('AM');

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

  const calculateTaskColor = (dueDateTime, taskCompleted) => {
    const currentTime = new Date();

    if (!taskCompleted && dueDateTime < currentTime) {
      return 'text-red'; 
    } else if (!taskCompleted && dueDateTime >= currentTime) {
      return 'text-grey'; 
    } else {
      return 'text-green';
    }
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
      setNewTask('');
      setSelectedTime('');
      setSelectedPeriod('AM');
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
        <button className="bg-blue-700 text-white py-10 rounded-md ml-5" onClick={addTaskToAssigned}>Add Task</button>
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
      <button className="bg-blue-700 text-white p-3 rounded-md ml-6" onClick={() => removeTask(index)}>Delete</button>
    </div>
  ))}
</div>


</div>

      <div className=" text-white w-[20%]" >
        <input
          type="file"
          id="upload"
          onChange={handleFileChange}
          placeholder="Upload a file"
          
        />
      </div>
      
      </div>
      </div>
      
      
    </main>
  );
};

export default App;
