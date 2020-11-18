import React from 'react';
import ChatLog from '../Chat/ChatLog';
import GameBoard from './GameBoard';

class GameTable extends React.Component {
    state = {
        inProgress: false,

    }
    
    componentDidMount() {
        // console.log(this.props.match.params);
    }

    render() {
        return (
            <div>
                <div>
                    <GameBoard />
                    {/* diff component based on gamestate*/}
                </div>
                <div>
                    <ChatLog match={this.props.match} />
                </div>
            </div>
        )
    }
}

export default GameTable;