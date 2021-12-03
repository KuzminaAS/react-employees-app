import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({ data, onDelete, onToggleProp, onUpdateSalary}) => {
    const elements = data.map(item => {
        const { id, ...itemProps } = item;//деструктуризация по остаточному принципу ( т.е вытаскиваем id - то что нужно сейчас, а все остальное что осталось распыляем(itemProps = name, salary, increase))
        return (
        <EmployeesListItem
            key={id} 
            id={id}
            {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleProp={(e)=>{onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}}//getAttribute- получаем значение атрибута дом эл-та, currentTarget - получаем тот эл-т кот действительно нужен
                onUpdateSalary={onUpdateSalary}
            />)  
    })
    return (
        <ul className="app-list list-group">
           {elements}
        </ul>
    )
}

export default EmployeesList;