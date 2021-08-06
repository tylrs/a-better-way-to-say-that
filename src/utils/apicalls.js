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

const sampleThesaurus1 = [
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

export const submitWords = async (words, directionChange, wordType) => {
    console.log(words[1].text)
    try {
        const response = await fetch(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${words[1].text}?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb`)
        const result = await response.json()
        console.log(result)
    } catch {

    }
}