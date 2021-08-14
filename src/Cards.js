import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

/** Cards Component makes API requests to Deckk of Cards API.
 *  Allows player to draw one card at a time from the deck.
 * 
 *  States:
 *  - deckId
 *  - cards
 *  - shuffling
 * 
 *  Cards -> Card
 */
function Cards() {
  const [deckId, setDeckId] = useState("");
  const [cards, setCards] = useState([]);
  // const [drawn, setDrawn] = useState(false);
  const [shuffling, setShuffling] = useState(false);

  console.log("CARDS", cards);

  useEffect(function getDeck() {
    async function getDeckData() {
      const resp = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
      setDeckId(resp.data.deck_id);
    }
    getDeckData();
  }, []);

  // useEffect(function drawCard() {
  //   async function getCardData() {
  //     try {
  //       const resp = await axios.get(`${API_BASE_URL}/${deckId}/draw?count=13`);
  //       setCards( currCards => ([
  //         ...currCards,
  //         resp.data.cards[0]
  //       ]));

  //       if(resp.data.remaining === 0) {
  //         alert("Error: No Cards Remaining");
  //       }

  //     } catch(err) {}
  //   }

  //   if(drawn) {
  //     getCardData();
  //     setDrawn(false);
  //   }
  // }, [cards, deckId, drawn]);

  async function handleClick() {
    const resp = await axios.get(`${API_BASE_URL}/${deckId}/draw?count=13`);
    setCards((currCards) => [...currCards, resp.data.cards[0]]);
  }

  useEffect(function shuffleCard() {
      async function shuffle() {
        console.log("SHUFFLING");
        await axios.get(`${API_BASE_URL}/${deckId}/shuffle`);
      }

      if (shuffling) {
        shuffle();
        setShuffling(false);
      }
    }, [shuffling, deckId]
  );

  if (cards.length > 4) {
    setShuffling(true);
    setCards([]);
  }

  return (
    <div className="Cards">
      <button onClick={handleClick} disabled={shuffling}>
        {console.log("BUTTON", shuffling)}
        GIMME A CARD!
      </button>
      <div className="Cards-card">
        {cards.length > 0 && cards.length <= 4 ? (
          <Card
            card={cards[cards.length - 1]}
            key={cards[cards.length - 1].code}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Cards;