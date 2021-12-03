import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: 'John S.',
          salary: 0
          ,
          increase: false,
          rise: false,
          id: 1
        },
        {
          name: 'Marya M.',
          salary: 0
          ,
          increase: true,
          rise: false,
          id: 2
        },
        {
          name: 'Sasha N.',
          salary: 0
          ,
          increase: false,
          rise: false,
          id: 3
        },
      ],
      maxId: uuidv4(),
      term: '',
      filter: ''
    }
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      // const index = data.findIndex(elem => elem.id === id);
      //1 variant
      // const before = data.slice(0, index);
      // const after = data.slice(index + 1);
      // const newArr = [...before, ...after];
      //2 variant

      return {
        data: data.filter(item => item.id !== id)//отфильтруется и останутся те эл-ты уникальный индификатор которого не совпадает с тем id который пришел
      }
    })
  }
 
  onAddItem = (name, salary) => {
    this.setState(({ data, maxId }) => {
      const newItem = {
        name,
        salary,
        increase: false,
        rise: false,
        id: maxId
      }
      if (newItem.name !== '' && newItem.salary > 0) {
        return {
          data: [...data, newItem]
        }
      }
    })
  }
  onToggleProp = (id, prop) => {//prop - что меняем? 
    // console.log(`Increase this ${id}`);
    // this.setState(({ data }) => {
    //   const index = data.findIndex(elem => elem.id === id);
    //   const old = data[index];//старый объект копия
    //   const newItem = {...old, increase: !old.increase };//новый объект кот не нарушает принцип иммутабельности, так как лежит в отдельной ячейке памяти) increase: !old.increase  - то есть в новый объект добавлено свойство с новым значением
    //   const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];//[...data.slice(0, index)] - все объекты до того как массив изменился) data.slice(index + 1) - остаток от массива
    //   return {
    //   data: newArr
    // }
    // })
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {//если нашли нужный объект(он совпадает), то вернем новый массив
          return { ...item, [prop]: !item[prop] }
        }
        return item;
      })
    }))
  }
  //поиск данных в строке поиска - поиск во всем слове:
  searchEmp = (items, term) => {//массив данных кот будем фильтровать, строка
    if (term.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.name.indexOf(term) > - 1//item.name - полная строка, term - кусочек строки) если нашли по условию то вернем индекс там где была найдена подстрока
    })
  }

  onUpdateSearch = (term) => {//просто обновляет состояние у объекта
    this.setState({ term });//{ term } - сокращенная запись объектов
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      
      case 'salaryMore1000':
        return items.filter(item => item.salary > 1000)
      default: 
        return items
    }
  }
  onFilterSelect = (filter) => {
    this.setState({ filter });
  }

  onUpdateSalary = (id, value) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          localStorage.setItem('Salary', value)
          //localStorage.getItem('Salary') ???
         return { ...item, salary: Number(value)}
      }
          return item;
      })
    }))
  }
  
  render() {
    const { data, term, filter } = this.state;
    const employees = this.state.data.length; //кол-во эл в массиве = кол-во сотрудников
    const increased = this.state.data.filter(item => item.increase).length;//кол-во сотрудников кот получат повышение
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);//двойная фильтрация(по поиску и по фильтрам) - то есть будем фильтровать уже отфильтрованный массив
    return (
    <div className="app">
        <AppInfo employees={employees} increased={increased}/>

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>
        
      <EmployeesList
        onDelete={this.deleteItem}
        data={visibleData}
          onToggleProp={this.onToggleProp}
          onUpdateSalary={this.onUpdateSalary}
      />
      <EmployeesAddForm onAddItem={this.onAddItem}/>
    </div>
  );
  }
}

export default App;
