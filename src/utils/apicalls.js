import { cleanSentimentAnalysis, findNewWord } from './utils';

export const submitSentence = async (sentence) => {
    const formdata = new FormData();
    formdata.append("key", `${process.env.REACT_APP_SENTIMENT}`);
    formdata.append("txt", `${sentence}`);
    formdata.append("lang", "en");  
    try {
        const response = await fetch('https://api.meaningcloud.com/sentiment-2.1', {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
         })
        if (!response.ok) {
            throw Error('Sentiment Cloud fetch error')
        } else {
            const result = await response.json()
            return cleanSentimentAnalysis(result)
        }
    } catch (err) {
        throw Error(err)
    }
}

export const submitWords = async (words, directionChange, wordType) => {
    let newWords = await Promise.all(words.map(async (word) => {
        try {
            const response = await fetch(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${word.text}?key=${process.env.REACT_APP_DICTIONARY}`)
            if (!response.ok) {
                throw Error('Thesaurus fetch error')
            } else {
                const result = await response.json()
                let newWord = {text: '', originalIndex: word.originalIndex}
                newWord.text = findNewWord(result, directionChange, wordType)
                return newWord
            }
        } catch(err) {
            throw Error(err)
        }
    }))
    return newWords
}