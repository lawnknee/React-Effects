import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

function Cards() {
  const [deckId, setDeckId] = useState("");
  const [cards, setCards] = useState([]);
  const [drawn, setDrawn] = useState(false);
  
  console.log("CARDS",cards);

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
      setCards( currCards => ([
        ...currCards,
        resp.data.cards[0]
    ]));
  }

  useEffect(function shuffleCard() {
    async function shuffle() {
      const resp = await axios.get(`${API_BASE_URL}/${deckId}/shuffle`);
    }
  

    if() {
      shuffleCard();
    }

  }, [, deckId]);


  if(cards.length === 4) {

  }

  return (
    <div className="Cards">
      <button onClick={handleClick}>GIMME A CARD!</button>
      <div className="Cards-card">
        {cards.length > 0
          ? <Card card={cards[cards.length - 1]} key={cards[cards.length - 1].code} /> 
          : null
        }
      </div>
    </div>
  )
}

export default Cards;