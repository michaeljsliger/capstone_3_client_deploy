import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import images from '../../images/images.js';
import Gravatar from 'react-gravatar';
import { Button } from '../Utils/Utils';

import './GameTableSeat.css';

export default class GameTableSeat extends Component {
  static contextType = UserContext;

  static defaultProps = {
    player: {
      playerName: '',
    },
    endGame: false,
  };

  renderLoggedInUser = (player) => {
    if (this.props.player.playerHand.length > 0) {
      player.playerHand.sort(function (a, b) {
        return a.value - b.value;
      });

      return player.playerHand.map((card) => {
        const suitValue = card.suit + card.value;

        return (
          <li
            key={card.value + card.suit}
            onClick={(e) => this.props.onCardChoice(card.value, e)}
          >
            <a className="card" href="#">
              <img
                src={images[suitValue]}
                alt="card value"
                className="card-image"
              />
            </a>
          </li>
        );
      });
    } else if (
      this.props.player.playerHand.length === 0 &&
      this.props.player.currentPlayer &&
      !this.props.endGame
    ) {
      return (
        <Button
          className="draw-button"
          onClick={() => {
            this.props.emptyHand();
          }}
        >
          Draw
        </Button>
      );
    } else if (this.props.endGame) {
      return '';
    }
  };

  renderOtherPlayers = (player) => {
    let cardBacks = [];
    for (let i = 0; i < player.handCount; i++) {
      cardBacks.push(
        <li key={i}>
          <p className="card">
            <img
              src={images.back}
              alt="back of playing card"
              className="card-image"
            />
          </p>
        </li>
      );
    }
    return (
      <>
        {player.playerName ? (
          <div
            className={`player-seat-${player.playerSeat} rotateHand`}
            onClick={() => this.props.onPlayerChoice(player)}
          >
            <ul className="hand mobile-responsive-hand">{cardBacks}</ul>
            <ul className="mobile-responsive-hand-count"><p>
              {cardBacks.length > 1 ? `${cardBacks.length} Cards` : ''}
              </p>
            </ul>
            <div className="player">
              <h3 className="name">{player.playerName}</h3>
              <Gravatar email={this.props.player.email} size={75} />
              <p className="books">sets: {this.props.player.books.length}</p>
            </div>
          </div>
        ) : (
            <div></div>
          )}
      </>
    );
  };

  render() {
    const { player, seated } = this.props;
    return (
      <>
        {!player.playerName && !seated ? (
          <button
            value={player.playerSeat}
            onClick={(e) => this.props.claimSeat(e.target.value)}
            className={`player-seat-${player.playerSeat} claim-seat-button`}
          >
            +
          </button>
        ) : player.playerName === this.context.userData.player ? (
          <div className={`player-seat-${player.playerSeat} rotateHand`}>
            <ul className="hand">{this.renderLoggedInUser(player)}</ul>
            <div className="player">
              <h3 className="name">{player.playerName}</h3>
              <Gravatar email={this.context.userData.email} size={75} />
              <p className="books">sets: {this.props.player.books.length}</p>
            </div>
          </div>
        ) : (
              this.renderOtherPlayers(player)
            )}
      </>
    );
  }
}
