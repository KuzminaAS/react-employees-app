import "./app-info.css";

const AppInfo = ({ data, employees, increased}) => {
    // const allEmployees = data.reduce((acc) => (acc + 1), 0);
    // const increaseEmployees = data.filter(item => item.increase).reduce((acc => acc + 1), 0)
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {employees}</h2>
            <h2>Премию получат: {increased}</h2>
        </div>
    )
}

export default AppInfo;