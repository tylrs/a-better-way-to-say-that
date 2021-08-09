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

const newSampleResult = {
    "status": {
        "code": "0",
        "msg": "OK",
        "credits": "1",
        "remaining_credits": "19890"
    },
    "model": "general_en",
    "score_tag": "P",
    "agreement": "DISAGREEMENT",
    "subjectivity": "SUBJECTIVE",
    "confidence": "82",
    "irony": "IRONIC",
    "sentence_list": [
        {
            "text": "happy sad banana love great cute attractive funny laughter happy angry",
            "inip": "0",
            "endp": "69",
            "bop": "y",
            "confidence": "92",
            "score_tag": "P",
            "agreement": "DISAGREEMENT",
            "segment_list": [
                {
                    "text": "happy sad banana love great cute attractive funny laughter happy angry",
                    "segment_type": "main",
                    "inip": "0",
                    "endp": "69",
                    "confidence": "98",
                    "score_tag": "P",
                    "agreement": "DISAGREEMENT",
                    "polarity_term_list": [
                        {
                            "text": "happy",
                            "inip": "0",
                            "endp": "4",
                            "confidence": "100",
                            "score_tag": "P",
                            "sentimented_concept_list": [
                                {
                                    "form": "banana",
                                    "id": "04829d79a9",
                                    "variant": "banana",
                                    "inip": "10",
                                    "endp": "15",
                                    "type": "Top>Product>Food>FruitOrVegetable",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "4389870a4a",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "d6a74cda8b",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                }
                            ]
                        },
                        {
                            "text": "(great) sad",
                            "inip": "6",
                            "endp": "8",
                            "confidence": "98",
                            "score_tag": "N+",
                            "sentimented_concept_list": [
                                {
                                    "form": "banana",
                                    "id": "04829d79a9",
                                    "variant": "banana",
                                    "inip": "10",
                                    "endp": "15",
                                    "type": "Top>Product>Food>FruitOrVegetable",
                                    "score_tag": "N+"
                                },
                                {
                                    "form": "love",
                                    "id": "4389870a4a",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "N+"
                                },
                                {
                                    "form": "love",
                                    "id": "d6a74cda8b",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "N+"
                                }
                            ]
                        },
                        {
                            "text": "love",
                            "inip": "17",
                            "endp": "20",
                            "confidence": "100",
                            "score_tag": "P",
                            "sentimented_concept_list": [
                                {
                                    "form": "banana",
                                    "id": "04829d79a9",
                                    "variant": "banana",
                                    "inip": "10",
                                    "endp": "15",
                                    "type": "Top>Product>Food>FruitOrVegetable",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "4389870a4a",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "d6a74cda8b",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                }
                            ]
                        },
                        {
                            "text": "cute",
                            "inip": "28",
                            "endp": "31",
                            "confidence": "100",
                            "score_tag": "P",
                            "sentimented_concept_list": [
                                {
                                    "form": "banana",
                                    "id": "04829d79a9",
                                    "variant": "banana",
                                    "inip": "10",
                                    "endp": "15",
                                    "type": "Top>Product>Food>FruitOrVegetable",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "4389870a4a",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "d6a74cda8b",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                }
                            ]
                        },
                        {
                            "text": "attractive",
                            "inip": "33",
                            "endp": "42",
                            "confidence": "100",
                            "score_tag": "P",
                            "sentimented_concept_list": [
                                {
                                    "form": "banana",
                                    "id": "04829d79a9",
                                    "variant": "banana",
                                    "inip": "10",
                                    "endp": "15",
                                    "type": "Top>Product>Food>FruitOrVegetable",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "4389870a4a",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "d6a74cda8b",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                }
                            ]
                        },
                        {
                            "text": "funny",
                            "inip": "44",
                            "endp": "48",
                            "confidence": "100",
                            "score_tag": "P",
                            "sentimented_concept_list": [
                                {
                                    "form": "banana",
                                    "id": "04829d79a9",
                                    "variant": "banana",
                                    "inip": "10",
                                    "endp": "15",
                                    "type": "Top>Product>Food>FruitOrVegetable",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "4389870a4a",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "d6a74cda8b",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                }
                            ]
                        },
                        {
                            "text": "happy",
                            "inip": "59",
                            "endp": "63",
                            "confidence": "100",
                            "score_tag": "P",
                            "sentimented_concept_list": [
                                {
                                    "form": "banana",
                                    "id": "04829d79a9",
                                    "variant": "banana",
                                    "inip": "10",
                                    "endp": "15",
                                    "type": "Top>Product>Food>FruitOrVegetable",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "4389870a4a",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "d6a74cda8b",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                }
                            ]
                        },
                        {
                            "text": "angry",
                            "inip": "65",
                            "endp": "69",
                            "confidence": "100",
                            "score_tag": "N",
                            "sentimented_concept_list": [
                                {
                                    "form": "banana",
                                    "id": "04829d79a9",
                                    "variant": "banana",
                                    "inip": "10",
                                    "endp": "15",
                                    "type": "Top>Product>Food>FruitOrVegetable",
                                    "score_tag": "N"
                                },
                                {
                                    "form": "love",
                                    "id": "4389870a4a",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "N"
                                },
                                {
                                    "form": "love",
                                    "id": "d6a74cda8b",
                                    "variant": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "type": "Top>Person",
                                    "score_tag": "N"
                                }
                            ]
                        }
                    ],
                    "segment_list": [
                        {
                            "text": "sad banana love great",
                            "segment_type": "main",
                            "inip": "6",
                            "endp": "26",
                            "confidence": "98",
                            "score_tag": "P+",
                            "agreement": "AGREEMENT",
                            "polarity_term_list": [
                                {
                                    "text": "(great) sad",
                                    "inip": "6",
                                    "endp": "8",
                                    "confidence": "98",
                                    "score_tag": "N+",
                                    "sentimented_concept_list": [
                                        {
                                            "form": "banana",
                                            "id": "04829d79a9",
                                            "variant": "banana",
                                            "inip": "10",
                                            "endp": "15",
                                            "type": "Top>Product>Food>FruitOrVegetable",
                                            "score_tag": "N+"
                                        },
                                        {
                                            "form": "love",
                                            "id": "4389870a4a",
                                            "variant": "love",
                                            "inip": "17",
                                            "endp": "20",
                                            "type": "Top>Person",
                                            "score_tag": "N+"
                                        },
                                        {
                                            "form": "love",
                                            "id": "d6a74cda8b",
                                            "variant": "love",
                                            "inip": "17",
                                            "endp": "20",
                                            "type": "Top>Person",
                                            "score_tag": "N+"
                                        }
                                    ]
                                },
                                {
                                    "text": "love",
                                    "inip": "17",
                                    "endp": "20",
                                    "confidence": "100",
                                    "score_tag": "P",
                                    "sentimented_concept_list": [
                                        {
                                            "form": "banana",
                                            "id": "04829d79a9",
                                            "variant": "banana",
                                            "inip": "10",
                                            "endp": "15",
                                            "type": "Top>Product>Food>FruitOrVegetable",
                                            "score_tag": "P"
                                        },
                                        {
                                            "form": "love",
                                            "id": "4389870a4a",
                                            "variant": "love",
                                            "inip": "17",
                                            "endp": "20",
                                            "type": "Top>Person",
                                            "score_tag": "P"
                                        },
                                        {
                                            "form": "love",
                                            "id": "d6a74cda8b",
                                            "variant": "love",
                                            "inip": "17",
                                            "endp": "20",
                                            "type": "Top>Person",
                                            "score_tag": "P"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            "sentimented_entity_list": [],
            "sentimented_concept_list": [
                {
                    "form": "banana",
                    "id": "04829d79a9",
                    "type": "Top>Product>Food>FruitOrVegetable",
                    "score_tag": "P+"
                },
                {
                    "form": "love",
                    "id": "4389870a4a",
                    "type": "Top>Person",
                    "score_tag": "P+"
                },
                {
                    "form": "love",
                    "id": "d6a74cda8b",
                    "type": "Top>Person",
                    "score_tag": "P+"
                }
            ]
        }
    ],
    "sentimented_entity_list": [],
    "sentimented_concept_list": [
        {
            "form": "banana",
            "id": "04829d79a9",
            "type": "Top>Product>Food>FruitOrVegetable",
            "score_tag": "P+"
        },
        {
            "form": "love",
            "id": "4389870a4a",
            "type": "Top>Person",
            "score_tag": "P+"
        },
        {
            "form": "love",
            "id": "d6a74cda8b",
            "type": "Top>Person",
            "score_tag": "P+"
        }
    ]
}

export const submitSentence = async (sentence) => {
    // const formdata = new FormData();
    // formdata.append("key", "269a10b0ae7249a4022c77a093494421");
    // formdata.append("txt", `${sentence}`);
    // formdata.append("lang", "en");  
    // try {
    //     const response = await fetch('https://api.meaningcloud.com/sentiment-2.1', {
    //         method: 'POST',
    //         body: formdata,
    //         redirect: 'follow'
    //      })
    //     if (!response.ok) {
    //         throw Error('Sentiment Cloud fetch error')
    //     } else {
    //         const result = await response.json()
    //         console.log(result)
    //         return cleanSentimentAnalysis(result)
    //     }
    // } catch (err) {
    //     throw Error(err)
    // }
    return cleanSentimentAnalysis(newSampleResult)
}

export const submitWords = async (words, directionChange, wordType) => {
    let newWords = await Promise.all(words.map(async (word) => {
        try {
            const response = await fetch(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${word.text}?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb`)
            if (!response.ok) {
                throw Error('Thesaurus fetch error')
            } else {
                const result = await response.json()
                console.log("Thesaurus result>>>>", result)
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