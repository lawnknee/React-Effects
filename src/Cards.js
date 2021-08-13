import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

function Cards() {
  const [deckId, setDeckId] = useState("");
  const [cards, setCards] = useState([]);
  
  useEffect(function getDeck() {
    async function getDeckData() {
      const resp = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
      setDeckId(resp.data.deck_id);
    }
    getDeckData();
  }, []); // setDeckId?

  useEffect(function drawCard() {
    async function getCardData() {
      const resp = await axios.get(`${API_BASE_URL}/${deckId}/draw`);
      setCards( currCards => ([
        ...currCards,
        resp.data.cards[0]
      ]));
    }
    getCardData();
  }, [cards, deckId]);

  return (
    <div className="Cards">
      <button>GIMME A CARD!</button>
      <div className="Cards-card">
        {cards.length > 0
          ? <Card image={cards[cards.length - 1].image} key={cards[cards.length - 1].code} /> 
          : null
        }
      </div>
    </div>
  )
}

export default Cards;