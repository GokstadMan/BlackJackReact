import React from "react";
import { Card } from "./Card";
import "./Player.css";

export function Player(props) {
  const cardComponents = props.cards.map((card) => (
    <Card key={card.rank + card.suit} rank={card.rank} suit={card.suit} img={card.img} />
  ));

  return (
    <div className="player">
      <h2 className="player__name">{props.name}</h2>
      <div className="player__cards">{cardComponents}</div>
    </div>
  );
}