import React from 'react';
// import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './ChatLog.css'

let socket;

class ChatLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      connected: false,
      asked: '',
      players: [],
    };
  }

  static defaultProps = {
    messages: [],
  };
  static contextType = UserContext;

  componentWillReceiveProps(props) {
    if (props.upperState) {
      this.setState({
        messages: props.upperState.messages,
        connected: props.upperState.connected,
        asked: props.upperState.asked,
        players: props.upperState.players,
      });
    }
  }

  componentDidMount() {
    this.setState({ connected: true })
    // console.log(this.props.upperState)
    // socket.on('serverResponse', (retObj) => {
    //     this.setState({
    //         self: (this.state.self) ? this.state.self : retObj.self,
    //         room: retObj.room,
    //         players: retObj.players,
    //         connected: true,
    //         messages: [...this.state.messages, retObj.message],
    //     })
    // })
    // socket.on('gameFull', (message) => {
    //     alert(message);
    // })
    // socket.on('rank request from player', (requestObj) => {
    //     this.setState({ asked: requestObj })
    // })
    // socket.on('go fish', (reqObj) => {
    //     const { asker, requested, rankReq } = reqObj;
    //     console.log(`${requested} did not have a ${rankReq}, sorry ${asker}.`)
    // })
    // socket.on('correct rank return', (gameObj) => {
    //     const { requested, asker, rankReq, CARD } = gameObj;
    //     // gameObj returned,
    //     // requested, asker(self), reqRank, CARD
    //     // add CARD to hand
    //     // check for books
    //     // display next turn
    //     console.log(`${requested} DID have a ${rankReq}! Good guess, ${asker}!`);
    // })
    // map out server calls for tomorrow
    // CLIENT RESPONSES =======
    /*
        
                    CLIENT EMITS ============
                    socket.emit('request rank from player', () => {
                        user_id
                        requestId (socket.id)
                        requestedRank
                    })
        
                    socket.emit('rank request denial', () => {
                        const requested = requestObj.user_id;
                        const asker = requestObj.request_id;
                        const reqRank = requestObj.requested_rank;
        
        
                        requested does NOT have aany reqRank's, asker must go fish
                    })
                    socket.emit('rank request accept', () => {
                        requested, asker, reqRank
                        user DOES have card
        
                        requested gives asker CARD, asked for reqRank
        
                    })
        
        
                    socket.emit('next turn click', () => {
        
                    })
        
                */
  }

  // onChatMessageSubmit = (event) => {
  //     event.preventDefault();
  //     const room = this.props.match.params.game_id;
  //     console.log(room);
  //     const userObj = {
  //         value: event.target['input-message'].value,
  //         room
  //     }

  //     socket.emit('serverMessage', userObj);
  // }

  // onJoinServerClick = () => {
  //     const room = this.props.match.params.game_id;
  //     /* ROOM ID WILL BE BASED ON THIS ^ */
  //     const playerName = this.context.userData.player;
  //     const user_id = this.context.userData.id; // context.user.user_id
  //     const avatarLink = this.context.userData.avatar; // context.user.avatarLink

  render() {
    let players = [];
    let messagesArr = [];
    if (this.state) {
      if (this.state.players) {
        players = this.state.players.map((el, index) => {
          // el.id, el.name, .room
          return (
            <div key={index}>
              {el.playerName}, {el.id}
            </div>
          );
        });
      }
      messagesArr = this.state.messages.map((el, index) => {
        return <div key={index}>{el}</div>;
      });
    }
    return (
      <div>
        <div>{this.state.room}</div>
        <div id="chatBox">
          <div id="message">{messagesArr}</div>
          <div id="feedback"></div>
        </div>
        <form onSubmit={(event) => this.props.onChatMessageSubmit(event)}>
          <input onKeyPress={this.props.handleKeyPress} type="text" id="input-message" />
          <button disabled={!this.state.connected} type="submit">
            Send Message
          </button>
        </form>
        <form onSubmit={(e) => this.props.askAnotherPlayer(e)}>
          <input placeholder="id of player" type="text" id="to-ask-id" />
          <input placeholder="rank requested" type="text" id="rank-requested" value={this.props.requestedCard} readOnly />
          <button type="submit">Ask Other Player</button>
        </form>
        {this.state.asked && (
          <div>
            <button onClick={() => this.props.yesResponse()}>Yes</button>
            <button onClick={() => this.props.noResponse()}>No</button>
          </div>
        )}
        <div>{players}</div>
      </div>
    );
  }
}

export default ChatLog;
