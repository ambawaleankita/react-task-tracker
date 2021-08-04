import { Link } from "react-router-dom";


const TaskCard = ({ task, clickHandler, toggleReminder }) => {
    const { id, text, day, reminder } = task;
    return (
        <div className={`item task ${reminder && 'reminder'}`} onDoubleClick={() => toggleReminder(id)}>
            <div className='content' style={{ marginLeft: '10px' }}>
                <h4 className='header'>{text}
                    <i
                        className='trash alternate outline icon'
                        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
                        onClick={() => clickHandler(id)}></i>
                    <Link to={{ pathname: '/edit', state: task }}>
                        <i
                            className='edit alternate outline icon'
                            style={{ color: "blue", marginTop: "7px" }}
                        ></i>
                    </Link>
                </h4>
                <p>{day}</p>
            </div>
        </div>
    )
}

export default TaskCard
