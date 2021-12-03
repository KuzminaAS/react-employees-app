import {Component} from 'react';
import './employees-list-item.css';

class EmployeesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salary: 0
        }
    }
    onChangeSalary = (e) => {
        const salary = e.target.value;
        this.setState({ salary });
        const id = this.props.id;
        this.props.onUpdateSalary(id, salary);
        
    }
    render() {
            const {name, onDelete, onToggleProp, increase, rise} = this.props;
    
            let classNames = 'list-group-item d-flex justify-content-between';
            if (increase) {
                classNames += ' increase';
            }
            if (rise) {
                classNames += ' like';
            }
    return (
        <li className={classNames} >
            <span onClick={onToggleProp} className='list-group-item-label ' data-toggle='rise'>{name}</span>
           <input type="text" className="list-group-item-input" value={this.state.salary} onChange={this.onChangeSalary}/> &#x24;
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                    data-toggle='increase'
                    className="btn-cookie btn-sm "
                onClick={onToggleProp}>
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                    onClick={onDelete}
                        className="btn-trash btn-sm ">
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    )
    
       }
    
}

export default EmployeesListItem;