import React from 'react';


export default class App extends React.Component {
    state = {
        count: 0,
    }

    incrementCount = () => this.setState({
        count: this.state.count + 1,
    })

    render() {
        return (
            <div>
                <p>count: {this.state.count}</p>
                <button onClick={this.incrementCount}>increment</button>
            </div>
        );
    }
}