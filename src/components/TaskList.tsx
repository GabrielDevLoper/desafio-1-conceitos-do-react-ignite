import { v4 as uuid } from 'uuid';
import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [handleTasks, setHandleTasks] = useState<Task[]>([]);

  function handleCreateNewTask() {

    if(newTaskTitle == ""){
      return ;
    }else {
      setTasks([
            ...tasks,
            {
              id: uuid(),
              title: newTaskTitle,
              isComplete: false
            }
          ]);

      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: string) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    tasks.find(task => {
      if(task.id == id){
        task.isComplete = !task.isComplete;
      }
    });
    
    setTasks([...tasks]);
  }

  function handleRemoveTask(id: string) {
    // const confirmDelete = confirm("Deseja realmente exluir esta task?");
    
      tasks.map(task => {
        if(task.id == id){
          tasks.splice(tasks.indexOf(task), 1);
        }
      });

      setTasks([...tasks]); 

    
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}