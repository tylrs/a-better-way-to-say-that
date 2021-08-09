import { cleanSentimentAnalysis, findNewWord } from './utils';

const sampleResultPositiveAndNegative2 = {
    "status": {
        "code": "0",
        "msg": "OK",
        "credits": "1",
        "remaining_credits": "19964"
    },
    "model": "general_en",
    "score_tag": "NEU",
    "agreement": "DISAGREEMENT",
    "subjectivity": "SUBJECTIVE",
    "confidence": "84",
    "irony": "IRONIC",
    "sentence_list": [
        {
            "text": "happy sad",
            "inip": "0",
            "endp": "8",
            "bop": "y",
            "confidence": "94",
            "score_tag": "NEU",
            "agreement": "DISAGREEMENT",
            "segment_list": [
                {
                    "text": "happy sad",
                    "segment_type": "main",
                    "inip": "0",
                    "endp": "8",
                    "confidence": "100",
                    "score_tag": "NEU",
                    "agreement": "DISAGREEMENT",
                    "polarity_term_list": [
                        {
                            "text": "happy",
                            "inip": "0",
                            "endp": "4",
                            "confidence": "100",
                            "score_tag": "P"
                        },
                        {
                            "text": "sad",
                            "inip": "6",
                            "endp": "8",
                            "confidence": "100",
                            "score_tag": "N"
                        }
                    ]
                }
            ],
            "sentimented_entity_list": [],
            "sentimented_concept_list": []
        }
    ],
    "sentimented_entity_list": [],
    "sentimented_concept_list": []
}

export const submitSentence = async (sentence) => {
    const formdata = new FormData();
    formdata.append("key", "269a10b0ae7249a4022c77a093494421");
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
            console.log(result)
            return cleanSentimentAnalysis(result)
        }
    } catch (err) {
        throw Error(err)
    }
    // return cleanSentimentAnalysis(sampleResultPositiveAndNegative2)
}

export const submitWords = async (words, directionChange, wordType) => {
    let newWords = await Promise.all(words.map(async (word) => {
        try {
            const response = await fetch(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${word.text}?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb`)
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
    console.log("LOOK AT THE NEW WORDS >>>>", newWords)
    return newWords
}