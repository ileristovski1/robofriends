import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import { setSearchField, requestRobots } from '../actions';




//Tell me what piece of state I need to listen to
const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

//Tell me what props I should listen to that are actions
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => requestRobots(dispatch)
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots : []
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => {this.setState({ robots: users})});
    }


    render() {
        const { robots } = this.state;
        const { searchField, onSearchChange }= this.props;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return !robots.length ?
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange = {onSearchChange}/>
                    <Scroll>
                        <CardList robots ={filteredRobots}/>
                    </Scroll>
                </div>
            );
        }
    
    }


export default connect(mapStateToProps, mapDispatchToProps)(App);