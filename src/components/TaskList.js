import TaskCard from "./TaskCard"
import { Link } from 'react-router-dom'
import { useRef } from "react"
const TaskList = ({ tasks, getTaskId, term, searchKeyword, toggleReminder }) => {
    const inputEl = useRef();
    const deleteTaskHandler = (id) => {
        getTaskId(id)
    }

    const reminderHandler = (id) => {
        toggleReminder(id)
    }
    const renderTaskList = tasks.map((task) => {
        return (
            <TaskCard
                key={task.id}
                task={task}
                clickHandler={deleteTaskHandler}
                toggleReminder={reminderHandler}
            />
        );
    });

    const getSearchTerm = () => {
        searchKeyword(inputEl.current.value);
    }

    return (
        <div className='main'>
            <h2>
                Task List
                <Link to="/add">
                    <button className="ui button blue right">Add Task</button>
                </Link>
            </h2>
            <div className='ui search'>
                <div className='ui icon input'>
                    <input
                        ref={inputEl}
                        type='text'
                        placeholder='Search Tasks'
                        className='prompt'
                        value={term}
                        onChange={getSearchTerm} />
                    <i className='search icon'></i>
                </div>
            </div>
            <div className='ui celled list'>{renderTaskList.length > 0 ? renderTaskList : 'No Tasks To Show'}</div>
        </div>
    );
}

export default TaskList
