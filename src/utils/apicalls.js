import { cleanSentimentAnalysis } from "./utils";

const sampleResult = {
        "status": {
            "code": "0",
            "msg": "OK",
            "credits": "1",
            "remaining_credits": "19966"
        },
        "model": "general_en",
        "score_tag": "P",
        "agreement": "DISAGREEMENT",
        "subjectivity": "SUBJECTIVE",
        "confidence": "84",
        "irony": "IRONIC",
        "sentence_list": [
            {
                "text": "I am happy sad mad glad laughing joyous",
                "inip": "0",
                "endp": "38",
                "bop": "y",
                "confidence": "94",
                "score_tag": "P",
                "agreement": "DISAGREEMENT",
                "segment_list": [
                    {
                        "text": "I am happy sad mad glad laughing joyous",
                        "segment_type": "main",
                        "inip": "0",
                        "endp": "38",
                        "confidence": "100",
                        "score_tag": "P",
                        "agreement": "DISAGREEMENT",
                        "polarity_term_list": [
                            {
                                "text": "happy",
                                "inip": "5",
                                "endp": "9",
                                "confidence": "100",
                                "score_tag": "P"
                            },
                            {
                                "text": "sad",
                                "inip": "11",
                                "endp": "13",
                                "confidence": "100",
                                "score_tag": "N"
                            },
                            {
                                "text": "mad",
                                "inip": "15",
                                "endp": "17",
                                "confidence": "100",
                                "score_tag": "N"
                            },
                            {
                                "text": "glad",
                                "inip": "19",
                                "endp": "22",
                                "confidence": "100",
                                "score_tag": "P"
                            },
                            {
                                "text": "joyous",
                                "inip": "33",
                                "endp": "38",
                                "confidence": "100",
                                "score_tag": "P+"
                            }
                        ],
                        "segment_list": [
                            {
                                "text": "laughing joyous",
                                "segment_type": "main",
                                "inip": "24",
                                "endp": "38",
                                "confidence": "100",
                                "score_tag": "P+",
                                "agreement": "AGREEMENT",
                                "polarity_term_list": [
                                    {
                                        "text": "joyous",
                                        "inip": "33",
                                        "endp": "38",
                                        "confidence": "100",
                                        "score_tag": "P+"
                                    }
                                ]
                            },
                            {
                                "text": "mad glad",
                                "segment_type": "main",
                                "inip": "15",
                                "endp": "22",
                                "confidence": "100",
                                "score_tag": "NEU",
                                "agreement": "DISAGREEMENT",
                                "polarity_term_list": [
                                    {
                                        "text": "mad",
                                        "inip": "15",
                                        "endp": "17",
                                        "confidence": "100",
                                        "score_tag": "N"
                                    },
                                    {
                                        "text": "glad",
                                        "inip": "19",
                                        "endp": "22",
                                        "confidence": "100",
                                        "score_tag": "P"
                                    }
                                ]
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

let sampleResult2 = {
    "status": {
        "code": "0",
        "msg": "OK",
        "credits": "1",
        "remaining_credits": "19965"
    },
    "model": "general_en",
    "score_tag": "NONE",
    "agreement": "AGREEMENT",
    "subjectivity": "OBJECTIVE",
    "confidence": "100",
    "irony": "NONIRONIC",
    "sentence_list": [
        {
            "text": "there is a cat",
            "inip": "0",
            "endp": "13",
            "bop": "y",
            "confidence": "100",
            "score_tag": "NONE",
            "agreement": "AGREEMENT",
            "segment_list": [
                {
                    "text": "there is a cat",
                    "segment_type": "secondary",
                    "inip": "0",
                    "endp": "13",
                    "confidence": "100",
                    "score_tag": "NONE",
                    "agreement": "AGREEMENT",
                    "polarity_term_list": [],
                    "sentimented_concept_list": [
                        {
                            "form": "cat",
                            "id": "af2c7e7b16",
                            "variant": "cat",
                            "inip": "11",
                            "endp": "13",
                            "type": "Top>LivingThing>Animal>Vertebrate>Mammal",
                            "score_tag": "NONE"
                        }
                    ]
                }
            ],
            "sentimented_entity_list": [],
            "sentimented_concept_list": [
                {
                    "form": "cat",
                    "id": "af2c7e7b16",
                    "type": "Top>LivingThing>Animal>Vertebrate>Mammal",
                    "score_tag": "NONE"
                }
            ]
        }
    ],
    "sentimented_entity_list": [],
    "sentimented_concept_list": [
        {
            "form": "cat",
            "id": "af2c7e7b16",
            "type": "Top>LivingThing>Animal>Vertebrate>Mammal",
            "score_tag": "NONE"
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