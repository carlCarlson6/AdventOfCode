type Card = {
  id: number,
  myNumbers: number[],
  winningNumbers: number[]
}

type AlreadyProcessedCard = {
  id: number;
  idsToAdd: number[]
}

function calculateCardPoints({myNumbers, winningNumbers}: Card) {
  const matchesCount = myNumbers.filter(x => winningNumbers.includes(x)).length;
  if(matchesCount > 2)
    return Math.pow(2, matchesCount-1);
  return matchesCount;
}

export const solvePart1 = (data: string[]) => readCards(data).map(card => calculateCardPoints(card)).reduce((x, y) => x + y);

export const solvePart2 = (data: string[]): number => {
  const cards = readCards(data);
  //return processWinnings(cards, 0).length;
  return fuck(cards);
}

const fuck = (cards: Card[]) => {
  const processedCards = cards.map(({myNumbers, winningNumbers, id: cardId}) => {
    const matchesCount = myNumbers.filter(x => winningNumbers.includes(x)).length;
    const idsToAdd = Array
      .from({length: matchesCount}, (_, i) => i + 1 +cardId)
      .filter(x => cards.some(y => x === y.id));
    return {
      cardId,
      idsToAdd
    };
  });

  const asdRecord: Record<number, number[]> = {};
  for (const processedCard of processedCards) {
    asdRecord[processedCard.cardId] = processedCard.idsToAdd;
  }


  const totalCards: number[] = [];
  for (const card of cards) {
    totalCards.push(card.id);
    const extraWins = addFuck(card.id, asdRecord, []);
  }

  return totalCards.length;
}

const addFuck = (carId: number, winsReferences: Record<number, number[]>, adding: number[]): number[] => {
  const winReference = winsReferences[carId];
  if (winReference.length === 0) return adding;

}

const processWinnings = (cards: Card[], currentIndex: number): Card[] => {
  /*for(let currentIdx = 0; currentIdx < cards.length; currentIdx++) {
    const {id: cardId, myNumbers, winningNumbers} = cards[currentIdx];

    const matchesCount = myNumbers.filter(x => winningNumbers.includes(x)).length;
    const idsToAdd = Array
      .from({length: matchesCount}, (_, i) => i + 1 +cardId)
      .filter(x => cards.some(y => x === y.id));
    const cardsToAdd = idsToAdd.map(idToAdd => cards.find(c => c.id === idToAdd)!);

    cards = [...cards.slice(0, currentIdx+1), ...cardsToAdd, ...cards.slice(currentIdx+1)];
  }
  return cards;*/


  if (currentIndex === cards.length-1) return cards;

  const {id: cardId, myNumbers, winningNumbers} = cards[currentIndex];

  const matchesCount = myNumbers.filter(x => winningNumbers.includes(x)).length;
  const idsToAdd = Array.from({length: matchesCount}, (_, i) => i + 1).map(x => cardId + x).filter(x => cards.some(y => x === y.id));
  const cardsToAdd = idsToAdd.map(idToAdd => cards.find(c => c.id === idToAdd)!);

  const newCards = [...cards.slice(0, currentIndex+1), ...cardsToAdd, ...cards.slice(currentIndex+1)];
  return processWinnings(newCards,currentIndex+1);
}

function readCards(data:string[]): Card[] {
  const cards: Card[] = [];
  for (let idx = 0; idx < data.length; idx++) {
    const line = data[idx];
    const allNumberSplit = line
      .replace(/Card[ \t]+[0-9]+:[ \t]+/, "")
      .split("|")
      .map(x => x.trim())
      .map(x => x.replace(new RegExp(/[ \t]+/, 'g'), " "));
    cards.push({
      id: idx+1,
      myNumbers: allNumberSplit[1].split(" ").map(x => Number.parseInt(x)),
      winningNumbers: allNumberSplit[0].split(" ").map(x => Number.parseInt(x))
    })
  }
  return cards;
}