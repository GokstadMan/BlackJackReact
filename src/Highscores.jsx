import React, { useState,useEffect } from "react";
import "./Highscores.css";

export function Highscores(props) {
  const [name, setName] = useState("");
  const [highscoreList, setHighscoreList] = useState([]);

  useEffect(() => {
    const newHsList = JSON.parse(localStorage.getItem("highscores"));
    if (newHsList !== null) setHighscoreList(newHsList);
  }, []);

  const saveHighscore = () => {
    const newHsList = [...highscoreList];
    newHsList.push({
      name: name,
      score: props.totalScore
    });
    localStorage.setItem("highscores", JSON.stringify(newHsList));

    setHighscoreList(newHsList);
  };

  const sortedBestHscores = highscoreList.sort(sortHighSFalling).slice(0, 10);

  return (
    <div>
      <h3>Total score: {props.totalScore}</h3>
      <label htmlFor="name">Navn:</label>
      <input
        className="highscores__input"
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="game__button game__button__hit" onClick={saveHighscore}>
        Lagre Highscore
      </button>
      <h2>Highscores</h2>
      <ul style={{ padding: 0 }}>
        {sortedBestHscores.map((item) => (
          <li style={{}}>
            {item.name} {item.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

function sortHighSFalling(score01, score02) {
  if (score01.score > score02.score) {
    return -1;
  } else if (score02.score > score01.score) {
    return 1;
  } else {
    return 0;
  }
}
