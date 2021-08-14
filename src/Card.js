import React from "react";

/** Card: renders a card. 
 * 
 *  Props:
 *  - card: a object like { image, value, suit, code }
 * 
 *  Cards -> Card
*/
function Card({ card }) {
  return (
    <img src={card.image} alt={card.value}/>
  )
}

export default Card;