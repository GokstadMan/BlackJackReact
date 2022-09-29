import React, { useState, useEffect } from "react";
import { cardDeck } from "./card-deck";
import { Player } from "./Player";
import "./Game.css";

function calculateScore(cards) {
  let score = 0;
  for (let card of cards) {
    score += card.rank;
  }
  return score;
}

function getNewCardDeck() {
  const cardDeckCopy = [...cardDeck];
  cardDeckCopy.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cardDeckCopy.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cardDeckCopy.sort(() => (Math.random() > 0.5 ? 1 : -1));
  return cardDeckCopy;
}

export function Game() {
  const [cards, setCards] = useState(getNewCardDeck());
  const [player, setPlayer] = useState([]);
  const [dealer, setDealer] = useState([]);
  const [playerStanding, setPlayerStanding] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerWon, setPlayerWon] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const playAgain = () => {
    if (gameOver) {
      setTotalScore(0);
    }

    const newCards = getNewCardDeck();
    setGameOver(false);
    setPlayerWon(false);
    setPlayerStanding(false);
    setDealer([newCards.pop()]);
    const newPlayer = [newCards.pop(), newCards.pop()];
    setPlayer(newPlayer);
    setCards(newCards);

    if (calculateScore(newPlayer) > 21) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    playAgain();
  }, []);

  const drawNewCardPlayer = () => {
    const newPlayer = [...player];
    newPlayer.push(cards.pop());
    setPlayer(newPlayer);

    if (calculateScore(newPlayer) > 21) {
      setGameOver(true);
    }
  };

  const playerScore = calculateScore(player);

  const standAndLetDealerDraw = () => {
    setPlayerStanding(true);

    let dealerCards = [...dealer];
    let dealerTotalScore = calculateScore(dealerCards);

    while (dealerTotalScore <= playerScore && dealerTotalScore < 22) {
      dealerCards.push(cards.pop());
      dealerTotalScore = calculateScore(dealerCards);
    }
    setDealer(dealerCards);
    if (dealerTotalScore > playerScore && dealerTotalScore < 22) {
      setGameOver(true);
    } else {
      setPlayerWon(true);
      setTotalScore(totalScore + playerScore);
    }
  };

  return (
    <div className="game">
      <h1>Blackjack Spill</h1>
      <div className="game__players">
        <Player name="Du" cards={player} />
        <Player name="Dealer" cards={dealer} />
      </div>
      <div>
        <span>Din score: {playerScore}</span>
        <br />
        <span>Dealer score: {calculateScore(dealer)}</span>
        {gameOver && <h2>Game Over!</h2>}
        {playerWon && <h2>Du har vunnet!</h2>}
        {playerScore === calculateScore(dealer) && <h2>Uavgjort!</h2>}
        {(playerWon || gameOver) && (
          <button className="game__button game__button__hit" onClick={playAgain}>
            Play again
          </button>
        )}
      </div>
      <div className="game__buttons">
        <button className="game__button game__button__hit" onClick={drawNewCardPlayer} disabled={playerStanding}>
          SLÅ!
        </button>
        <button className="game__button game__button__stand" onClick={standAndLetDealerDraw}>
          STÅ!
        </button>
      </div>

      <h2>Total score: {totalScore}</h2>
    </div>
  );
}
