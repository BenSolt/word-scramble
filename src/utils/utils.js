
function getLetterCountMap(inputWord) {
    let map = {};

    inputWord.split("").forEach(letter =>{
        map[letter] = (map[letter] || 0) + 1; //set val to current val + 1, 0+1 if not exists already
    });
    return map;
}

export default getLetterCountMap;