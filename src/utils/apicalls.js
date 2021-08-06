import { cleanSentimentAnalysis } from "./utils";

const sampleResult = {
    "status": {
        "code": "0",
        "msg": "OK",
        "credits": "1",
        "remaining_credits": "19972"
    },
    "model": "general_en",
    "score_tag": "P",
    "agreement": "AGREEMENT",
    "subjectivity": "SUBJECTIVE",
    "confidence": "100",
    "irony": "NONIRONIC",
    "sentence_list": [
        {
            "text": "love happy friends of course yes laughter joy",
            "inip": "0",
            "endp": "44",
            "bop": "y",
            "confidence": "100",
            "score_tag": "P",
            "agreement": "AGREEMENT",
            "segment_list": [
                {
                    "text": "love happy friends of course yes laughter joy",
                    "segment_type": "main",
                    "inip": "0",
                    "endp": "44",
                    "confidence": "100",
                    "score_tag": "P",
                    "agreement": "AGREEMENT",
                    "polarity_term_list": [
                        {
                            "text": "love",
                            "inip": "0",
                            "endp": "3",
                            "confidence": "100",
                            "score_tag": "P",
                            "sentimented_concept_list": [
                                {
                                    "form": "love",
                                    "id": "4389870a4a",
                                    "variant": "love",
                                    "inip": "0",
                                    "endp": "3",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "d6a74cda8b",
                                    "variant": "love",
                                    "inip": "0",
                                    "endp": "3",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "friend",
                                    "id": "2f1f98e4bb",
                                    "variant": "friends",
                                    "inip": "11",
                                    "endp": "17",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                }
                            ]
                        },
                        {
                            "text": "happy",
                            "inip": "5",
                            "endp": "9",
                            "confidence": "100",
                            "score_tag": "P",
                            "sentimented_concept_list": [
                                {
                                    "form": "love",
                                    "id": "4389870a4a",
                                    "variant": "love",
                                    "inip": "0",
                                    "endp": "3",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "d6a74cda8b",
                                    "variant": "love",
                                    "inip": "0",
                                    "endp": "3",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "friend",
                                    "id": "2f1f98e4bb",
                                    "variant": "friends",
                                    "inip": "11",
                                    "endp": "17",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                }
                            ]
                        },
                        {
                            "text": "friend",
                            "inip": "11",
                            "endp": "17",
                            "confidence": "100",
                            "score_tag": "P",
                            "sentimented_concept_list": [
                                {
                                    "form": "love",
                                    "id": "4389870a4a",
                                    "variant": "love",
                                    "inip": "0",
                                    "endp": "3",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "d6a74cda8b",
                                    "variant": "love",
                                    "inip": "0",
                                    "endp": "3",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "friend",
                                    "id": "2f1f98e4bb",
                                    "variant": "friends",
                                    "inip": "11",
                                    "endp": "17",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                }
                            ]
                        },
                        {
                            "text": "joy",
                            "inip": "42",
                            "endp": "44",
                            "confidence": "100",
                            "score_tag": "P",
                            "sentimented_concept_list": [
                                {
                                    "form": "love",
                                    "id": "4389870a4a",
                                    "variant": "love",
                                    "inip": "0",
                                    "endp": "3",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "love",
                                    "id": "d6a74cda8b",
                                    "variant": "love",
                                    "inip": "0",
                                    "endp": "3",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                },
                                {
                                    "form": "friend",
                                    "id": "2f1f98e4bb",
                                    "variant": "friends",
                                    "inip": "11",
                                    "endp": "17",
                                    "type": "Top>Person",
                                    "score_tag": "P"
                                }
                            ]
                        }
                    ],
                    "segment_list": [
                        {
                            "text": "happy friends",
                            "segment_type": "main",
                            "inip": "5",
                            "endp": "17",
                            "confidence": "100",
                            "score_tag": "P",
                            "agreement": "AGREEMENT",
                            "polarity_term_list": [
                                {
                                    "text": "happy",
                                    "inip": "5",
                                    "endp": "9",
                                    "confidence": "100",
                                    "score_tag": "P",
                                    "sentimented_concept_list": [
                                        {
                                            "form": "friend",
                                            "id": "2f1f98e4bb",
                                            "variant": "friends",
                                            "inip": "11",
                                            "endp": "17",
                                            "type": "Top>Person",
                                            "score_tag": "P"
                                        }
                                    ]
                                },
                                {
                                    "text": "friend",
                                    "inip": "11",
                                    "endp": "17",
                                    "confidence": "100",
                                    "score_tag": "P",
                                    "sentimented_concept_list": [
                                        {
                                            "form": "friend",
                                            "id": "2f1f98e4bb",
                                            "variant": "friends",
                                            "inip": "11",
                                            "endp": "17",
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
                    "form": "friend",
                    "id": "2f1f98e4bb",
                    "type": "Top>Person",
                    "score_tag": "P"
                },
                {
                    "form": "love",
                    "id": "4389870a4a",
                    "type": "Top>Person",
                    "score_tag": "P"
                },
                {
                    "form": "love",
                    "id": "d6a74cda8b",
                    "type": "Top>Person",
                    "score_tag": "P"
                }
            ]
        }
    ],
    "sentimented_entity_list": [],
    "sentimented_concept_list": [
        {
            "form": "friend",
            "id": "2f1f98e4bb",
            "type": "Top>Person",
            "score_tag": "P"
        },
        {
            "form": "love",
            "id": "4389870a4a",
            "type": "Top>Person",
            "score_tag": "P"
        },
        {
            "form": "love",
            "id": "d6a74cda8b",
            "type": "Top>Person",
            "score_tag": "P"
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
    //     const result = await response.json()
    //     console.log(result)
    //     return cleanSentimentAnalysis(result)
    // } catch (err) {
    //     throw Error(err)
    // }
    return cleanSentimentAnalysis(sampleResult)
}