import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }
    //чтобы компонент был управляемым и инпут нормально синхронизировался с локальным стейтом нужен следующий метод:
    onUpdate = (e) => {
        const term = e.target.value;//когда сработало событие то получим value кот ввел пользователь
        this.setState({ term });//установка локального состояния
    //после установки локального состояния будем пробрасывать его на верх по иерархии
        this.props.onUpdateSearch(term);//пробрасываем const term = e.target.value - то что ввел пользователь
    }
    render() {
    return (
     <input type="text"
        className="form-control search-input"
        placeholder="Найти сотрудника"
        value={this.state.term}
        onChange={this.onUpdate}
        />
        )
    }
}

export default SearchPanel;