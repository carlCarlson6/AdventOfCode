const limits = {
  blue: 14,
  red: 12,
  green: 13
}

export const solvePart1 = (data: string[]) => {
  const maxGames = getMaxGames(data);
  let score = 0;
  for (let idx = 0; idx < maxGames.length; idx++) {
    const element = maxGames[idx];
    score = score + (element.blue <= limits.blue && element.green <= limits.green && element.red <= limits.red ? idx+1 : 0)
  }
  return score;
}

export const solvePart2 = (data: string[]) => getMaxGames(data)
  .map(x => x.blue * x.green * x.red)
  .reduce((x, y) => x + y)

const getMaxGames = (data: string[]) => data
  .map(x => x
    .replace(/Game [0-9]+: /, "")
    .replace(new RegExp(/, /, "g"), "|")
    .replace(new RegExp(/; /, "g"), "|")
    .split('|')
    .map(y => {
      return ({
        value: Number.parseInt(y.split(' ')[0]),
        color: y.split(' ')[1]
      });
    })
  )
  .map(game => ({
    green: getMaxColorOfGame([...game], 'green'),
    red: getMaxColorOfGame([...game], 'red'),
    blue: getMaxColorOfGame([...game], 'blue'),
  }));

const getMaxColorOfGame = (game: { value: number; color: string; }[], color: string) => game
  .filter(x => x.color === color)
  .map(x => x.value)
  .sort((a, b) => a - b)
  .reverse()[0];