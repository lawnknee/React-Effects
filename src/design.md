App

  Cards
    state:
      - deckId
      - cards

    effects:
      - api call to get deckId
          - dependency: none
      - api call to draw a card
          - dependency: [cards]
      - api call to shuffle deck
          - dependecy: none


    Card
      props:
        - image
        - code (use as key)
        - value (?)