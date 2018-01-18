
    

    export const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }
    
    export const returnRandomArrayValue = (array) => {
        const max = getRandomInt(array.length) + 1;
        return array[getRandomInt(max)];
    }
    