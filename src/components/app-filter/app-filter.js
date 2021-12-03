import "./app-filter.css";

const AppFilter = ({ filter, onFilterSelect}) => {
    //оптимизируем кол-во кнопок:
    const buttonsData = [
        { name: 'all', label: 'Все сотрудники' },
        { name: 'rise', label: 'На повышение' },
        { name: 'salaryMore1000', label: 'З/П больше 1000$' }
    ]
    const buttons = buttonsData.map(({ name, label }) => {
        const active = filter === name; //определяем активен ли эл-т или нет(true или false)?
        const clazz = active ? 'btn-light' : "btn-outline-light";//вариант реализации с динамическими классами
        return (
               
            <button type="button"
                className={`btn ${clazz}`}
                key={name}
                onClick={() => onFilterSelect(name)} >
                {label}
            </button>
        )
    })
    //onClick={() => onFilterSelect(name)} > здесь name - название фильтра кот будем передавать в метод, который вверху в app принимает проп filter что сообветствует выбранному!!!
    return (
    <div className="btn-group">
        {buttons}
    </div>
    )
}

export default AppFilter;