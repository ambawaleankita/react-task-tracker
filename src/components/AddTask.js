
import { useState } from "react"
import { useHistory } from "react-router-dom";

const AddTask = ({ addTaskHandler }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
    const history = useHistory();
    const onSubmit = (e) => {
        e.preventDefault();
        if (!text || !day) {
            alert('All the fields are mandatory!!');
            return
        }
        // pass task to App.js
        addTaskHandler({ text, day, reminder });

        // Clear fields once added
        setText('')
        setDay('')
        history.push('/')
    }
    return (
        <div className='ui main'>
            <h2>Add Task</h2>
            <form className='ui form' onSubmit={onSubmit}>
                <div className='field'>
                    <label>Task</label>
                    <input
                        type='text'
                        name='task'
                        placeholder='Add task'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className='field'>
                    <label>Add Day & Time</label>
                    <input
                        type='text'
                        name='day'
                        placeholder='Add Day & Time'
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                    />
                </div>
                <div className='field'>
                    <label>Set Reminder</label>
                    <input
                        type='checkbox'
                        checked={reminder}
                        value={reminder}
                        onChange={(e) => setReminder(e.target.checked)}
                    />
                </div>
                <button className='ui button blue'> Add </button>
            </form>
        </div>
    )
}

export default AddTask
