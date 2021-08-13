import React from "react";

function Card({ card }) {
  return (
    <img src={card.image} alt={card.value}/>
  )
}

export default Card;