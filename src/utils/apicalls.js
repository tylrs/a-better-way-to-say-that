import { cleanSentimentAnalysis, findNewWord } from "./utils";

const sampleResultPositiveAndNegative = {
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

const sampleResultNeutral = {
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

const sampleResultPositive = {
    "status": {
        "code": "0",
        "msg": "OK",
        "credits": "1",
        "remaining_credits": "19962"
    },
    "model": "general_en",
    "score_tag": "P",
    "agreement": "AGREEMENT",
    "subjectivity": "SUBJECTIVE",
    "confidence": "100",
    "irony": "NONIRONIC",
    "sentence_list": [
        {
            "text": "I am smiling",
            "inip": "0",
            "endp": "11",
            "bop": "y",
            "confidence": "100",
            "score_tag": "P",
            "agreement": "AGREEMENT",
            "segment_list": [
                {
                    "text": "I am smiling",
                    "segment_type": "main",
                    "inip": "0",
                    "endp": "11",
                    "confidence": "100",
                    "score_tag": "P",
                    "agreement": "AGREEMENT",
                    "polarity_term_list": [
                        {
                            "text": "smiling",
                            "inip": "5",
                            "endp": "11",
                            "confidence": "100",
                            "score_tag": "P"
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

const sampleResultNegative = {
    "status": {
        "code": "0",
        "msg": "OK",
        "credits": "1",
        "remaining_credits": "19963"
    },
    "model": "general_en",
    "score_tag": "N",
    "agreement": "AGREEMENT",
    "subjectivity": "SUBJECTIVE",
    "confidence": "100",
    "irony": "NONIRONIC",
    "sentence_list": [
        {
            "text": "I am crying",
            "inip": "0",
            "endp": "10",
            "bop": "y",
            "confidence": "100",
            "score_tag": "N",
            "agreement": "AGREEMENT",
            "segment_list": [
                {
                    "text": "I am crying",
                    "segment_type": "main",
                    "inip": "0",
                    "endp": "10",
                    "confidence": "100",
                    "score_tag": "N",
                    "agreement": "AGREEMENT",
                    "polarity_term_list": [
                        {
                            "text": "cry@V",
                            "inip": "2",
                            "endp": "10",
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

const sampleThesaurusGlad = [
    {
        "meta": {
            "id": "glad",
            "uuid": "057ef174-76a7-4ff9-88c6-e4b82e7c5561",
            "src": "coll_thes",
            "section": "alpha",
            "target": {
                "tuuid": "2038fbdd-a0b2-4f3a-b152-0defe5c0360a",
                "tsrc": "collegiate"
            },
            "stems": [
                "glad",
                "gladder",
                "gladdest",
                "gladlier",
                "gladliest",
                "gladly",
                "gladness",
                "gladnesses"
            ],
            "syns": [
                [
                    "blissful",
                    "chuffed",
                    "delighted",
                    "gratified",
                    "happy",
                    "joyful",
                    "joyous",
                    "pleased",
                    "satisfied",
                    "thankful",
                    "tickled"
                ],
                [
                    "amenable",
                    "disposed",
                    "fain",
                    "game",
                    "inclined",
                    "minded",
                    "ready",
                    "willing"
                ],
                [
                    "bright",
                    "cheerful",
                    "cheering",
                    "cheery",
                    "gay"
                ],
                [
                    "appreciative",
                    "appreciatory",
                    "grateful",
                    "obliged",
                    "thankful"
                ]
            ],
            "ants": [
                [
                    "displeased",
                    "dissatisfied",
                    "joyless",
                    "sad",
                    "unhappy",
                    "unpleased",
                    "unsatisfied"
                ],
                [
                    "disinclined",
                    "unamenable",
                    "unwilling"
                ],
                [
                    "bleak",
                    "cheerless",
                    "dark",
                    "depressing",
                    "dismal",
                    "dreary",
                    "gloomy",
                    "gray"
                ],
                [
                    "inappreciative",
                    "thankless",
                    "unappreciative",
                    "ungrateful"
                ]
            ],
            "offensive": false
        },
        "hwi": {
            "hw": "glad"
        },
        "fl": "adjective",
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "sn": "1",
                                "dt": [
                                    [
                                        "text",
                                        "experiencing pleasure, satisfaction, or delight "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "the man was {it}glad{/it} to see his old college buddies again, after so long an absence"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "blissful"
                                        },
                                        {
                                            "wd": "chuffed",
                                            "wsls": [
                                                "British"
                                            ]
                                        },
                                        {
                                            "wd": "delighted"
                                        },
                                        {
                                            "wd": "gratified"
                                        },
                                        {
                                            "wd": "happy"
                                        },
                                        {
                                            "wd": "joyful"
                                        },
                                        {
                                            "wd": "joyous"
                                        },
                                        {
                                            "wd": "pleased"
                                        },
                                        {
                                            "wd": "satisfied"
                                        },
                                        {
                                            "wd": "thankful"
                                        },
                                        {
                                            "wd": "tickled"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "beaming"
                                        },
                                        {
                                            "wd": "blithe"
                                        },
                                        {
                                            "wd": "blithesome"
                                        },
                                        {
                                            "wd": "buoyant"
                                        },
                                        {
                                            "wd": "cheerful"
                                        },
                                        {
                                            "wd": "cheery"
                                        },
                                        {
                                            "wd": "gay"
                                        },
                                        {
                                            "wd": "gladsome"
                                        },
                                        {
                                            "wd": "lighthearted"
                                        },
                                        {
                                            "wd": "sunny"
                                        },
                                        {
                                            "wd": "upbeat"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "gleeful"
                                        },
                                        {
                                            "wd": "jocund"
                                        },
                                        {
                                            "wd": "jolly"
                                        },
                                        {
                                            "wd": "jovial"
                                        },
                                        {
                                            "wd": "laughing"
                                        },
                                        {
                                            "wd": "merry"
                                        },
                                        {
                                            "wd": "mirthful"
                                        },
                                        {
                                            "wd": "smiling"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "beatific"
                                        },
                                        {
                                            "wd": "ecstatic"
                                        },
                                        {
                                            "wd": "elated"
                                        },
                                        {
                                            "wd": "enraptured"
                                        },
                                        {
                                            "wd": "entranced"
                                        },
                                        {
                                            "wd": "euphoric"
                                        },
                                        {
                                            "wd": "exhilarated"
                                        },
                                        {
                                            "wd": "intoxicated"
                                        },
                                        {
                                            "wd": "rapturous"
                                        },
                                        {
                                            "wd": "rhapsodic",
                                            "wvrs": [
                                                {
                                                    "wvl": "also",
                                                    "wva": "rhapsodical"
                                                }
                                            ]
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "exuberant"
                                        },
                                        {
                                            "wd": "exultant"
                                        },
                                        {
                                            "wd": "jubilant"
                                        },
                                        {
                                            "wd": "rapt"
                                        },
                                        {
                                            "wd": "rejoicing"
                                        },
                                        {
                                            "wd": "thrilled"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "hopeful"
                                        },
                                        {
                                            "wd": "optimistic"
                                        },
                                        {
                                            "wd": "rosy"
                                        },
                                        {
                                            "wd": "sanguine"
                                        }
                                    ]
                                ],
                                "near_list": [
                                    [
                                        {
                                            "wd": "abject"
                                        },
                                        {
                                            "wd": "aggrieved"
                                        },
                                        {
                                            "wd": "anguished"
                                        },
                                        {
                                            "wd": "blue"
                                        },
                                        {
                                            "wd": "brokenhearted"
                                        },
                                        {
                                            "wd": "dejected"
                                        },
                                        {
                                            "wd": "depressed"
                                        },
                                        {
                                            "wd": "despondent"
                                        },
                                        {
                                            "wd": "disconsolate"
                                        },
                                        {
                                            "wd": "disheartened"
                                        },
                                        {
                                            "wd": "downcast"
                                        },
                                        {
                                            "wd": "downhearted"
                                        },
                                        {
                                            "wd": "forlorn"
                                        },
                                        {
                                            "wd": "melancholy"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "doleful"
                                        },
                                        {
                                            "wd": "dolorous"
                                        },
                                        {
                                            "wd": "lachrymose"
                                        },
                                        {
                                            "wd": "mournful"
                                        },
                                        {
                                            "wd": "plaintive"
                                        },
                                        {
                                            "wd": "sorrowful"
                                        },
                                        {
                                            "wd": "sorry"
                                        },
                                        {
                                            "wd": "woeful"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "black"
                                        },
                                        {
                                            "wd": "dark"
                                        },
                                        {
                                            "wd": "desolate"
                                        },
                                        {
                                            "wd": "dispirited"
                                        },
                                        {
                                            "wd": "gloomy"
                                        },
                                        {
                                            "wd": "glum"
                                        },
                                        {
                                            "wd": "gray",
                                            "wvrs": [
                                                {
                                                    "wvl": "also",
                                                    "wva": "grey"
                                                }
                                            ]
                                        },
                                        {
                                            "wd": "grieved"
                                        },
                                        {
                                            "wd": "heartbroken"
                                        },
                                        {
                                            "wd": "heartsick"
                                        },
                                        {
                                            "wd": "miserable"
                                        },
                                        {
                                            "wd": "woebegone"
                                        },
                                        {
                                            "wd": "wretched"
                                        }
                                    ]
                                ],
                                "ant_list": [
                                    [
                                        {
                                            "wd": "displeased"
                                        },
                                        {
                                            "wd": "dissatisfied"
                                        },
                                        {
                                            "wd": "joyless"
                                        },
                                        {
                                            "wd": "sad"
                                        },
                                        {
                                            "wd": "unhappy"
                                        },
                                        {
                                            "wd": "unpleased"
                                        },
                                        {
                                            "wd": "unsatisfied"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ],
                    [
                        [
                            "sense",
                            {
                                "sn": "2",
                                "dt": [
                                    [
                                        "text",
                                        "having a desire or inclination (as for a specified course of action) "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "I am {it}glad{/it} to do the work if it will help the cause"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "amenable"
                                        },
                                        {
                                            "wd": "disposed"
                                        },
                                        {
                                            "wd": "fain"
                                        },
                                        {
                                            "wd": "game"
                                        },
                                        {
                                            "wd": "inclined"
                                        },
                                        {
                                            "wd": "minded"
                                        },
                                        {
                                            "wd": "ready"
                                        },
                                        {
                                            "wd": "willing"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "predisposed"
                                        },
                                        {
                                            "wd": "prone"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "accommodating"
                                        },
                                        {
                                            "wd": "agreeable"
                                        },
                                        {
                                            "wd": "compliant"
                                        },
                                        {
                                            "wd": "cooperative"
                                        },
                                        {
                                            "wd": "obedient"
                                        },
                                        {
                                            "wd": "obliging"
                                        },
                                        {
                                            "wd": "submissive"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "favorable"
                                        },
                                        {
                                            "wd": "receptive"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "prepared"
                                        },
                                        {
                                            "wd": "prompt"
                                        },
                                        {
                                            "wd": "quick"
                                        },
                                        {
                                            "wd": "responsive"
                                        },
                                        {
                                            "wd": "swift"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "desirous"
                                        },
                                        {
                                            "wd": "eager"
                                        },
                                        {
                                            "wd": "enthused"
                                        },
                                        {
                                            "wd": "enthusiastic"
                                        },
                                        {
                                            "wd": "excited"
                                        }
                                    ]
                                ],
                                "near_list": [
                                    [
                                        {
                                            "wd": "averse"
                                        },
                                        {
                                            "wd": "loath",
                                            "wvrs": [
                                                {
                                                    "wvl": "also",
                                                    "wva": "loth"
                                                },
                                                {
                                                    "wvl": "or",
                                                    "wva": "loathe"
                                                }
                                            ]
                                        },
                                        {
                                            "wd": "reluctant"
                                        },
                                        {
                                            "wd": "reticent"
                                        }
                                    ]
                                ],
                                "ant_list": [
                                    [
                                        {
                                            "wd": "disinclined"
                                        },
                                        {
                                            "wd": "unamenable"
                                        },
                                        {
                                            "wd": "unwilling"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ],
                    [
                        [
                            "sense",
                            {
                                "sn": "3",
                                "dt": [
                                    [
                                        "text",
                                        "serving to lift one's spirits "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "doctors brought {it}glad{/it} tidings to the reporters awaiting news of the queen's condition"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "bright"
                                        },
                                        {
                                            "wd": "cheerful"
                                        },
                                        {
                                            "wd": "cheering"
                                        },
                                        {
                                            "wd": "cheery"
                                        },
                                        {
                                            "wd": "gay"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "gladdening"
                                        },
                                        {
                                            "wd": "heartening"
                                        },
                                        {
                                            "wd": "heartwarming"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "gleaming"
                                        },
                                        {
                                            "wd": "radiant"
                                        },
                                        {
                                            "wd": "sparkling"
                                        }
                                    ]
                                ],
                                "near_list": [
                                    [
                                        {
                                            "wd": "discouraging"
                                        },
                                        {
                                            "wd": "disheartening"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "colorless"
                                        },
                                        {
                                            "wd": "drab"
                                        },
                                        {
                                            "wd": "dull"
                                        },
                                        {
                                            "wd": "lackluster"
                                        },
                                        {
                                            "wd": "lusterless"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "black"
                                        },
                                        {
                                            "wd": "desolate"
                                        },
                                        {
                                            "wd": "dispiriting"
                                        }
                                    ]
                                ],
                                "ant_list": [
                                    [
                                        {
                                            "wd": "bleak"
                                        },
                                        {
                                            "wd": "cheerless"
                                        },
                                        {
                                            "wd": "dark"
                                        },
                                        {
                                            "wd": "depressing"
                                        },
                                        {
                                            "wd": "dismal"
                                        },
                                        {
                                            "wd": "dreary"
                                        },
                                        {
                                            "wd": "gloomy"
                                        },
                                        {
                                            "wd": "gray",
                                            "wvrs": [
                                                {
                                                    "wvl": "also",
                                                    "wva": "grey"
                                                }
                                            ]
                                        }
                                    ]
                                ]
                            }
                        ]
                    ],
                    [
                        [
                            "sense",
                            {
                                "sn": "4",
                                "dt": [
                                    [
                                        "text",
                                        "feeling or expressing gratitude "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "she was {it}glad{/it} of the offer of a ride home"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "appreciative"
                                        },
                                        {
                                            "wd": "appreciatory"
                                        },
                                        {
                                            "wd": "grateful"
                                        },
                                        {
                                            "wd": "obliged"
                                        },
                                        {
                                            "wd": "thankful"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "beholden"
                                        },
                                        {
                                            "wd": "indebted"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "contented"
                                        },
                                        {
                                            "wd": "delighted"
                                        },
                                        {
                                            "wd": "gratified"
                                        },
                                        {
                                            "wd": "pleased"
                                        },
                                        {
                                            "wd": "satisfied"
                                        },
                                        {
                                            "wd": "tickled"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "thanking"
                                        }
                                    ]
                                ],
                                "near_list": [
                                    [
                                        {
                                            "wd": "inhospitable"
                                        },
                                        {
                                            "wd": "rude"
                                        },
                                        {
                                            "wd": "thoughtless"
                                        },
                                        {
                                            "wd": "ungracious"
                                        }
                                    ]
                                ],
                                "ant_list": [
                                    [
                                        {
                                            "wd": "inappreciative"
                                        },
                                        {
                                            "wd": "thankless"
                                        },
                                        {
                                            "wd": "unappreciative"
                                        },
                                        {
                                            "wd": "ungrateful"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "experiencing pleasure, satisfaction, or delight",
            "having a desire or inclination (as for a specified course of action)",
            "serving to lift one's spirits"
        ]
    },
    {
        "meta": {
            "id": "glad",
            "uuid": "c6925275-1357-4426-8d43-150ce8995c58",
            "src": "coll_thes",
            "section": "alpha",
            "target": {
                "tuuid": "2a95df85-51cd-4502-84fb-5663298912b0",
                "tsrc": "collegiate"
            },
            "stems": [
                "glad",
                "gladded",
                "gladding",
                "glads"
            ],
            "syns": [
                [
                    "agree (with)",
                    "content",
                    "delight",
                    "feast",
                    "gas",
                    "gladden",
                    "gratify",
                    "please",
                    "pleasure",
                    "rejoice",
                    "satisfy",
                    "suit",
                    "warm"
                ]
            ],
            "ants": [
                [
                    "displease"
                ]
            ],
            "offensive": false
        },
        "hwi": {
            "hw": "glad"
        },
        "fl": "verb",
        "sls": [
            "archaic"
        ],
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "dt": [
                                    [
                                        "text",
                                        "to give satisfaction to "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "it hath {it}gladded{/it} my heart to see thy face again"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "agree (with)"
                                        },
                                        {
                                            "wd": "content"
                                        },
                                        {
                                            "wd": "delight"
                                        },
                                        {
                                            "wd": "feast"
                                        },
                                        {
                                            "wd": "gas",
                                            "wsls": [
                                                "slang"
                                            ]
                                        },
                                        {
                                            "wd": "gladden"
                                        },
                                        {
                                            "wd": "gratify"
                                        },
                                        {
                                            "wd": "please"
                                        },
                                        {
                                            "wd": "pleasure"
                                        },
                                        {
                                            "wd": "rejoice"
                                        },
                                        {
                                            "wd": "satisfy"
                                        },
                                        {
                                            "wd": "suit"
                                        },
                                        {
                                            "wd": "warm"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "appease"
                                        },
                                        {
                                            "wd": "mollify"
                                        },
                                        {
                                            "wd": "pacify"
                                        },
                                        {
                                            "wd": "placate"
                                        },
                                        {
                                            "wd": "soothe"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "assuage"
                                        },
                                        {
                                            "wd": "quench"
                                        },
                                        {
                                            "wd": "sate"
                                        },
                                        {
                                            "wd": "satiate"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "excite"
                                        },
                                        {
                                            "wd": "tickle"
                                        },
                                        {
                                            "wd": "titillate"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "amuse"
                                        },
                                        {
                                            "wd": "divert"
                                        },
                                        {
                                            "wd": "entertain"
                                        },
                                        {
                                            "wd": "treat"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "captivate"
                                        },
                                        {
                                            "wd": "charm"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "galvanize"
                                        },
                                        {
                                            "wd": "thrill"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "calm"
                                        },
                                        {
                                            "wd": "comfort"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "cater (to)"
                                        },
                                        {
                                            "wd": "humor"
                                        },
                                        {
                                            "wd": "indulge"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "coddle"
                                        },
                                        {
                                            "wd": "mollycoddle"
                                        },
                                        {
                                            "wd": "pamper"
                                        },
                                        {
                                            "wd": "spoil"
                                        }
                                    ]
                                ],
                                "near_list": [
                                    [
                                        {
                                            "wd": "aggravate"
                                        },
                                        {
                                            "wd": "annoy"
                                        },
                                        {
                                            "wd": "bother"
                                        },
                                        {
                                            "wd": "bug"
                                        },
                                        {
                                            "wd": "chafe"
                                        },
                                        {
                                            "wd": "cross"
                                        },
                                        {
                                            "wd": "exasperate"
                                        },
                                        {
                                            "wd": "gall"
                                        },
                                        {
                                            "wd": "get"
                                        },
                                        {
                                            "wd": "grate"
                                        },
                                        {
                                            "wd": "irk"
                                        },
                                        {
                                            "wd": "irritate"
                                        },
                                        {
                                            "wd": "nettle"
                                        },
                                        {
                                            "wd": "peeve"
                                        },
                                        {
                                            "wd": "perturb"
                                        },
                                        {
                                            "wd": "pique"
                                        },
                                        {
                                            "wd": "put out"
                                        },
                                        {
                                            "wd": "ruffle"
                                        },
                                        {
                                            "wd": "vex"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "anger"
                                        },
                                        {
                                            "wd": "enrage"
                                        },
                                        {
                                            "wd": "incense"
                                        },
                                        {
                                            "wd": "inflame",
                                            "wvrs": [
                                                {
                                                    "wvl": "also",
                                                    "wva": "enflame"
                                                }
                                            ]
                                        },
                                        {
                                            "wd": "infuriate"
                                        },
                                        {
                                            "wd": "madden"
                                        },
                                        {
                                            "wd": "outrage"
                                        },
                                        {
                                            "wd": "rankle"
                                        },
                                        {
                                            "wd": "rile"
                                        },
                                        {
                                            "wd": "roil"
                                        },
                                        {
                                            "wd": "steam up"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "provoke"
                                        },
                                        {
                                            "wd": "rouse"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "agitate"
                                        },
                                        {
                                            "wd": "distress"
                                        },
                                        {
                                            "wd": "disturb"
                                        },
                                        {
                                            "wd": "fret"
                                        },
                                        {
                                            "wd": "upset"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "harass"
                                        },
                                        {
                                            "wd": "harry"
                                        },
                                        {
                                            "wd": "pester"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "affront"
                                        },
                                        {
                                            "wd": "insult"
                                        },
                                        {
                                            "wd": "offend"
                                        }
                                    ]
                                ],
                                "ant_list": [
                                    [
                                        {
                                            "wd": "displease"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "to give satisfaction to"
        ]
    },
    {
        "meta": {
            "id": "glad-hander",
            "uuid": "4ec295c3-d816-4f09-b4ee-a0cc481f618f",
            "src": "coll_thes",
            "section": "alpha",
            "stems": [
                "glad-hander",
                "glad-handers"
            ],
            "syns": [
                [
                    "backslapper",
                    "extrovert"
                ]
            ],
            "ants": [
                [
                    "introvert",
                    "shrinking violet",
                    "wallflower"
                ]
            ],
            "offensive": false
        },
        "hwi": {
            "hw": "glad-hander"
        },
        "fl": "noun",
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "dt": [
                                    [
                                        "text",
                                        "a gregarious and unreserved person "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "an irrepressible {it}glad-hander{/it}, she's a natural for the company's public relations department"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "backslapper"
                                        },
                                        {
                                            "wd": "extrovert",
                                            "wvrs": [
                                                {
                                                    "wvl": "also",
                                                    "wva": "extravert"
                                                }
                                            ]
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "exhibitionist"
                                        },
                                        {
                                            "wd": "show-off"
                                        }
                                    ]
                                ],
                                "ant_list": [
                                    [
                                        {
                                            "wd": "introvert"
                                        },
                                        {
                                            "wd": "shrinking violet"
                                        },
                                        {
                                            "wd": "wallflower"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "a gregarious and unreserved person"
        ]
    },
    {
        "meta": {
            "id": "glad rags",
            "uuid": "48e9053a-8fe8-4633-b5fa-50781d44b838",
            "src": "coll_thes",
            "section": "alpha",
            "target": {
                "tuuid": "f70bd7dc-416c-452b-82d8-c622af174e4d",
                "tsrc": "collegiate"
            },
            "stems": [
                "glad rags"
            ],
            "syns": [
                [
                    "array",
                    "best",
                    "bravery",
                    "caparison",
                    "feather",
                    "finery",
                    "frippery",
                    "full dress",
                    "gaiety",
                    "regalia"
                ]
            ],
            "ants": [],
            "offensive": false
        },
        "hwi": {
            "hw": "glad rags"
        },
        "fl": "plural noun",
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "dt": [
                                    [
                                        "text",
                                        "dressy clothing "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "a trendy designer fashioning {it}glad rags{/it} for the beautiful people"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "array"
                                        },
                                        {
                                            "wd": "best"
                                        },
                                        {
                                            "wd": "bravery"
                                        },
                                        {
                                            "wd": "caparison"
                                        },
                                        {
                                            "wd": "feather"
                                        },
                                        {
                                            "wd": "finery"
                                        },
                                        {
                                            "wd": "frippery"
                                        },
                                        {
                                            "wd": "full dress"
                                        },
                                        {
                                            "wd": "gaiety",
                                            "wvrs": [
                                                {
                                                    "wvl": "also",
                                                    "wva": "gayety"
                                                }
                                            ]
                                        },
                                        {
                                            "wd": "regalia"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "apparel"
                                        },
                                        {
                                            "wd": "attire"
                                        },
                                        {
                                            "wd": "costume"
                                        },
                                        {
                                            "wd": "duds"
                                        },
                                        {
                                            "wd": "habiliment(s)"
                                        },
                                        {
                                            "wd": "rags"
                                        },
                                        {
                                            "wd": "raiment"
                                        },
                                        {
                                            "wd": "rig"
                                        },
                                        {
                                            "wd": "rigging"
                                        },
                                        {
                                            "wd": "threads"
                                        },
                                        {
                                            "wd": "toggery"
                                        },
                                        {
                                            "wd": "togs"
                                        },
                                        {
                                            "wd": "vestiary"
                                        },
                                        {
                                            "wd": "vesture"
                                        },
                                        {
                                            "wd": "wear"
                                        }
                                    ]
                                ],
                                "phrase_list": [
                                    [
                                        {
                                            "wd": "best bib and tucker"
                                        }
                                    ]
                                ],
                                "near_list": [
                                    [
                                        {
                                            "wd": "tatters"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "disarray"
                                        },
                                        {
                                            "wd": "dishabille"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "dressy clothing"
        ]
    },
    {
        "meta": {
            "id": "glad hand",
            "uuid": "8cd76c7f-b174-497d-b64a-c2ba8c51f8c3",
            "src": "CTcompile",
            "section": "alpha",
            "stems": [
                "glad hand"
            ],
            "syns": [
                [
                    "welcome mat",
                    "acceptance",
                    "embrace",
                    "welcome",
                    "open arms"
                ]
            ],
            "ants": [
                [
                    "brush-off",
                    "cold shoulder",
                    "rebuff",
                    "repulse",
                    "silent treatment",
                    "snub",
                    "dismissal",
                    "kiss-off",
                    "rejection",
                    "banishment",
                    "blackball",
                    "ostracism"
                ]
            ],
            "offensive": false
        },
        "hwi": {
            "hw": "glad hand"
        },
        "fl": "noun",
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "dt": [
                                    [
                                        "text",
                                        "as in {it}welcome mat{/it}"
                                    ]
                                ],
                                "sim_list": [
                                    [
                                        {
                                            "wd": "welcome mat"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "acceptance"
                                        },
                                        {
                                            "wd": "embrace"
                                        },
                                        {
                                            "wd": "welcome"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "open arms"
                                        }
                                    ]
                                ],
                                "opp_list": [
                                    [
                                        {
                                            "wd": "brush-off"
                                        },
                                        {
                                            "wd": "cold shoulder"
                                        },
                                        {
                                            "wd": "rebuff"
                                        },
                                        {
                                            "wd": "repulse"
                                        },
                                        {
                                            "wd": "silent treatment"
                                        },
                                        {
                                            "wd": "snub"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "dismissal"
                                        },
                                        {
                                            "wd": "kiss-off"
                                        },
                                        {
                                            "wd": "rejection"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "banishment"
                                        },
                                        {
                                            "wd": "blackball"
                                        },
                                        {
                                            "wd": "ostracism"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "as in welcome mat"
        ]
    },
    {
        "meta": {
            "id": "glad hands",
            "uuid": "10f315f3-f307-459a-8da9-ab58dff06167",
            "src": "CTcompile",
            "section": "alpha",
            "stems": [
                "glad hands"
            ],
            "syns": [
                [
                    "welcome mats",
                    "acceptances",
                    "embraces",
                    "welcomes",
                    "open arms"
                ]
            ],
            "ants": [
                [
                    "brush-offs",
                    "cold shoulders",
                    "rebuffs",
                    "repulses",
                    "silent treatments",
                    "snubs",
                    "dismissals",
                    "kiss-offs",
                    "rejections",
                    "banishments",
                    "blackballs",
                    "ostracisms"
                ]
            ],
            "offensive": false
        },
        "hwi": {
            "hw": "glad hands"
        },
        "fl": "noun",
        "sls": [
            "plural of {d_link|glad hand|glad hand}"
        ],
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "dt": [
                                    [
                                        "text",
                                        "as in {it}welcome mats{/it}"
                                    ]
                                ],
                                "sim_list": [
                                    [
                                        {
                                            "wd": "welcome mats"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "acceptances"
                                        },
                                        {
                                            "wd": "embraces"
                                        },
                                        {
                                            "wd": "welcomes"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "open arms"
                                        }
                                    ]
                                ],
                                "opp_list": [
                                    [
                                        {
                                            "wd": "brush-offs"
                                        },
                                        {
                                            "wd": "cold shoulders"
                                        },
                                        {
                                            "wd": "rebuffs"
                                        },
                                        {
                                            "wd": "repulses"
                                        },
                                        {
                                            "wd": "silent treatments"
                                        },
                                        {
                                            "wd": "snubs"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "dismissals"
                                        },
                                        {
                                            "wd": "kiss-offs"
                                        },
                                        {
                                            "wd": "rejections"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "banishments"
                                        },
                                        {
                                            "wd": "blackballs"
                                        },
                                        {
                                            "wd": "ostracisms"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "as in welcome mats"
        ]
    },
    {
        "meta": {
            "id": "glad-handers",
            "uuid": "8b98bb06-2555-43ef-b931-bba1976287ba",
            "src": "coll_thes",
            "section": "alpha",
            "stems": [
                "glad-handers"
            ],
            "syns": [
                [
                    "backslappers",
                    "extroverts"
                ]
            ],
            "ants": [
                [
                    "introverts",
                    "shrinking violets",
                    "wallflowers"
                ]
            ],
            "offensive": false
        },
        "hwi": {
            "hw": "glad-handers"
        },
        "fl": "noun",
        "sls": [
            "plural of {d_link|glad-hander|glad-hander}"
        ],
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "dt": [
                                    [
                                        "text",
                                        "a gregarious and unreserved person "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "an irrepressible {it}glad-hander{/it}, she's a natural for the company's public relations department"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "backslappers"
                                        },
                                        {
                                            "wd": "extroverts",
                                            "wvrs": [
                                                {
                                                    "wvl": "also",
                                                    "wva": "extraverts"
                                                }
                                            ]
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "exhibitionists"
                                        },
                                        {
                                            "wd": "show-offs"
                                        }
                                    ]
                                ],
                                "ant_list": [
                                    [
                                        {
                                            "wd": "introverts"
                                        },
                                        {
                                            "wd": "shrinking violets"
                                        },
                                        {
                                            "wd": "wallflowers"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "a gregarious and unreserved person"
        ]
    }
]

const sampleThesaurusCrying = [
    {
        "meta": {
            "id": "crying",
            "uuid": "251a0d9d-5332-4059-a118-6765236d36c0",
            "src": "coll_thes",
            "section": "alpha",
            "target": {
                "tuuid": "7c583e4d-6841-4118-b3f2-c84a4e22b734",
                "tsrc": "collegiate"
            },
            "stems": [
                "crying"
            ],
            "syns": [
                [
                    "acute",
                    "burning",
                    "clamant",
                    "compelling",
                    "critical",
                    "dire",
                    "emergent",
                    "exigent",
                    "imperative",
                    "imperious",
                    "importunate",
                    "instant",
                    "necessitous",
                    "pressing",
                    "urgent"
                ]
            ],
            "ants": [
                [
                    "noncritical",
                    "nonurgent"
                ]
            ],
            "offensive": false
        },
        "hwi": {
            "hw": "crying"
        },
        "fl": "adjective",
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "dt": [
                                    [
                                        "text",
                                        "needing immediate attention "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "a {it}crying{/it} need for more activities for young people in this town"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "acute"
                                        },
                                        {
                                            "wd": "burning"
                                        },
                                        {
                                            "wd": "clamant"
                                        },
                                        {
                                            "wd": "compelling"
                                        },
                                        {
                                            "wd": "critical"
                                        },
                                        {
                                            "wd": "dire"
                                        },
                                        {
                                            "wd": "emergent"
                                        },
                                        {
                                            "wd": "exigent"
                                        },
                                        {
                                            "wd": "imperative"
                                        },
                                        {
                                            "wd": "imperious"
                                        },
                                        {
                                            "wd": "importunate"
                                        },
                                        {
                                            "wd": "instant"
                                        },
                                        {
                                            "wd": "necessitous"
                                        },
                                        {
                                            "wd": "pressing"
                                        },
                                        {
                                            "wd": "urgent"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "demanding"
                                        },
                                        {
                                            "wd": "extreme"
                                        },
                                        {
                                            "wd": "immediate"
                                        },
                                        {
                                            "wd": "insistent"
                                        },
                                        {
                                            "wd": "intense"
                                        },
                                        {
                                            "wd": "overriding"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "crucial"
                                        },
                                        {
                                            "wd": "desperate"
                                        },
                                        {
                                            "wd": "grave"
                                        },
                                        {
                                            "wd": "life-and-death",
                                            "wvrs": [
                                                {
                                                    "wvl": "also",
                                                    "wva": "life-or-death"
                                                }
                                            ]
                                        },
                                        {
                                            "wd": "serious"
                                        },
                                        {
                                            "wd": "severe"
                                        },
                                        {
                                            "wd": "vital"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "dangerous"
                                        },
                                        {
                                            "wd": "explosive"
                                        },
                                        {
                                            "wd": "hazardous"
                                        },
                                        {
                                            "wd": "perilous"
                                        },
                                        {
                                            "wd": "precarious"
                                        },
                                        {
                                            "wd": "unstable"
                                        }
                                    ]
                                ],
                                "near_list": [
                                    [
                                        {
                                            "wd": "incidental"
                                        },
                                        {
                                            "wd": "low-pressure"
                                        },
                                        {
                                            "wd": "minor"
                                        },
                                        {
                                            "wd": "negligible"
                                        },
                                        {
                                            "wd": "trivial"
                                        },
                                        {
                                            "wd": "unimportant"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "nonthreatening"
                                        },
                                        {
                                            "wd": "safe"
                                        },
                                        {
                                            "wd": "stable"
                                        }
                                    ]
                                ],
                                "ant_list": [
                                    [
                                        {
                                            "wd": "noncritical"
                                        },
                                        {
                                            "wd": "nonurgent"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "needing immediate attention"
        ]
    },
    {
        "meta": {
            "id": "crying",
            "uuid": "7522bbfe-a447-4549-b4d8-a1bb3707846e",
            "src": "CTcompile",
            "section": "alpha",
            "stems": [
                "crying"
            ],
            "syns": [
                [
                    "blubbering",
                    "sniveling",
                    "sobbing",
                    "weeping",
                    "whimpering",
                    "whining",
                    "yammering",
                    "groan",
                    "moan",
                    "wail",
                    "keen",
                    "lament",
                    "lamentation",
                    "plaint",
                    "bawl",
                    "cry",
                    "howl",
                    "shriek",
                    "squall",
                    "whimper",
                    "whine",
                    "yelp",
                    "yowl"
                ]
            ],
            "ants": [
                [
                    "cackle",
                    "chortle",
                    "chuckle",
                    "giggle",
                    "guffaw",
                    "laugh",
                    "snicker",
                    "snigger",
                    "titter",
                    "twitter"
                ]
            ],
            "offensive": false
        },
        "hwi": {
            "hw": "crying"
        },
        "fl": "noun",
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "dt": [
                                    [
                                        "text",
                                        "as in {it}weeping{/it}, {it}whining{/it}"
                                    ]
                                ],
                                "sim_list": [
                                    [
                                        {
                                            "wd": "blubbering"
                                        },
                                        {
                                            "wd": "sniveling"
                                        },
                                        {
                                            "wd": "sobbing"
                                        },
                                        {
                                            "wd": "weeping"
                                        },
                                        {
                                            "wd": "whimpering"
                                        },
                                        {
                                            "wd": "whining"
                                        },
                                        {
                                            "wd": "yammering"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "groan"
                                        },
                                        {
                                            "wd": "moan"
                                        },
                                        {
                                            "wd": "wail"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "keen"
                                        },
                                        {
                                            "wd": "lament"
                                        },
                                        {
                                            "wd": "lamentation"
                                        },
                                        {
                                            "wd": "plaint"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "bawl"
                                        },
                                        {
                                            "wd": "cry"
                                        },
                                        {
                                            "wd": "howl"
                                        },
                                        {
                                            "wd": "shriek"
                                        },
                                        {
                                            "wd": "squall"
                                        },
                                        {
                                            "wd": "whimper"
                                        },
                                        {
                                            "wd": "whine"
                                        },
                                        {
                                            "wd": "yelp"
                                        },
                                        {
                                            "wd": "yowl"
                                        }
                                    ]
                                ],
                                "opp_list": [
                                    [
                                        {
                                            "wd": "cackle"
                                        },
                                        {
                                            "wd": "chortle"
                                        },
                                        {
                                            "wd": "chuckle"
                                        },
                                        {
                                            "wd": "giggle"
                                        },
                                        {
                                            "wd": "guffaw"
                                        },
                                        {
                                            "wd": "laugh"
                                        },
                                        {
                                            "wd": "snicker"
                                        },
                                        {
                                            "wd": "snigger"
                                        },
                                        {
                                            "wd": "titter"
                                        },
                                        {
                                            "wd": "twitter"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "as in weeping, whining"
        ]
    },
    {
        "meta": {
            "id": "crying",
            "uuid": "8e772007-c9b2-4b3c-a871-d31abd17294b",
            "src": "coll_thes",
            "section": "alpha",
            "stems": [
                "crying"
            ],
            "syns": [
                [
                    "bawling",
                    "blubbering",
                    "blubbing",
                    "sobbing",
                    "weeping"
                ],
                [
                    "calling",
                    "singing"
                ],
                [
                    "bawling",
                    "baying",
                    "bellowing",
                    "calling",
                    "hollering",
                    "holloing",
                    "roaring",
                    "shouting",
                    "sounding off",
                    "thundering",
                    "vociferating",
                    "yelling"
                ]
            ],
            "ants": [],
            "offensive": false
        },
        "hwi": {
            "hw": "crying"
        },
        "fl": "verb",
        "sls": [
            "present participle of {d_link|cry|cry}"
        ],
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "sn": "1",
                                "dt": [
                                    [
                                        "text",
                                        "to shed tears often while making meaningless sounds as a sign of pain or distress "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "some kids started to {it}cry{/it} even before the doctor had given them their shot"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "bawling"
                                        },
                                        {
                                            "wd": "blubbering"
                                        },
                                        {
                                            "wd": "blubbing",
                                            "wsls": [
                                                "chiefly British"
                                            ]
                                        },
                                        {
                                            "wd": "sobbing"
                                        },
                                        {
                                            "wd": "weeping"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "greeting",
                                            "wsls": [
                                                "Scottish"
                                            ]
                                        },
                                        {
                                            "wd": "grieving"
                                        },
                                        {
                                            "wd": "keening"
                                        },
                                        {
                                            "wd": "lamenting"
                                        },
                                        {
                                            "wd": "mourning"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "howling"
                                        },
                                        {
                                            "wd": "screaming"
                                        },
                                        {
                                            "wd": "squalling"
                                        },
                                        {
                                            "wd": "wailing"
                                        },
                                        {
                                            "wd": "yowling"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "bleating"
                                        },
                                        {
                                            "wd": "mewling"
                                        },
                                        {
                                            "wd": "puling"
                                        },
                                        {
                                            "wd": "whimpering"
                                        },
                                        {
                                            "wd": "whining"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "sniffling"
                                        },
                                        {
                                            "wd": "sniveling",
                                            "wvrs": [
                                                {
                                                    "wvl": "or",
                                                    "wva": "snivelling"
                                                }
                                            ]
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "groaning"
                                        },
                                        {
                                            "wd": "moaning"
                                        },
                                        {
                                            "wd": "sighing"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ],
                    [
                        [
                            "sense",
                            {
                                "sn": "2",
                                "dt": [
                                    [
                                        "text",
                                        "to utter one's distinctive animal sound "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "we knew that we were getting very close to the ocean when we could hear sea gulls {it}crying{/it}"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "calling"
                                        },
                                        {
                                            "wd": "singing"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ],
                    [
                        [
                            "sense",
                            {
                                "sn": "3",
                                "dt": [
                                    [
                                        "text",
                                        "to speak so as to be heard at a distance "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "a mother {it}crying{/it} for help"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "bawling"
                                        },
                                        {
                                            "wd": "baying"
                                        },
                                        {
                                            "wd": "bellowing"
                                        },
                                        {
                                            "wd": "calling"
                                        },
                                        {
                                            "wd": "hollering"
                                        },
                                        {
                                            "wd": "holloing",
                                            "wvrs": [
                                                {
                                                    "wvl": "or",
                                                    "wva": "hallooing"
                                                }
                                            ]
                                        },
                                        {
                                            "wd": "roaring"
                                        },
                                        {
                                            "wd": "shouting"
                                        },
                                        {
                                            "wd": "sounding off"
                                        },
                                        {
                                            "wd": "thundering"
                                        },
                                        {
                                            "wd": "vociferating"
                                        },
                                        {
                                            "wd": "yelling"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "crowing"
                                        },
                                        {
                                            "wd": "whooping"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "screaming"
                                        },
                                        {
                                            "wd": "screeching"
                                        },
                                        {
                                            "wd": "shrieking"
                                        },
                                        {
                                            "wd": "shrilling"
                                        },
                                        {
                                            "wd": "squeaking"
                                        },
                                        {
                                            "wd": "squealing"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "caterwauling"
                                        },
                                        {
                                            "wd": "howling"
                                        },
                                        {
                                            "wd": "ululating"
                                        },
                                        {
                                            "wd": "wailing"
                                        },
                                        {
                                            "wd": "yawping",
                                            "wvrs": [
                                                {
                                                    "wvl": "or",
                                                    "wva": "yauping"
                                                }
                                            ]
                                        },
                                        {
                                            "wd": "yowling"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "hailing"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "speaking out"
                                        },
                                        {
                                            "wd": "speaking up"
                                        }
                                    ]
                                ],
                                "near_list": [
                                    [
                                        {
                                            "wd": "breathing"
                                        },
                                        {
                                            "wd": "mumbling"
                                        },
                                        {
                                            "wd": "murmuring"
                                        },
                                        {
                                            "wd": "muttering"
                                        },
                                        {
                                            "wd": "whispering"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "to shed tears often while making meaningless sounds as a sign of pain or distress",
            "to utter one's distinctive animal sound",
            "to speak so as to be heard at a distance"
        ]
    },
    {
        "meta": {
            "id": "cry",
            "uuid": "a32021ed-19b1-4f92-9a2d-1e4b2d2e39c9",
            "src": "coll_thes",
            "section": "alpha",
            "target": {
                "tuuid": "63f2b9a2-5307-410a-8430-2c336f815935",
                "tsrc": "collegiate"
            },
            "stems": [
                "cry",
                "cried",
                "cries",
                "cry havoc",
                "cry over spilled milk",
                "cry wolf",
                "crying"
            ],
            "syns": [
                [
                    "bawl",
                    "blub",
                    "blubber",
                    "sob",
                    "weep"
                ],
                [
                    "call",
                    "sing"
                ],
                [
                    "bawl",
                    "bay",
                    "bellow",
                    "call",
                    "holler",
                    "hollo",
                    "roar",
                    "shout",
                    "sound off",
                    "thunder",
                    "vociferate",
                    "yell"
                ]
            ],
            "ants": [],
            "offensive": false
        },
        "hwi": {
            "hw": "cry"
        },
        "fl": "verb",
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "sn": "1",
                                "dt": [
                                    [
                                        "text",
                                        "to shed tears often while making meaningless sounds as a sign of pain or distress "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "some kids started to {it}cry{/it} even before the doctor had given them their shot"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "bawl"
                                        },
                                        {
                                            "wd": "blub",
                                            "wsls": [
                                                "chiefly British"
                                            ]
                                        },
                                        {
                                            "wd": "blubber"
                                        },
                                        {
                                            "wd": "sob"
                                        },
                                        {
                                            "wd": "weep"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "greet",
                                            "wsls": [
                                                "Scottish"
                                            ]
                                        },
                                        {
                                            "wd": "grieve"
                                        },
                                        {
                                            "wd": "keen"
                                        },
                                        {
                                            "wd": "lament"
                                        },
                                        {
                                            "wd": "mourn"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "howl"
                                        },
                                        {
                                            "wd": "scream"
                                        },
                                        {
                                            "wd": "squall"
                                        },
                                        {
                                            "wd": "wail"
                                        },
                                        {
                                            "wd": "yowl"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "bleat"
                                        },
                                        {
                                            "wd": "mewl"
                                        },
                                        {
                                            "wd": "pule"
                                        },
                                        {
                                            "wd": "whimper"
                                        },
                                        {
                                            "wd": "whine"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "sniffle"
                                        },
                                        {
                                            "wd": "snivel"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "groan"
                                        },
                                        {
                                            "wd": "moan"
                                        },
                                        {
                                            "wd": "sigh"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ],
                    [
                        [
                            "sense",
                            {
                                "sn": "2",
                                "dt": [
                                    [
                                        "text",
                                        "to utter one's distinctive animal sound "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "we knew that we were getting very close to the ocean when we could hear sea gulls {it}crying{/it}"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "call"
                                        },
                                        {
                                            "wd": "sing"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ],
                    [
                        [
                            "sense",
                            {
                                "sn": "3",
                                "dt": [
                                    [
                                        "text",
                                        "to speak so as to be heard at a distance "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "a mother {it}crying{/it} for help"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "bawl"
                                        },
                                        {
                                            "wd": "bay"
                                        },
                                        {
                                            "wd": "bellow"
                                        },
                                        {
                                            "wd": "call"
                                        },
                                        {
                                            "wd": "holler"
                                        },
                                        {
                                            "wd": "hollo",
                                            "wvrs": [
                                                {
                                                    "wvl": "or",
                                                    "wva": "halloo"
                                                },
                                                {
                                                    "wvl": "also",
                                                    "wva": "hallo"
                                                }
                                            ]
                                        },
                                        {
                                            "wd": "roar"
                                        },
                                        {
                                            "wd": "shout"
                                        },
                                        {
                                            "wd": "sound off"
                                        },
                                        {
                                            "wd": "thunder"
                                        },
                                        {
                                            "wd": "vociferate"
                                        },
                                        {
                                            "wd": "yell"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "crow"
                                        },
                                        {
                                            "wd": "whoop"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "scream"
                                        },
                                        {
                                            "wd": "screech"
                                        },
                                        {
                                            "wd": "shriek"
                                        },
                                        {
                                            "wd": "shrill"
                                        },
                                        {
                                            "wd": "squeak"
                                        },
                                        {
                                            "wd": "squeal"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "caterwaul"
                                        },
                                        {
                                            "wd": "howl"
                                        },
                                        {
                                            "wd": "ululate"
                                        },
                                        {
                                            "wd": "wail"
                                        },
                                        {
                                            "wd": "yawp",
                                            "wvrs": [
                                                {
                                                    "wvl": "or",
                                                    "wva": "yaup"
                                                }
                                            ]
                                        },
                                        {
                                            "wd": "yowl"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "hail"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "speak out"
                                        },
                                        {
                                            "wd": "speak up"
                                        }
                                    ]
                                ],
                                "near_list": [
                                    [
                                        {
                                            "wd": "breathe"
                                        },
                                        {
                                            "wd": "mumble"
                                        },
                                        {
                                            "wd": "murmur"
                                        },
                                        {
                                            "wd": "mutter"
                                        },
                                        {
                                            "wd": "whisper"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "to shed tears often while making meaningless sounds as a sign of pain or distress",
            "to utter one's distinctive animal sound",
            "to speak so as to be heard at a distance"
        ]
    },
    {
        "meta": {
            "id": "cry (out)",
            "uuid": "63eb8576-34c2-47ee-a969-a5672c81651c",
            "src": "coll_thes",
            "section": "alpha",
            "stems": [
                "cry (out)",
                "cry",
                "cry out",
                "cried",
                "cries",
                "cry havoc",
                "cry over spilled milk",
                "cry wolf",
                "crying"
            ],
            "syns": [
                [
                    "blat",
                    "blurt (out)",
                    "bolt",
                    "ejaculate",
                    "exclaim"
                ]
            ],
            "ants": [],
            "offensive": false
        },
        "hwi": {
            "hw": "cry (out)"
        },
        "fl": "verb",
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "dt": [
                                    [
                                        "text",
                                        "to utter with a sudden burst of strong feeling "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "{ldquo}I can't stand it!{rdquo} he {it}cried out{/it}"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "blat"
                                        },
                                        {
                                            "wd": "blurt (out)"
                                        },
                                        {
                                            "wd": "bolt"
                                        },
                                        {
                                            "wd": "ejaculate"
                                        },
                                        {
                                            "wd": "exclaim"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "blunder"
                                        },
                                        {
                                            "wd": "leak"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "bellow"
                                        },
                                        {
                                            "wd": "bleat"
                                        },
                                        {
                                            "wd": "crow"
                                        },
                                        {
                                            "wd": "holler"
                                        },
                                        {
                                            "wd": "hoot"
                                        },
                                        {
                                            "wd": "howl"
                                        },
                                        {
                                            "wd": "roar"
                                        },
                                        {
                                            "wd": "shout"
                                        },
                                        {
                                            "wd": "whoop"
                                        },
                                        {
                                            "wd": "yowl"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "aah",
                                            "wvrs": [
                                                {
                                                    "wvl": "also",
                                                    "wva": "ah"
                                                }
                                            ]
                                        },
                                        {
                                            "wd": "ooh"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "interject"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "to utter with a sudden burst of strong feeling"
        ]
    },
    {
        "meta": {
            "id": "crying (for)",
            "uuid": "2761dc0b-2fa2-4f99-9011-2bc20914403b",
            "src": "CTcompile",
            "section": "alpha",
            "stems": [
                "crying (for)",
                "crying for"
            ],
            "syns": [
                [
                    "keening",
                    "moaning",
                    "weeping",
                    "elegizing",
                    "regretting",
                    "ruing",
                    "bemoaning",
                    "bewailing",
                    "deploring",
                    "grieving (for)",
                    "lamenting",
                    "mourning",
                    "wailing (for)",
                    "bawling",
                    "blubbering",
                    "sobbing",
                    "agonizing",
                    "bleeding",
                    "hurting",
                    "sorrowing",
                    "suffering"
                ],
                [
                    "asking",
                    "begging",
                    "clamoring (for)",
                    "entailing",
                    "involving",
                    "hurting (for)",
                    "lacking",
                    "bearing",
                    "challenging",
                    "claiming",
                    "demanding",
                    "necessitating",
                    "needing",
                    "requiring",
                    "taking",
                    "wanting",
                    "warranting",
                    "commanding",
                    "enjoining",
                    "exacting",
                    "insisting",
                    "pressing",
                    "questing",
                    "stipulating"
                ]
            ],
            "ants": [
                [
                    "delighting",
                    "exulting (in)",
                    "glorying (in)",
                    "joying",
                    "rejoicing (in)",
                    "beaming",
                    "cheering",
                    "grinning",
                    "laughing",
                    "smiling"
                ],
                [
                    "having",
                    "holding",
                    "owning",
                    "possessing"
                ]
            ],
            "offensive": false
        },
        "hwi": {
            "hw": "crying (for)"
        },
        "fl": "verb",
        "sls": [
            "present participle of {d_link|cry (for)|cry (for)}"
        ],
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "sn": "1",
                                "dt": [
                                    [
                                        "text",
                                        "as in {it}weeping{/it}, {it}moaning{/it}"
                                    ]
                                ],
                                "sim_list": [
                                    [
                                        {
                                            "wd": "keening"
                                        },
                                        {
                                            "wd": "moaning"
                                        },
                                        {
                                            "wd": "weeping"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "elegizing"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "regretting"
                                        },
                                        {
                                            "wd": "ruing"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "bemoaning"
                                        },
                                        {
                                            "wd": "bewailing"
                                        },
                                        {
                                            "wd": "deploring"
                                        },
                                        {
                                            "wd": "grieving (for)"
                                        },
                                        {
                                            "wd": "lamenting"
                                        },
                                        {
                                            "wd": "mourning"
                                        },
                                        {
                                            "wd": "wailing (for)"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "bawling"
                                        },
                                        {
                                            "wd": "blubbering"
                                        },
                                        {
                                            "wd": "sobbing"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "agonizing"
                                        },
                                        {
                                            "wd": "bleeding"
                                        },
                                        {
                                            "wd": "hurting"
                                        },
                                        {
                                            "wd": "sorrowing"
                                        },
                                        {
                                            "wd": "suffering"
                                        }
                                    ]
                                ],
                                "opp_list": [
                                    [
                                        {
                                            "wd": "delighting"
                                        },
                                        {
                                            "wd": "exulting (in)"
                                        },
                                        {
                                            "wd": "glorying (in)"
                                        },
                                        {
                                            "wd": "joying"
                                        },
                                        {
                                            "wd": "rejoicing (in)"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "beaming"
                                        },
                                        {
                                            "wd": "cheering"
                                        },
                                        {
                                            "wd": "grinning"
                                        },
                                        {
                                            "wd": "laughing"
                                        },
                                        {
                                            "wd": "smiling"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ],
                    [
                        [
                            "sense",
                            {
                                "sn": "2",
                                "dt": [
                                    [
                                        "text",
                                        "as in {it}asking{/it}, {it}clamoring (for){/it}"
                                    ]
                                ],
                                "sim_list": [
                                    [
                                        {
                                            "wd": "asking"
                                        },
                                        {
                                            "wd": "begging"
                                        },
                                        {
                                            "wd": "clamoring (for)"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "entailing"
                                        },
                                        {
                                            "wd": "involving"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "hurting (for)"
                                        },
                                        {
                                            "wd": "lacking"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "bearing"
                                        },
                                        {
                                            "wd": "challenging"
                                        },
                                        {
                                            "wd": "claiming"
                                        },
                                        {
                                            "wd": "demanding"
                                        },
                                        {
                                            "wd": "necessitating"
                                        },
                                        {
                                            "wd": "needing"
                                        },
                                        {
                                            "wd": "requiring"
                                        },
                                        {
                                            "wd": "taking"
                                        },
                                        {
                                            "wd": "wanting"
                                        },
                                        {
                                            "wd": "warranting"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "commanding"
                                        },
                                        {
                                            "wd": "enjoining"
                                        },
                                        {
                                            "wd": "exacting"
                                        },
                                        {
                                            "wd": "insisting"
                                        },
                                        {
                                            "wd": "pressing"
                                        },
                                        {
                                            "wd": "questing"
                                        },
                                        {
                                            "wd": "stipulating"
                                        }
                                    ]
                                ],
                                "opp_list": [
                                    [
                                        {
                                            "wd": "having"
                                        },
                                        {
                                            "wd": "holding"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "owning"
                                        },
                                        {
                                            "wd": "possessing"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "as in weeping, moaning",
            "as in asking, clamoring (for)"
        ]
    },
    {
        "meta": {
            "id": "crying down",
            "uuid": "a83064b0-17d4-469a-8a05-2a8232ae4a6a",
            "src": "coll_thes",
            "section": "alpha",
            "stems": [
                "crying down"
            ],
            "syns": [
                [
                    "bad-mouthing",
                    "belittling",
                    "decrying",
                    "denigrating",
                    "deprecating",
                    "depreciating",
                    "derogating",
                    "diminishing",
                    "discounting",
                    "dismissing",
                    "disparaging",
                    "dissing",
                    "kissing off",
                    "minimizing",
                    "playing down",
                    "poor-mouthing",
                    "putting down",
                    "running down",
                    "talking down",
                    "trashing",
                    "trash-talking",
                    "vilipending",
                    "writing off"
                ]
            ],
            "ants": [
                [
                    "acclaiming",
                    "applauding",
                    "exalting",
                    "extolling",
                    "glorifying",
                    "lauding",
                    "magnifying",
                    "praising"
                ]
            ],
            "offensive": false
        },
        "hwi": {
            "hw": "crying down"
        },
        "fl": "verb",
        "sls": [
            "present participle of {d_link|cry down|cry down}"
        ],
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "dt": [
                                    [
                                        "text",
                                        "to express scornfully one's low opinion of "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "she {it}cried down{/it} any party to which she wasn't invited"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "bad-mouthing"
                                        },
                                        {
                                            "wd": "belittling"
                                        },
                                        {
                                            "wd": "decrying"
                                        },
                                        {
                                            "wd": "denigrating"
                                        },
                                        {
                                            "wd": "deprecating"
                                        },
                                        {
                                            "wd": "depreciating"
                                        },
                                        {
                                            "wd": "derogating"
                                        },
                                        {
                                            "wd": "diminishing"
                                        },
                                        {
                                            "wd": "discounting"
                                        },
                                        {
                                            "wd": "dismissing"
                                        },
                                        {
                                            "wd": "disparaging"
                                        },
                                        {
                                            "wd": "dissing",
                                            "wsls": [
                                                "slang"
                                            ]
                                        },
                                        {
                                            "wd": "kissing off"
                                        },
                                        {
                                            "wd": "minimizing"
                                        },
                                        {
                                            "wd": "playing down"
                                        },
                                        {
                                            "wd": "poor-mouthing"
                                        },
                                        {
                                            "wd": "putting down"
                                        },
                                        {
                                            "wd": "running down"
                                        },
                                        {
                                            "wd": "talking down"
                                        },
                                        {
                                            "wd": "trashing"
                                        },
                                        {
                                            "wd": "trash-talking"
                                        },
                                        {
                                            "wd": "vilipending"
                                        },
                                        {
                                            "wd": "writing off"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "discommending"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "abusing"
                                        },
                                        {
                                            "wd": "scolding"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "disapproving (of)"
                                        },
                                        {
                                            "wd": "disliking"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "censuring"
                                        },
                                        {
                                            "wd": "condemning"
                                        },
                                        {
                                            "wd": "criticizing"
                                        },
                                        {
                                            "wd": "denouncing"
                                        },
                                        {
                                            "wd": "reprehending"
                                        },
                                        {
                                            "wd": "reprobating"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "aspersing"
                                        },
                                        {
                                            "wd": "defaming"
                                        },
                                        {
                                            "wd": "maligning"
                                        },
                                        {
                                            "wd": "ripping"
                                        },
                                        {
                                            "wd": "slandering"
                                        },
                                        {
                                            "wd": "slurring"
                                        },
                                        {
                                            "wd": "traducing"
                                        },
                                        {
                                            "wd": "vilifying"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "discrediting"
                                        },
                                        {
                                            "wd": "disgracing"
                                        }
                                    ]
                                ],
                                "phrase_list": [
                                    [
                                        {
                                            "wd": "dumping on"
                                        }
                                    ]
                                ],
                                "near_list": [
                                    [
                                        {
                                            "wd": "approving"
                                        },
                                        {
                                            "wd": "countenancing"
                                        },
                                        {
                                            "wd": "endorsing",
                                            "wvrs": [
                                                {
                                                    "wvl": "also",
                                                    "wva": "indorsing"
                                                }
                                            ]
                                        },
                                        {
                                            "wd": "favoring"
                                        },
                                        {
                                            "wd": "recommending"
                                        },
                                        {
                                            "wd": "sanctioning"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "commending"
                                        },
                                        {
                                            "wd": "complimenting"
                                        },
                                        {
                                            "wd": "eulogizing"
                                        }
                                    ]
                                ],
                                "ant_list": [
                                    [
                                        {
                                            "wd": "acclaiming"
                                        },
                                        {
                                            "wd": "applauding"
                                        },
                                        {
                                            "wd": "exalting"
                                        },
                                        {
                                            "wd": "extolling"
                                        },
                                        {
                                            "wd": "glorifying"
                                        },
                                        {
                                            "wd": "lauding"
                                        },
                                        {
                                            "wd": "magnifying"
                                        },
                                        {
                                            "wd": "praising"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "to express scornfully one's low opinion of"
        ]
    },
    {
        "meta": {
            "id": "crying off",
            "uuid": "63a18c92-953f-4013-ba4d-8b5da63b0374",
            "src": "coll_thes",
            "section": "alpha",
            "stems": [
                "crying off"
            ],
            "syns": [
                [
                    "abandoning",
                    "aborting",
                    "calling",
                    "calling off",
                    "canceling",
                    "dropping",
                    "recalling",
                    "repealing",
                    "rescinding",
                    "revoking",
                    "scrapping",
                    "scrubbing"
                ]
            ],
            "ants": [
                [
                    "continuing",
                    "keeping"
                ]
            ],
            "offensive": false
        },
        "hwi": {
            "hw": "crying off"
        },
        "fl": "verb",
        "sls": [
            "present participle of {d_link|cry off|cry off}"
        ],
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "dt": [
                                    [
                                        "text",
                                        "to put an end to (something planned or previously agreed to) "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "their film deal had been abruptly {it}cried off{/it}, and now the filmmakers were back to square one"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "abandoning"
                                        },
                                        {
                                            "wd": "aborting"
                                        },
                                        {
                                            "wd": "calling"
                                        },
                                        {
                                            "wd": "calling off"
                                        },
                                        {
                                            "wd": "canceling",
                                            "wvrs": [
                                                {
                                                    "wvl": "or",
                                                    "wva": "cancelling"
                                                }
                                            ]
                                        },
                                        {
                                            "wd": "dropping"
                                        },
                                        {
                                            "wd": "recalling"
                                        },
                                        {
                                            "wd": "repealing"
                                        },
                                        {
                                            "wd": "rescinding"
                                        },
                                        {
                                            "wd": "revoking"
                                        },
                                        {
                                            "wd": "scrapping"
                                        },
                                        {
                                            "wd": "scrubbing"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "abrogating"
                                        },
                                        {
                                            "wd": "annulling"
                                        },
                                        {
                                            "wd": "invalidating"
                                        },
                                        {
                                            "wd": "nullifying"
                                        },
                                        {
                                            "wd": "voiding"
                                        },
                                        {
                                            "wd": "writing off"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "recanting"
                                        },
                                        {
                                            "wd": "retracting"
                                        },
                                        {
                                            "wd": "taking back"
                                        },
                                        {
                                            "wd": "withdrawing"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "countermanding"
                                        },
                                        {
                                            "wd": "reversing"
                                        },
                                        {
                                            "wd": "rolling back"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "breaking off"
                                        },
                                        {
                                            "wd": "discontinuing"
                                        },
                                        {
                                            "wd": "ending"
                                        },
                                        {
                                            "wd": "halting"
                                        },
                                        {
                                            "wd": "stopping"
                                        },
                                        {
                                            "wd": "terminating"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "holding back"
                                        },
                                        {
                                            "wd": "interrupting"
                                        },
                                        {
                                            "wd": "suspending"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "giving up"
                                        },
                                        {
                                            "wd": "relinquishing"
                                        },
                                        {
                                            "wd": "surrendering"
                                        }
                                    ]
                                ],
                                "near_list": [
                                    [
                                        {
                                            "wd": "engaging"
                                        },
                                        {
                                            "wd": "pledging"
                                        },
                                        {
                                            "wd": "promising"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "beginning"
                                        },
                                        {
                                            "wd": "commencing"
                                        },
                                        {
                                            "wd": "initiating"
                                        },
                                        {
                                            "wd": "starting"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "taking on"
                                        },
                                        {
                                            "wd": "taking up"
                                        },
                                        {
                                            "wd": "undertaking"
                                        }
                                    ]
                                ],
                                "ant_list": [
                                    [
                                        {
                                            "wd": "continuing"
                                        },
                                        {
                                            "wd": "keeping"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "to put an end to (something planned or previously agreed to)"
        ]
    },
    {
        "meta": {
            "id": "crying up",
            "uuid": "42906396-9f39-428b-8b7d-8692be08f013",
            "src": "coll_thes",
            "section": "alpha",
            "stems": [
                "crying up"
            ],
            "syns": [
                [
                    "ballyhooing",
                    "blowing up",
                    "cracking up",
                    "glorifying",
                    "touting",
                    "trumpeting",
                    "tub-thumping"
                ]
            ],
            "ants": [],
            "offensive": false
        },
        "hwi": {
            "hw": "crying up"
        },
        "fl": "verb",
        "sls": [
            "present participle of {d_link|cry up|cry up}"
        ],
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "dt": [
                                    [
                                        "text",
                                        "to praise or publicize lavishly and often excessively "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "in exchange for his hefty endorsement fee, the basketball player is expected to {it}cry up{/it} that brand of sneaker at every opportunity"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "ballyhooing"
                                        },
                                        {
                                            "wd": "blowing up"
                                        },
                                        {
                                            "wd": "cracking up"
                                        },
                                        {
                                            "wd": "glorifying"
                                        },
                                        {
                                            "wd": "touting"
                                        },
                                        {
                                            "wd": "trumpeting"
                                        },
                                        {
                                            "wd": "tub-thumping"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "acclaiming"
                                        },
                                        {
                                            "wd": "applauding"
                                        },
                                        {
                                            "wd": "extolling"
                                        },
                                        {
                                            "wd": "lauding"
                                        },
                                        {
                                            "wd": "magnifying"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "commending"
                                        },
                                        {
                                            "wd": "complimenting"
                                        },
                                        {
                                            "wd": "eulogizing"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "advancing"
                                        },
                                        {
                                            "wd": "advertising"
                                        },
                                        {
                                            "wd": "announcing"
                                        },
                                        {
                                            "wd": "blaring"
                                        },
                                        {
                                            "wd": "blazing"
                                        },
                                        {
                                            "wd": "blazoning"
                                        },
                                        {
                                            "wd": "boosting"
                                        },
                                        {
                                            "wd": "heralding"
                                        },
                                        {
                                            "wd": "offering"
                                        },
                                        {
                                            "wd": "plugging"
                                        },
                                        {
                                            "wd": "promoting"
                                        },
                                        {
                                            "wd": "publicizing"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "asserting"
                                        },
                                        {
                                            "wd": "averring"
                                        },
                                        {
                                            "wd": "claiming"
                                        },
                                        {
                                            "wd": "declaring"
                                        },
                                        {
                                            "wd": "laying down"
                                        },
                                        {
                                            "wd": "making out"
                                        },
                                        {
                                            "wd": "proclaiming"
                                        },
                                        {
                                            "wd": "pronouncing"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "to praise or publicize lavishly and often excessively"
        ]
    },
    {
        "meta": {
            "id": "cry down",
            "uuid": "8c74a5a3-d35f-40b6-be4d-253a125728f6",
            "src": "coll_thes",
            "section": "alpha",
            "target": {
                "tuuid": "48fe1aa2-0a52-49ec-8e77-892facb16a5a",
                "tsrc": "collegiate"
            },
            "stems": [
                "cry down",
                "cried down",
                "cries down",
                "crying down"
            ],
            "syns": [
                [
                    "bad-mouth",
                    "belittle",
                    "decry",
                    "denigrate",
                    "deprecate",
                    "depreciate",
                    "derogate",
                    "diminish",
                    "dis",
                    "discount",
                    "dismiss",
                    "disparage",
                    "kiss off",
                    "minimize",
                    "play down",
                    "poor-mouth",
                    "put down",
                    "run down",
                    "talk down",
                    "trash",
                    "trash-talk",
                    "vilipend",
                    "write off"
                ]
            ],
            "ants": [
                [
                    "acclaim",
                    "applaud",
                    "exalt",
                    "extol",
                    "glorify",
                    "laud",
                    "magnify",
                    "praise"
                ]
            ],
            "offensive": false
        },
        "hwi": {
            "hw": "cry down"
        },
        "fl": "verb",
        "def": [
            {
                "sseq": [
                    [
                        [
                            "sense",
                            {
                                "dt": [
                                    [
                                        "text",
                                        "to express scornfully one's low opinion of "
                                    ],
                                    [
                                        "vis",
                                        [
                                            {
                                                "t": "she {it}cried down{/it} any party to which she wasn't invited"
                                            }
                                        ]
                                    ]
                                ],
                                "syn_list": [
                                    [
                                        {
                                            "wd": "bad-mouth"
                                        },
                                        {
                                            "wd": "belittle"
                                        },
                                        {
                                            "wd": "decry"
                                        },
                                        {
                                            "wd": "denigrate"
                                        },
                                        {
                                            "wd": "deprecate"
                                        },
                                        {
                                            "wd": "depreciate"
                                        },
                                        {
                                            "wd": "derogate"
                                        },
                                        {
                                            "wd": "diminish"
                                        },
                                        {
                                            "wd": "dis",
                                            "wvrs": [
                                                {
                                                    "wvl": "also",
                                                    "wva": "diss"
                                                }
                                            ],
                                            "wsls": [
                                                "slang"
                                            ]
                                        },
                                        {
                                            "wd": "discount"
                                        },
                                        {
                                            "wd": "dismiss"
                                        },
                                        {
                                            "wd": "disparage"
                                        },
                                        {
                                            "wd": "kiss off"
                                        },
                                        {
                                            "wd": "minimize"
                                        },
                                        {
                                            "wd": "play down"
                                        },
                                        {
                                            "wd": "poor-mouth"
                                        },
                                        {
                                            "wd": "put down"
                                        },
                                        {
                                            "wd": "run down"
                                        },
                                        {
                                            "wd": "talk down"
                                        },
                                        {
                                            "wd": "trash"
                                        },
                                        {
                                            "wd": "trash-talk"
                                        },
                                        {
                                            "wd": "vilipend"
                                        },
                                        {
                                            "wd": "write off"
                                        }
                                    ]
                                ],
                                "rel_list": [
                                    [
                                        {
                                            "wd": "discommend"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "abuse"
                                        },
                                        {
                                            "wd": "scold"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "disapprove (of)"
                                        },
                                        {
                                            "wd": "dislike"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "censure"
                                        },
                                        {
                                            "wd": "condemn"
                                        },
                                        {
                                            "wd": "criticize"
                                        },
                                        {
                                            "wd": "denounce"
                                        },
                                        {
                                            "wd": "reprehend"
                                        },
                                        {
                                            "wd": "reprobate"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "asperse"
                                        },
                                        {
                                            "wd": "defame"
                                        },
                                        {
                                            "wd": "malign"
                                        },
                                        {
                                            "wd": "rip"
                                        },
                                        {
                                            "wd": "slander"
                                        },
                                        {
                                            "wd": "slur"
                                        },
                                        {
                                            "wd": "traduce"
                                        },
                                        {
                                            "wd": "vilify"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "discredit"
                                        },
                                        {
                                            "wd": "disgrace"
                                        }
                                    ]
                                ],
                                "phrase_list": [
                                    [
                                        {
                                            "wd": "dump on"
                                        }
                                    ]
                                ],
                                "near_list": [
                                    [
                                        {
                                            "wd": "approve"
                                        },
                                        {
                                            "wd": "countenance"
                                        },
                                        {
                                            "wd": "endorse",
                                            "wvrs": [
                                                {
                                                    "wvl": "also",
                                                    "wva": "indorse"
                                                }
                                            ]
                                        },
                                        {
                                            "wd": "favor"
                                        },
                                        {
                                            "wd": "recommend"
                                        },
                                        {
                                            "wd": "sanction"
                                        }
                                    ],
                                    [
                                        {
                                            "wd": "commend"
                                        },
                                        {
                                            "wd": "compliment"
                                        },
                                        {
                                            "wd": "eulogize"
                                        }
                                    ]
                                ],
                                "ant_list": [
                                    [
                                        {
                                            "wd": "acclaim"
                                        },
                                        {
                                            "wd": "applaud"
                                        },
                                        {
                                            "wd": "exalt"
                                        },
                                        {
                                            "wd": "extol",
                                            "wvrs": [
                                                {
                                                    "wvl": "also",
                                                    "wva": "extoll"
                                                }
                                            ]
                                        },
                                        {
                                            "wd": "glorify"
                                        },
                                        {
                                            "wd": "laud"
                                        },
                                        {
                                            "wd": "magnify"
                                        },
                                        {
                                            "wd": "praise"
                                        }
                                    ]
                                ]
                            }
                        ]
                    ]
                ]
            }
        ],
        "shortdef": [
            "to express scornfully one's low opinion of"
        ]
    }
]

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
    throw Error('error')
    // return cleanSentimentAnalysis(sampleResultPositiveAndNegative2)
}

export const submitWords = async (words, directionChange, wordType) => {
    let newWords = await Promise.all(words.map(async (word) => {
        console.log("this is one of the selected words>>>>",  word)
        try {
            // const response = await fetch(`https://dictionaryapi.com/api/v3/badpath/thesaurus/json/${word.text}?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb`)
            const response = await fetch(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${word.text}?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb`)
            if (!response.ok) {
                throw Error('Thesaurus fetch error')
            } else {
                const result = await response.json()
                console.log(result)
                // let result = sampleThesaurusCrying
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