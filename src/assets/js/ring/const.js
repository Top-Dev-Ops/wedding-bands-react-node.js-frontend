import {
    ShapeRingConfigParser, ModelRingConfigParser
} from "./meta.js"

const defaultConfig = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.4307,
                            "cy": 0.5698,
                            "p1x": 5,
                            "p1y": 0.5698,
                            "p2x": 4.4308,
                            "p2y": 0.0005,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 4.4308,
                            "p1y": 0.0005,
                            "p2x": 0.5692,
                            "p2y": 0.0005
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.5693,
                            "cy": 0.5698,
                            "p1x": 0.5692,
                            "p1y": 0.0005,
                            "p2x": 0,
                            "p2y": 0.5698,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 0.5693,
                            "cy": 0.5697,
                            "p1x": 0,
                            "p1y": 0.5697,
                            "p2x": 0.3634,
                            "p2y": 1.1005,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": -4.4078,
                            "p1x": 0.3634,
                            "p1y": 1.1005,
                            "p2x": 4.6366,
                            "p2y": 1.1005,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.4307,
                            "cy": 0.5697,
                            "p1x": 4.6366,
                            "p1y": 1.1005,
                            "p2x": 5,
                            "p2y": 0.5697,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 54,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "surface",
                        "gap": 0.1,
                        "lowering": 0,
                        "rows": 1,
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 1,
                        "middleShape": {
                            "offset": 2.5
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "rubbed"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.4307,
                            "cy": 0.5698,
                            "p1x": 5,
                            "p1y": 0.5698,
                            "p2x": 4.4308,
                            "p2y": 0.0005,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 4.4308,
                            "p1y": 0.0005,
                            "p2x": 0.5692,
                            "p2y": 0.0005
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.5693,
                            "cy": 0.5698,
                            "p1x": 0.5692,
                            "p1y": 0.0005,
                            "p2x": 0,
                            "p2y": 0.5698,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 0.5693,
                            "cy": 0.5697,
                            "p1x": 0,
                            "p1y": 0.5697,
                            "p2x": 0.3634,
                            "p2y": 1.1005,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": -4.4078,
                            "p1x": 0.3634,
                            "p1y": 1.1005,
                            "p2x": 4.6366,
                            "p2y": 1.1005,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.4307,
                            "cy": 0.5697,
                            "p1x": 4.6366,
                            "p1y": 1.1005,
                            "p2x": 5,
                            "p2y": 0.5697,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
};

const config1 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.7896716470488,
                            "cy": 1.5051010703605,
                            "p1x": 6,
                            "p1y": 0.56298666666667,
                            "p2x": 5.1858,
                            "p2y": 0.02336,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3,
                            "cy": -9.0276487621387,
                            "p1x": 5.1858,
                            "p1y": 0.02336,
                            "p2x": 0.8142,
                            "p2y": 0.02336,
                            "dir": "CCW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 1.2103283529512,
                            "cy": 1.5051010703605,
                            "p1x": 0.8142,
                            "p1y": 0.02336,
                            "p2x": 0,
                            "p2y": 0.56298666666667,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.56298666666667,
                            "p2x": 0,
                            "p2y": 0.96778666666667
                        }
                    },
                    {
                        "arc": {
                            "cx": 1.0197349207533,
                            "cy": 0.41267614364631,
                            "p1x": 0,
                            "p1y": 0.96778666666667,
                            "p2x": 0.39492,
                            "p2y": 1.3912533333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3,
                            "cy": -37.201731670598,
                            "p1x": 0.39492,
                            "p1y": 1.3912533333333,
                            "p2x": 5.60508,
                            "p2y": 1.3912533333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.9802650792467,
                            "cy": 0.41267614364631,
                            "p1x": 5.60508,
                            "p1y": 1.3912533333333,
                            "p2x": 6,
                            "p2y": 0.96778666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 6,
                            "p1y": 0.96778666666667,
                            "p2x": 6,
                            "p2y": 0.56298666666667
                        }
                    }
                ],
                "circumference": 54,
                "profileWidth": 6,
                "profileHeight": 1.6,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.5
                                },
                                "derivative": 0
                            },
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 4.5
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "rough-bark",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "rubbed",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "bark",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "rect",
                                "width": 0.6,
                                "depth": 0.3,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.5085714285714
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.4,
                                "depth": 0.2,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 4.5085714285714
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "ok",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "cross",
                        "gap": 0.1,
                        "lowering": 0.15,
                        "rows": "2",
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 1,
                        "middleShape": {
                            "offset": 3
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "channel"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 5.4655978773924,
                            "cy": 2.06673817789,
                            "p1x": 7,
                            "p1y": 0.59817333333333,
                            "p2x": 6.0501,
                            "p2y": 0.02482,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.5,
                            "cy": -12.349967085506,
                            "p1x": 6.0501,
                            "p1y": 0.02482,
                            "p2x": 0.9499,
                            "p2y": 0.02482,
                            "dir": "CCW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 1.5344021226076,
                            "cy": 2.06673817789,
                            "p1x": 0.9499,
                            "p1y": 0.02482,
                            "p2x": 0,
                            "p2y": 0.59817333333333,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.59817333333333,
                            "p2x": 0,
                            "p2y": 1.0282733333333
                        }
                    },
                    {
                        "arc": {
                            "cx": 1.2933816474672,
                            "cy": 0.16469654218244,
                            "p1x": 0,
                            "p1y": 1.0282733333333,
                            "p2x": 0.46074,
                            "p2y": 1.4782066666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.5,
                            "cy": -57.226638550772,
                            "p1x": 0.46074,
                            "p1y": 1.4782066666667,
                            "p2x": 6.53926,
                            "p2y": 1.4782066666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 5.7066183525328,
                            "cy": 0.16469654218244,
                            "p1x": 6.53926,
                            "p1y": 1.4782066666667,
                            "p2x": 7,
                            "p2y": 1.0282733333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 7,
                            "p1y": 1.0282733333333,
                            "p2x": 7,
                            "p2y": 0.59817333333333
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 7,
                "profileHeight": 1.7,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.75
                                },
                                "derivative": 0
                            },
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 5.25
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "rough-bark",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "rubbed",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "bark",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "rect",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.75
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 5.25
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "ok",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config2 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 5.8493786855367,
                            "cy": 0.1593573121046,
                            "p1x": 6,
                            "p1y": 0.080533333333333,
                            "p2x": 5.91,
                            "p2y": 0.00053333333333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 5.91,
                            "p1y": 0.00053333333333333,
                            "p2x": 0.09,
                            "p2y": 0.00053333333333333
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.15062131446335,
                            "cy": 0.1593573121046,
                            "p1x": 0.09,
                            "p1y": 0.00053333333333333,
                            "p2x": 0,
                            "p2y": 0.080533333333333,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.080533333333333,
                            "p2x": 0,
                            "p2y": 1.5202133333333
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.15062131446335,
                            "cy": 1.4413893545621,
                            "p1x": 0,
                            "p1y": 1.5202133333333,
                            "p2x": 0.09,
                            "p2y": 1.6002133333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 0.09,
                            "p1y": 1.6002133333333,
                            "p2x": 5.91,
                            "p2y": 1.6002133333333
                        }
                    },
                    {
                        "arc": {
                            "cx": 5.8493786855367,
                            "cy": 1.4413893545621,
                            "p1x": 5.91,
                            "p1y": 1.6002133333333,
                            "p2x": 6,
                            "p2y": 1.5202133333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 6,
                            "p1y": 1.5202133333333,
                            "p2x": 6,
                            "p2y": 0.080533333333333
                        }
                    }
                ],
                "circumference": 54,
                "profileWidth": 6,
                "profileHeight": 1.6,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "horizontal",
                                "middleShape": {
                                    "offset": 0.8
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "exclusive-matte",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "rect",
                                "width": 1.2,
                                "depth": 0.3,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 0
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 6
                                },
                                "materialOverride": {
                                    "surfaceOverride": "sandmatte-fine"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "ok",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "surface",
                        "gap": 3,
                        "lowering": 0,
                        "rows": 1,
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 3,
                        "middleShape": {
                            "offset": 4.0
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "rubbed"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 6.799393542437,
                            "cy": 0.22602170247978,
                            "p1x": 7,
                            "p1y": 0.085566666666667,
                            "p2x": 6.895,
                            "p2y": 0.00056666666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 6.895,
                            "p1y": 0.00056666666666667,
                            "p2x": 0.105,
                            "p2y": 0.00056666666666667
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.20060645756299,
                            "cy": 0.22602170247978,
                            "p1x": 0.105,
                            "p1y": 0.00056666666666667,
                            "p2x": 0,
                            "p2y": 0.085566666666667,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.085566666666667,
                            "p2x": 0,
                            "p2y": 1.6152266666667
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.20060645756299,
                            "cy": 1.4747716308536,
                            "p1x": 0,
                            "p1y": 1.6152266666667,
                            "p2x": 0.105,
                            "p2y": 1.7002266666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 0.105,
                            "p1y": 1.7002266666667,
                            "p2x": 6.895,
                            "p2y": 1.7002266666667
                        }
                    },
                    {
                        "arc": {
                            "cx": 6.799393542437,
                            "cy": 1.4747716308536,
                            "p1x": 6.895,
                            "p1y": 1.7002266666667,
                            "p2x": 7,
                            "p2y": 1.6152266666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 7,
                            "p1y": 1.6152266666667,
                            "p2x": 7,
                            "p2y": 0.085566666666667
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 7,
                "profileHeight": 1.7,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "horizontal",
                                "middleShape": {
                                    "offset": 0.85
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "exclusive-matte",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "rect",
                                "width": 1.2,
                                "depth": 0.3,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 0
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 7
                                },
                                "materialOverride": {
                                    "surfaceOverride": "sandmatte-fine"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "ok",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config3 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 6,
                            "p1y": 1.05632,
                            "p2x": 6,
                            "p2y": 0.54432
                        }
                    },
                    {
                        "arc": {
                            "cx": 5.5627842841517,
                            "cy": 0.76799955041094,
                            "p1x": 6,
                            "p1y": 0.54432,
                            "p2x": 5.86116,
                            "p2y": 0.37792,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3,
                            "cy": 26.379568599265,
                            "p1x": 5.86116,
                            "p1y": 0.37792,
                            "p2x": 0.13884,
                            "p2y": 0.37792,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 0.43721571584831,
                            "cy": 0.76799955041094,
                            "p1x": 0.13884,
                            "p1y": 0.37792,
                            "p2x": 0,
                            "p2y": 0.54432,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.54432,
                            "p2x": 0,
                            "p2y": 1.05632
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.43730531206922,
                            "cy": 0.83281566560617,
                            "p1x": 0,
                            "p1y": 1.05632,
                            "p2x": 0.13884,
                            "p2y": 1.2228266666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3,
                            "cy": -24.778821932598,
                            "p1x": 0.13884,
                            "p1y": 1.2228266666667,
                            "p2x": 5.86116,
                            "p2y": 1.2228266666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 5.5626946879308,
                            "cy": 0.83281566560617,
                            "p1x": 5.86116,
                            "p1y": 1.2228266666667,
                            "p2x": 6,
                            "p2y": 1.05632,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 54,
                "profileWidth": 6,
                "profileHeight": 1.6,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.5
                                },
                                "derivative": 0
                            },
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 4.5
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "hammered-matte",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "ice-matte",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "horizontal-brushed",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "v",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.5
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "v",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 4.5
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 1.2,
                                "depth": 0.3,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 0
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 6
                                },
                                "materialOverride": {
                                    "surfaceOverride": "sandmatte-fine"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "ok",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "surface",
                        "gap": 3,
                        "lowering": 0,
                        "rows": 1,
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 3,
                        "middleShape": {
                            "offset": 4.5
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "rubbed"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 7,
                            "p1y": 1.12234,
                            "p2x": 7,
                            "p2y": 0.57834
                        }
                    },
                    {
                        "arc": {
                            "cx": 6.4509671116122,
                            "cy": 0.91874988156709,
                            "p1x": 7,
                            "p1y": 0.57834,
                            "p2x": 6.83802,
                            "p2y": 0.40154,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.5,
                            "cy": 39.96816959882,
                            "p1x": 6.83802,
                            "p1y": 0.40154,
                            "p2x": 0.16198,
                            "p2y": 0.40154,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 0.54903288838783,
                            "cy": 0.91874988156709,
                            "p1x": 0.16198,
                            "p1y": 0.40154,
                            "p2x": 0,
                            "p2y": 0.57834,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.57834,
                            "p2x": 0,
                            "p2y": 1.12234
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.5491639086299,
                            "cy": 0.78214152637272,
                            "p1x": 0,
                            "p1y": 1.12234,
                            "p2x": 0.16198,
                            "p2y": 1.2992533333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.5,
                            "cy": -38.267376265486,
                            "p1x": 0.16198,
                            "p1y": 1.2992533333333,
                            "p2x": 6.83802,
                            "p2y": 1.2992533333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 6.4508360913701,
                            "cy": 0.78214152637271,
                            "p1x": 6.83802,
                            "p1y": 1.2992533333333,
                            "p2x": 7,
                            "p2y": 1.12234,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 7,
                "profileHeight": 1.7,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.75
                                },
                                "derivative": 0
                            },
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 5.25
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "hammered-matte",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "ice-matte",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "horizontal-brushed",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "v",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.75
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "v",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 5.25
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 1.2,
                                "depth": 0.3,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 0
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 7
                                },
                                "materialOverride": {
                                    "surfaceOverride": "sandmatte-fine"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "ok",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config4 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.9704253022965,
                            "cy": 0.84794909375857,
                            "p1x": 5.9376,
                            "p1y": 0.72234666666667,
                            "p2x": 5.6046,
                            "p2y": 0.10698666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.00564,
                            "cy": 76.789623454247,
                            "p1x": 5.6046,
                            "p1y": 0.10698666666667,
                            "p2x": 0.40668,
                            "p2y": 0.10698666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 1.0408546977035,
                            "cy": 0.84794909375857,
                            "p1x": 0.40668,
                            "p1y": 0.10698666666667,
                            "p2x": 0.07368,
                            "p2y": 0.72234666666667,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0.07368,
                            "p1y": 0.72234666666667,
                            "p2x": 0.5586,
                            "p2y": 1.3777066666667
                        }
                    },
                    {
                        "arc": {
                            "cx": 1.0413965289615,
                            "cy": 0.77217243216491,
                            "p1x": 0.5586,
                            "p1y": 1.3777066666667,
                            "p2x": 0.807,
                            "p2y": 1.5102933333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.00564,
                            "cy": -67.111827025882,
                            "p1x": 0.807,
                            "p1y": 1.5102933333333,
                            "p2x": 5.20428,
                            "p2y": 1.5102933333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.9700828582554,
                            "cy": 0.77210914471268,
                            "p1x": 5.20428,
                            "p1y": 1.5102933333333,
                            "p2x": 5.4528,
                            "p2y": 1.3777066666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 5.4528,
                            "p1y": 1.3777066666667,
                            "p2x": 5.9376,
                            "p2y": 0.72234666666667
                        }
                    }
                ],
                "circumference": 54,
                "profileWidth": 6,
                "profileHeight": 1.6,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.5
                                },
                                "derivative": 0
                            },
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 4.5
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "vertical-brushed",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "diagonal-brushed",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "sandmatte-fine",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "v",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.5
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "v",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 4.5
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 0
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 6
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "memo",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "surface",
                        "gap": 0.1,
                        "lowering": 0.15,
                        "rows": 2,
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 5,
                        "middleShape": {
                            "offset": 3
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "section"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 5.714558612958,
                            "cy": 1.0457117384996,
                            "p1x": 6.9272,
                            "p1y": 0.76749333333333,
                            "p2x": 6.5387,
                            "p2y": 0.11367333333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.50658,
                            "cy": 116.49224736958,
                            "p1x": 6.5387,
                            "p1y": 0.11367333333333,
                            "p2x": 0.47446,
                            "p2y": 0.11367333333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 1.298601387042,
                            "cy": 1.0457117384996,
                            "p1x": 0.47446,
                            "p1y": 0.11367333333333,
                            "p2x": 0.08596,
                            "p2y": 0.76749333333333,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0.08596,
                            "p1y": 0.76749333333333,
                            "p2x": 0.6517,
                            "p2y": 1.4638133333333
                        }
                    },
                    {
                        "arc": {
                            "cx": 1.2806676046291,
                            "cy": 0.53844200353856,
                            "p1x": 0.6517,
                            "p1y": 1.4638133333333,
                            "p2x": 0.9415,
                            "p2y": 1.6046866666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.50658,
                            "cy": -102.63615416559,
                            "p1x": 0.9415,
                            "p1y": 1.6046866666667,
                            "p2x": 6.07166,
                            "p2y": 1.6046866666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 5.7327554872054,
                            "cy": 0.53835835095594,
                            "p1x": 6.07166,
                            "p1y": 1.6046866666667,
                            "p2x": 6.3616,
                            "p2y": 1.4638133333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 6.3616,
                            "p1y": 1.4638133333333,
                            "p2x": 6.9272,
                            "p2y": 0.76749333333333
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 7,
                "profileHeight": 1.7,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.75
                                },
                                "derivative": 0
                            },
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 5.25
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "vertical-brushed",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "diagonal-brushed",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "sandmatte-fine",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "v",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.75
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "v",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 5.25
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 0
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 7
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "memo",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config5 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 5.2387844006385,
                            "cy": 1.136145104876,
                            "p1x": 6,
                            "p1y": 0.79925333333333,
                            "p2x": 5.78064,
                            "p2y": 0.50421333333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3,
                            "cy": 19.088956789772,
                            "p1x": 5.78064,
                            "p1y": 0.50421333333333,
                            "p2x": 0.21936,
                            "p2y": 0.50421333333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.76121559936151,
                            "cy": 1.136145104876,
                            "p1x": 0.21936,
                            "p1y": 0.50421333333333,
                            "p2x": 0,
                            "p2y": 0.79925333333333,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 0.76121559936151,
                            "cy": 0.46236156179069,
                            "p1x": 0,
                            "p1y": 0.79925333333333,
                            "p2x": 0.21936,
                            "p2y": 1.0942933333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3,
                            "cy": -17.490450123105,
                            "p1x": 0.21936,
                            "p1y": 1.0942933333333,
                            "p2x": 5.78064,
                            "p2y": 1.0942933333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 5.2387844006385,
                            "cy": 0.46236156179069,
                            "p1x": 5.78064,
                            "p1y": 1.0942933333333,
                            "p2x": 6,
                            "p2y": 0.79925333333333,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 54,
                "profileWidth": 6,
                "profileHeight": 1.6,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.5
                                },
                                "derivative": 0
                            },
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 4.5
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "sandmatte-coarse",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "milled",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "u",
                                "width": 0.6,
                                "depth": 0.3,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.5
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "u",
                                "width": 0.6,
                                "depth": 0.3,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 4.5
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 1.2,
                                "depth": 0.3,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 6
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "♡memo♡",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 6.05287207724,
                            "cy": 1.361222104949,
                            "p1x": 7,
                            "p1y": 0.84920666666667,
                            "p2x": 6.74408,
                            "p2y": 0.53572666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.5,
                            "cy": 28.745372390008,
                            "p1x": 6.74408,
                            "p1y": 0.53572666666667,
                            "p2x": 0.25592,
                            "p2y": 0.53572666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.94712792276,
                            "cy": 1.361222104949,
                            "p1x": 0.25592,
                            "p1y": 0.53572666666667,
                            "p2x": 0,
                            "p2y": 0.84920666666667,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 0.94712792276,
                            "cy": 0.33719122838435,
                            "p1x": 0,
                            "p1y": 0.84920666666667,
                            "p2x": 0.25592,
                            "p2y": 1.1626866666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.5,
                            "cy": -27.046959056675,
                            "p1x": 0.25592,
                            "p1y": 1.1626866666667,
                            "p2x": 6.74408,
                            "p2y": 1.1626866666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 6.05287207724,
                            "cy": 0.33719122838435,
                            "p1x": 6.74408,
                            "p1y": 1.1626866666667,
                            "p2x": 7,
                            "p2y": 0.84920666666667,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 7,
                "profileHeight": 1.7,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.75
                                },
                                "derivative": 0
                            },
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 5.25
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "sandmatte-coarse",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "milled",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "u",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.75
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "u",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 5.25
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 1.2,
                                "depth": 0.3,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 7
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "♡memo♡",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config6 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 3.820688682185,
                            "cy": 1.2134470351428,

                            "p1x": 4.5,
                            "p1y": 1.07,
                            "p2x": 4.38372,
                            "p2y": 0.8072,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.25,
                            "cy": 6.5384643318035,
                            "p1x": 4.38372,
                            "p1y": 0.8072,
                            "p2x": 0.11628,
                            "p2y": 0.8072,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.67931131781498,
                            "cy": 1.2134470351428,
                            "p1x": 0.11628,
                            "p1y": 0.8072,
                            "p2x": 0,
                            "p2y": 1.07,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 0.60505118751925,
                            "cy": 0.8713109557358,
                            "p1x": 0,
                            "p1y": 1.07,
                            "p2x": 0.24471,
                            "p2y": 1.3964,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.25,
                            "cy": -16.879241573436,
                            "p1x": 0.24471,
                            "p1y": 1.3964,
                            "p2x": 4.25529,
                            "p2y": 1.3964,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.8949488124807,
                            "cy": 0.8713109557358,
                            "p1x": 4.25529,
                            "p1y": 1.3964,
                            "p2x": 4.5,
                            "p2y": 1.07,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 47,
                "profileWidth": 4.5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.5
                                },
                                "derivative": 0
                            },
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 3
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "rough-bark",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "exclusive-matte",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "milled",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "rect",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.5
                                },
                                "materialOverride": {
                                    "surfaceOverride": "sandmatte-fine"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 3
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 0
                                },
                                "materialOverride": {
                                    "surfaceOverride": "sandmatte-fine"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 4.5
                                },
                                "materialOverride": {
                                    "surfaceOverride": "sandmatte-fine"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "hello",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "cross",
                        "gap": 0.1,
                        "lowering": 0.15,
                        "rows": "2",
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 1,
                        "middleShape": {
                            "offset": 2.25
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "channel"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 6.0963618777245,
                            "cy": 2.763314540328,
                            "p1x": 8,
                            "p1y": 0.63336,
                            "p2x": 6.9144,
                            "p2y": 0.02628,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4,
                            "cy": -16.18464518715,
                            "p1x": 6.9144,
                            "p1y": 0.02628,
                            "p2x": 1.0856,
                            "p2y": 0.02628,
                            "dir": "CCW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 1.9036381222755,
                            "cy": 2.763314540328,
                            "p1x": 1.0856,
                            "p1y": 0.02628,
                            "p2x": 0,
                            "p2y": 0.63336,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.63336,
                            "p2x": 0,
                            "p2y": 1.08876
                        }
                    },
                    {
                        "arc": {
                            "cx": 1.6426313712902,
                            "cy": -0.19762282549653,
                            "p1x": 0,
                            "p1y": 1.08876,
                            "p2x": 0.52656,
                            "p2y": 1.56516,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4,
                            "cy": -83.173056304433,
                            "p1x": 0.52656,
                            "p1y": 1.56516,
                            "p2x": 7.47344,
                            "p2y": 1.56516,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 6.3573686287098,
                            "cy": -0.19762282549653,
                            "p1x": 7.47344,
                            "p1y": 1.56516,
                            "p2x": 8,
                            "p2y": 1.08876,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 8,
                            "p1y": 1.08876,
                            "p2x": 8,
                            "p2y": 0.63336
                        }
                    }
                ],
                "circumference": 47,
                "profileWidth": 8,
                "profileHeight": 1.8,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 2.6666666666667
                                },
                                "derivative": 0
                            },
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 5.3333333333334
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "rough-bark",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "exclusive-matte",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "milled",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "rect",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 2.67
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 5.34
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 0
                                },
                                "materialOverride": {
                                    "surfaceOverride": "sandmatte-fine"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 8
                                },
                                "materialOverride": {
                                    "surfaceOverride": "sandmatte-fine"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "hello",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config7 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 4.5,
                            "p1y": 0.7363,
                            "p2x": 4.5,
                            "p2y": 0.1285
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.3003631593213,
                            "cy": 0.19233315661081,
                            "p1x": 4.5,
                            "p1y": 0.1285,
                            "p2x": 4.3848,
                            "p2y": 0.0005,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 4.3848,
                            "p1y": 0.0005,
                            "p2x": 0.1152,
                            "p2y": 0.0005
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 0.19963684067867,
                            "cy": 0.19233315661081,
                            "p1x": 0.1152,
                            "p1y": 0.0005,
                            "p2x": 0,
                            "p2y": 0.1285,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.1285,
                            "p2x": 0,
                            "p2y": 0.7363
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.40369978852484,
                            "cy": 0.65570269738107,
                            "p1x": 0,
                            "p1y": 0.7363,
                            "p2x": 0.10026,
                            "p2y": 0.9339,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.25,
                            "cy": -6.0220853529157,
                            "p1x": 0.10026,
                            "p1y": 0.9339,
                            "p2x": 4.39974,
                            "p2y": 0.9339,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.0963002114752,
                            "cy": 0.65570269738107,
                            "p1x": 4.39974,
                            "p1y": 0.9339,
                            "p2x": 4.5,
                            "p2y": 0.7363,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 47,
                "profileWidth": 4.5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "horizontal",
                                "middleShape": {
                                    "offset": 0.75
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "bark",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "diagonal-brushed",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "rect",
                                "width": 1.9,
                                "depth": 0.3,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 0
                                },
                                "materialOverride": {
                                    "surfaceOverride": "sandmatte-fine"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "hello",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "surface",
                        "gap": 0.1,
                        "lowering": 0.15,
                        "rows": 2,
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 6,
                        "middleShape": {
                            "offset": 2.25
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.7,
                            "height": 1.7
                        },
                        "setting": "section"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 7.7629285737336,
                            "cy": 0.2816952350218,
                            "p1x": 8,
                            "p1y": 0.0906,
                            "p2x": 7.88,
                            "p2y": 0.0006,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 7.88,
                            "p1y": 0.0006,
                            "p2x": 0.12,
                            "p2y": 0.0006
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.23707142626635,
                            "cy": 0.2816952350218,
                            "p1x": 0.12,
                            "p1y": 0.0006,
                            "p2x": 0,
                            "p2y": 0.0906,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.0906,
                            "p2x": 0,
                            "p2y": 1.71024
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.23707142626635,
                            "cy": 1.5191447649782,
                            "p1x": 0,
                            "p1y": 1.71024,
                            "p2x": 0.12,
                            "p2y": 1.80024,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 0.12,
                            "p1y": 1.80024,
                            "p2x": 7.88,
                            "p2y": 1.80024
                        }
                    },
                    {
                        "arc": {
                            "cx": 7.7629285737336,
                            "cy": 1.5191447649782,
                            "p1x": 7.88,
                            "p1y": 1.80024,
                            "p2x": 8,
                            "p2y": 1.71024,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 8,
                            "p1y": 1.71024,
                            "p2x": 8,
                            "p2y": 0.0906
                        }
                    }
                ],
                "circumference": 47,
                "profileWidth": 8,
                "profileHeight": 1.8,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "horizontal",
                                "middleShape": {
                                    "offset": 0.9
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "bark",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "diagonal-brushed",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "rect",
                                "width": 1.9,
                                "depth": 0.3,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 0
                                },
                                "materialOverride": {
                                    "surfaceOverride": "sandmatte-fine"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "hello",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config8 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.6585243203524,
                            "cy": 1.4289125372604,
                            "p1x": 6,
                            "p1y": 0.60778666666667,
                            "p2x": 5.31696,
                            "p2y": 0.00053333333333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 5.31696,
                            "p1y": 0.00053333333333333,
                            "p2x": 0.68304,
                            "p2y": 0.00053333333333333
                        }
                    },
                    {
                        "arc": {
                            "cx": 1.3414756796476,
                            "cy": 1.4289125372604,
                            "p1x": 0.68304,
                            "p1y": 0.00053333333333333,
                            "p2x": 0,
                            "p2y": 0.60778666666667,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 1.4061251723474,
                            "cy": -0.02429622315673,
                            "p1x": 0,
                            "p1y": 0.60768,
                            "p2x": 0.43608,
                            "p2y": 1.1738666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3,
                            "cy": -17.747685347865,
                            "p1x": 0.43608,
                            "p1y": 1.1738666666667,
                            "p2x": 5.56392,
                            "p2y": 1.1738666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.5938748276526,
                            "cy": -0.02429622315673,
                            "p1x": 5.56392,
                            "p1y": 1.1738666666667,
                            "p2x": 6,
                            "p2y": 0.60768,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 54,
                "profileWidth": 6,
                "profileHeight": 1.6,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 2
                                },
                                "derivative": 0
                            },
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 4.6822742474916
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "diagonal-brushed",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "hammered-matte",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "horizontal-brushed",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "rect",
                                "width": 0.6,
                                "depth": 0.3,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 2
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 4.6822742474916
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 6
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "surface",
                        "gap": 0.1,
                        "lowering": 0.15,
                        "rows": 1,
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 2,
                        "middleShape": {
                            "offset": 1.5
                        },
                        "stone": {
                            "cut": "princess",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "channel"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 3.4337884148,
                            "cy": 0.30367487262019,
                            "p1x": 3.62552,
                            "p1y": 0.17724,
                            "p2x": 3.516,
                            "p2y": 0.089226666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.00368,
                            "cy": 19.879059097371,
                            "p1x": 3.516,
                            "p1y": 0.089226666666667,
                            "p2x": 0.49136,
                            "p2y": 0.089226666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.57357158519997,
                            "cy": 0.30367487262019,
                            "p1x": 0.49136,
                            "p1y": 0.089226666666667,
                            "p2x": 0.38184,
                            "p2y": 0.17724,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0.38184,
                            "p1y": 0.17724,
                            "p2x": 0.01472,
                            "p2y": 1.0302133333333
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.28407797885691,
                            "cy": 1.0473848133215,
                            "p1x": 0.01472,
                            "p1y": 1.0302133333333,
                            "p2x": 0.12072,
                            "p2y": 1.26224,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.00368,
                            "cy": -19.31151760886,
                            "p1x": 0.12072,
                            "p1y": 1.26224,
                            "p2x": 3.88664,
                            "p2y": 1.26224,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.7232820211431,
                            "cy": 1.0473848133215,
                            "p1x": 3.88664,
                            "p1y": 1.26224,
                            "p2x": 3.99264,
                            "p2y": 1.0302133333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 3.99264,
                            "p1y": 1.0302133333333,
                            "p2x": 3.62552,
                            "p2y": 0.17724
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 4,
                "profileHeight": 1.4,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.3333333333333
                                },
                                "derivative": 0
                            },
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 2.6666666666666
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "diagonal-brushed",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "hammered-matte",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "horizontal-brushed",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "rect",
                                "width": 0.4,
                                "depth": 0.3,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.33
                                },
                                "materialOverride": {
                                    "surfaceOverride": "sandmatte-fine"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.6,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 2.66
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 4
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config9 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.6585243203524,
                            "cy": 1.4289125372604,
                            "p1x": 6,
                            "p1y": 0.60778666666667,
                            "p2x": 5.31696,
                            "p2y": 0.00053333333333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 5.31696,
                            "p1y": 0.00053333333333333,
                            "p2x": 0.68304,
                            "p2y": 0.00053333333333333
                        }
                    },
                    {
                        "arc": {
                            "cx": 1.3414756796476,
                            "cy": 1.4289125372604,
                            "p1x": 0.68304,
                            "p1y": 0.00053333333333333,
                            "p2x": 0,
                            "p2y": 0.60778666666667,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 1.4061251723474,
                            "cy": -0.02429622315673,
                            "p1x": 0,
                            "p1y": 0.60768,
                            "p2x": 0.43608,
                            "p2y": 1.1738666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3,
                            "cy": -17.747685347865,
                            "p1x": 0.43608,
                            "p1y": 1.1738666666667,
                            "p2x": 5.56392,
                            "p2y": 1.1738666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.5938748276526,
                            "cy": -0.02429622315673,
                            "p1x": 5.56392,
                            "p1y": 1.1738666666667,
                            "p2x": 6,
                            "p2y": 0.60768,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 54,
                "profileWidth": 6,
                "profileHeight": 1.6,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 2
                                },
                                "derivative": 0
                            },
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 4.6822742474916
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "diagonal-brushed",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "hammered-matte",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "horizontal-brushed",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "rect",
                                "width": 0.6,
                                "depth": 0.3,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 2
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.2,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 4.6822742474916
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 6
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "♡♡welcome to ring♡♡",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "surface",
                        "gap": 0.1,
                        "lowering": 0.15,
                        "rows": 1,
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 2,
                        "middleShape": {
                            "offset": 1.5
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "channel"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 3.4337884148,
                            "cy": 0.30367487262019,
                            "p1x": 3.62552,
                            "p1y": 0.17724,
                            "p2x": 3.516,
                            "p2y": 0.089226666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.00368,
                            "cy": 19.879059097371,
                            "p1x": 3.516,
                            "p1y": 0.089226666666667,
                            "p2x": 0.49136,
                            "p2y": 0.089226666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.57357158519997,
                            "cy": 0.30367487262019,
                            "p1x": 0.49136,
                            "p1y": 0.089226666666667,
                            "p2x": 0.38184,
                            "p2y": 0.17724,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0.38184,
                            "p1y": 0.17724,
                            "p2x": 0.01472,
                            "p2y": 1.0302133333333
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.28407797885691,
                            "cy": 1.0473848133215,
                            "p1x": 0.01472,
                            "p1y": 1.0302133333333,
                            "p2x": 0.12072,
                            "p2y": 1.26224,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.00368,
                            "cy": -19.31151760886,
                            "p1x": 0.12072,
                            "p1y": 1.26224,
                            "p2x": 3.88664,
                            "p2y": 1.26224,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.7232820211431,
                            "cy": 1.0473848133215,
                            "p1x": 3.88664,
                            "p1y": 1.26224,
                            "p2x": 3.99264,
                            "p2y": 1.0302133333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 3.99264,
                            "p1y": 1.0302133333333,
                            "p2x": 3.62552,
                            "p2y": 0.17724
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 4,
                "profileHeight": 1.4,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.3333333333333
                                },
                                "derivative": 0
                            },
                            {
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 2.6666666666666
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "diagonal-brushed",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "hammered-matte",
                                    "gradient": "whitegold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "whitegold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "horizontal-brushed",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "rect",
                                "width": 0.4,
                                "depth": 0.3,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 1.33
                                },
                                "materialOverride": {
                                    "surfaceOverride": "sandmatte-fine"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.6,
                                "depth": 0.1,
                                "angle": 90,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 2.66
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            },
                            {
                                "type": "rect",
                                "width": 0.7,
                                "depth": 0.2,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 4
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "♡♡welcome to ring♡♡",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config10 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.9704253022965,
                            "cy": 0.84794909375857,
                            "p1x": 5.9376,
                            "p1y": 0.72234666666667,
                            "p2x": 5.6046,
                            "p2y": 0.10698666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.00564,
                            "cy": 76.789623454247,
                            "p1x": 5.6046,
                            "p1y": 0.10698666666667,
                            "p2x": 0.40668,
                            "p2y": 0.10698666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 1.0408546977035,
                            "cy": 0.84794909375857,
                            "p1x": 0.40668,
                            "p1y": 0.10698666666667,
                            "p2x": 0.07368,
                            "p2y": 0.72234666666667,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0.07368,
                            "p1y": 0.72234666666667,
                            "p2x": 0.5586,
                            "p2y": 1.3777066666667
                        }
                    },
                    {
                        "arc": {
                            "cx": 1.0413965289615,
                            "cy": 0.77217243216491,
                            "p1x": 0.5586,
                            "p1y": 1.3777066666667,
                            "p2x": 0.807,
                            "p2y": 1.5102933333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.00564,
                            "cy": -67.111827025882,
                            "p1x": 0.807,
                            "p1y": 1.5102933333333,
                            "p2x": 5.20428,
                            "p2y": 1.5102933333333,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.9700828582554,
                            "cy": 0.77210914471268,
                            "p1x": 5.20428,
                            "p1y": 1.5102933333333,
                            "p2x": 5.4528,
                            "p2y": 1.3777066666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 5.4528,
                            "p1y": 1.3777066666667,
                            "p2x": 5.9376,
                            "p2y": 0.72234666666667
                        }
                    }
                ],
                "circumference": 51.99,
                "profileWidth": 6,
                "profileHeight": 1.6,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "horizontal",
                                "middleShape": {
                                    "offset": 0.8
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "hammered-sand-matte",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "rubbed",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "rect",
                                "width": 2.2,
                                "depth": 0.3,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 0
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "♡♡welcome to ring♡♡",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "surface",
                        "gap": 1.5,
                        "lowering": 0,
                        "rows": 1,
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 3,
                        "middleShape": {
                            "offset": 4.5
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "rubbed"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 6.05287207724,
                            "cy": 1.361222104949,
                            "p1x": 7,
                            "p1y": 0.84920666666667,
                            "p2x": 6.74408,
                            "p2y": 0.53572666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.5,
                            "cy": 28.745372390008,
                            "p1x": 6.74408,
                            "p1y": 0.53572666666667,
                            "p2x": 0.25592,
                            "p2y": 0.53572666666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.94712792276,
                            "cy": 1.361222104949,
                            "p1x": 0.25592,
                            "p1y": 0.53572666666667,
                            "p2x": 0,
                            "p2y": 0.84920666666667,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 0.94712792276,
                            "cy": 0.33719122838435,
                            "p1x": 0,
                            "p1y": 0.84920666666667,
                            "p2x": 0.25592,
                            "p2y": 1.1626866666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 3.5,
                            "cy": -27.046959056675,
                            "p1x": 0.25592,
                            "p1y": 1.1626866666667,
                            "p2x": 6.74408,
                            "p2y": 1.1626866666667,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 6.05287207724,
                            "cy": 0.33719122838435,
                            "p1x": 6.74408,
                            "p1y": 1.1626866666667,
                            "p2x": 7,
                            "p2y": 0.84920666666667,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 7,
                "profileHeight": 1.7,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [
                            {
                                "orientation": "horizontal",
                                "middleShape": {
                                    "offset": 0.85
                                },
                                "derivative": 0
                            }
                        ],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "hammered-sand-matte",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            },
                            {
                                "outerMaterial": {
                                    "surface": "rubbed",
                                    "gradient": "pinkgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "pinkgold"
                                }
                            }
                        ],
                        "grooves": [
                            {
                                "type": "rect",
                                "width": 2.2,
                                "depth": 0.3,
                                "orientation": "vertical",
                                "middleShape": {
                                    "offset": 0
                                },
                                "materialOverride": {
                                    "surfaceOverride": "polished"
                                }
                            }
                        ]
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "text": "♡♡welcome to ring♡♡",
                                "carveType": "diamond",
                                "font": "arbat",
                                "height": 2,
                                "width": 2,
                                "paddingRight": 0,
                                "paddingLeft": 0,
                                "paddingBottom": 0,
                                "paddingTop": 0
                            },
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config11 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.4722,
                            "cy": 0.5278,
                            "p1x": 5,
                            "p1y": 0.5278,
                            "p2x": 4.3215,
                            "p2y": 0.0219,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": -6.0951,
                            "p1x": 4.3215,
                            "p1y": 0.0219,
                            "p2x": 0.6785,
                            "p2y": 0.0219,
                            "dir": "CCW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.5278,
                            "cy": 0.5278,
                            "p1x": 0.6785,
                            "p1y": 0.0219,
                            "p2x": 0,
                            "p2y": 0.5278,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.5278,
                            "p2x": 0,
                            "p2y": 0.9073
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.404,
                            "cy": 0.9073,
                            "p1x": 0,
                            "p1y": 0.9073,
                            "p2x": 0.3291,
                            "p2y": 1.3043,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": -10.2018,
                            "p1x": 0.3291,
                            "p1y": 1.3043,
                            "p2x": 4.6709,
                            "p2y": 1.3043,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.596,
                            "cy": 0.9073,
                            "p1x": 4.6709,
                            "p1y": 1.3043,
                            "p2x": 5,
                            "p2y": 0.9073,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 5,
                            "p1y": 0.9073,
                            "p2x": 5,
                            "p2y": 0.5278
                        }
                    }
                ],
                "circumference": 54,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "surface",
                        "gap": 0.1,
                        "lowering": 0,
                        "rows": 1,
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 1,
                        "middleShape": {
                            "offset": 2.5
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "rubbed"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.4722,
                            "cy": 0.5278,
                            "p1x": 5,
                            "p1y": 0.5278,
                            "p2x": 4.3215,
                            "p2y": 0.0219,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": -6.0951,
                            "p1x": 4.3215,
                            "p1y": 0.0219,
                            "p2x": 0.6785,
                            "p2y": 0.0219,
                            "dir": "CCW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.5278,
                            "cy": 0.5278,
                            "p1x": 0.6785,
                            "p1y": 0.0219,
                            "p2x": 0,
                            "p2y": 0.5278,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.5278,
                            "p2x": 0,
                            "p2y": 0.9073
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.404,
                            "cy": 0.9073,
                            "p1x": 0,
                            "p1y": 0.9073,
                            "p2x": 0.3291,
                            "p2y": 1.3043,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": -10.2018,
                            "p1x": 0.3291,
                            "p1y": 1.3043,
                            "p2x": 4.6709,
                            "p2y": 1.3043,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.596,
                            "cy": 0.9073,
                            "p1x": 4.6709,
                            "p1y": 1.3043,
                            "p2x": 5,
                            "p2y": 0.9073,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 5,
                            "p1y": 0.9073,
                            "p2x": 5,
                            "p2y": 0.5278
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config12 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.925,
                            "cy": 0.0755,
                            "p1x": 5,
                            "p1y": 0.0755,
                            "p2x": 4.925,
                            "p2y": 0.0005,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 4.925,
                            "p1y": 0.0005,
                            "p2x": 0.075,
                            "p2y": 0.0005
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.075,
                            "cy": 0.0755,
                            "p1x": 0.075,
                            "p1y": 0.0005,
                            "p2x": 0,
                            "p2y": 0.0755,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.0755,
                            "p2x": 0,
                            "p2y": 1.4252
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.075,
                            "cy": 1.4252,
                            "p1x": 0,
                            "p1y": 1.4252,
                            "p2x": 0.075,
                            "p2y": 1.5002,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 0.075,
                            "p1y": 1.5002,
                            "p2x": 4.925,
                            "p2y": 1.5002
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.925,
                            "cy": 1.4252,
                            "p1x": 4.925,
                            "p1y": 1.5002,
                            "p2x": 5,
                            "p2y": 1.4252,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 5,
                            "p1y": 1.4252,
                            "p2x": 5,
                            "p2y": 0.0755
                        }
                    }
                ],
                "circumference": 54,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "surface",
                        "gap": 0.1,
                        "lowering": 0,
                        "rows": 1,
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 1,
                        "middleShape": {
                            "offset": 2.5
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "rubbed"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.925,
                            "cy": 0.0755,
                            "p1x": 5,
                            "p1y": 0.0755,
                            "p2x": 4.925,
                            "p2y": 0.0005,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 4.925,
                            "p1y": 0.0005,
                            "p2x": 0.075,
                            "p2y": 0.0005
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.075,
                            "cy": 0.0755,
                            "p1x": 0.075,
                            "p1y": 0.0005,
                            "p2x": 0,
                            "p2y": 0.0755,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.0755,
                            "p2x": 0,
                            "p2y": 1.4252
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.075,
                            "cy": 1.4252,
                            "p1x": 0,
                            "p1y": 1.4252,
                            "p2x": 0.075,
                            "p2y": 1.5002,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 0.075,
                            "p1y": 1.5002,
                            "p2x": 4.925,
                            "p2y": 1.5002
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.925,
                            "cy": 1.4252,
                            "p1x": 4.925,
                            "p1y": 1.5002,
                            "p2x": 5,
                            "p2y": 1.4252,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 5,
                            "p1y": 1.4252,
                            "p2x": 5,
                            "p2y": 0.0755
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config13 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.6993,
                            "cy": 0.7493,
                            "p1x": 5,
                            "p1y": 0.7493,
                            "p2x": 4.8172,
                            "p2y": 0.4727,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": 5.9075,
                            "p1x": 4.8172,
                            "p1y": 0.4727,
                            "p2x": 0.1828,
                            "p2y": 0.4727,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.3007,
                            "cy": 0.7493,
                            "p1x": 0.1828,
                            "p1y": 0.4727,
                            "p2x": 0,
                            "p2y": 0.7493,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 0.3007,
                            "cy": 0.7493,
                            "p1x": 0,
                            "p1y": 0.7493,
                            "p2x": 0.1828,
                            "p2y": 1.0259,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": -4.4088,
                            "p1x": 0.1828,
                            "p1y": 1.0259,
                            "p2x": 4.8172,
                            "p2y": 1.0259,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.6993,
                            "cy": 0.7493,
                            "p1x": 4.8172,
                            "p1y": 1.0259,
                            "p2x": 5,
                            "p2y": 0.7493,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 54,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "surface",
                        "gap": 0.1,
                        "lowering": 0,
                        "rows": 1,
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 1,
                        "middleShape": {
                            "offset": 2.5
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "rubbed"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.6993,
                            "cy": 0.7493,
                            "p1x": 5,
                            "p1y": 0.7493,
                            "p2x": 4.8172,
                            "p2y": 0.4727,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": 5.9075,
                            "p1x": 4.8172,
                            "p1y": 0.4727,
                            "p2x": 0.1828,
                            "p2y": 0.4727,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.3007,
                            "cy": 0.7493,
                            "p1x": 0.1828,
                            "p1y": 0.4727,
                            "p2x": 0,
                            "p2y": 0.7493,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 0.3007,
                            "cy": 0.7493,
                            "p1x": 0,
                            "p1y": 0.7493,
                            "p2x": 0.1828,
                            "p2y": 1.0259,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": -4.4088,
                            "p1x": 0.1828,
                            "p1y": 1.0259,
                            "p2x": 4.8172,
                            "p2y": 1.0259,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.6993,
                            "cy": 0.7493,
                            "p1x": 4.8172,
                            "p1y": 1.0259,
                            "p2x": 5,
                            "p2y": 0.7493,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config14 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.3139,
                            "cy": 0.6864,
                            "p1x": 5,
                            "p1y": 0.6864,
                            "p2x": 4.3141,
                            "p2y": 0.0003,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 4.3141,
                            "p1y": 0.0003,
                            "p2x": 0.6859,
                            "p2y": 0.0003
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.6861,
                            "cy": 0.6864,
                            "p1x": 0.6859,
                            "p1y": 0.0003,
                            "p2x": 0,
                            "p2y": 0.6864,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.6864,
                            "p2x": 0,
                            "p2y": 0.7143
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.6861,
                            "cy": 0.7143,
                            "p1x": 0,
                            "p1y": 0.7143,
                            "p2x": 0.6859,
                            "p2y": 1.4003,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 0.6859,
                            "p1y": 1.4003,
                            "p2x": 4.3141,
                            "p2y": 1.4003
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.3139,
                            "cy": 0.7143,
                            "p1x": 4.3141,
                            "p1y": 1.4003,
                            "p2x": 5,
                            "p2y": 0.7143,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 5,
                            "p1y": 0.7143,
                            "p2x": 5,
                            "p2y": 0.6864
                        }
                    }
                ],
                "circumference": 54,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "surface",
                        "gap": 0.1,
                        "lowering": 0,
                        "rows": 1,
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 1,
                        "middleShape": {
                            "offset": 2.5
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "rubbed"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.3139,
                            "cy": 0.6864,
                            "p1x": 5,
                            "p1y": 0.6864,
                            "p2x": 4.3141,
                            "p2y": 0.0003,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 4.3141,
                            "p1y": 0.0003,
                            "p2x": 0.6859,
                            "p2y": 0.0003
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.6861,
                            "cy": 0.6864,
                            "p1x": 0.6859,
                            "p1y": 0.0003,
                            "p2x": 0,
                            "p2y": 0.6864,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.6864,
                            "p2x": 0,
                            "p2y": 0.7143
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.6861,
                            "cy": 0.7143,
                            "p1x": 0,
                            "p1y": 0.7143,
                            "p2x": 0.6859,
                            "p2y": 1.4003,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 0.6859,
                            "p1y": 1.4003,
                            "p2x": 4.3141,
                            "p2y": 1.4003
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.3139,
                            "cy": 0.7143,
                            "p1x": 4.3141,
                            "p1y": 1.4003,
                            "p2x": 5,
                            "p2y": 0.7143,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 5,
                            "p1y": 0.7143,
                            "p2x": 5,
                            "p2y": 0.6864
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config15 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 5,
                            "p1y": 0.9903,
                            "p2x": 5,
                            "p2y": 0.5103
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.8369,
                            "cy": 0.5103,
                            "p1x": 5,
                            "p1y": 0.5103,
                            "p2x": 4.8843,
                            "p2y": 0.3543,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": 8.2081,
                            "p1x": 4.8843,
                            "p1y": 0.3543,
                            "p2x": 0.1157,
                            "p2y": 0.3543,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 0.1631,
                            "cy": 0.5103,
                            "p1x": 0.1157,
                            "p1y": 0.3543,
                            "p2x": 0,
                            "p2y": 0.5103,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.5103,
                            "p2x": 0,
                            "p2y": 0.9903
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.1631,
                            "cy": 0.9903,
                            "p1x": 0,
                            "p1y": 0.9903,
                            "p2x": 0.1157,
                            "p2y": 1.1464,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": -6.7075,
                            "p1x": 0.1157,
                            "p1y": 1.1464,
                            "p2x": 4.8843,
                            "p2y": 1.1464,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.8369,
                            "cy": 0.9903,
                            "p1x": 4.8843,
                            "p1y": 1.1464,
                            "p2x": 5,
                            "p2y": 0.9903,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 54,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "surface",
                        "gap": 0.1,
                        "lowering": 0,
                        "rows": 1,
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 1,
                        "middleShape": {
                            "offset": 2.5
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "rubbed"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 5,
                            "p1y": 0.9903,
                            "p2x": 5,
                            "p2y": 0.5103
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.8369,
                            "cy": 0.5103,
                            "p1x": 5,
                            "p1y": 0.5103,
                            "p2x": 4.8843,
                            "p2y": 0.3543,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": 8.2081,
                            "p1x": 4.8843,
                            "p1y": 0.3543,
                            "p2x": 0.1157,
                            "p2y": 0.3543,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 0.1631,
                            "cy": 0.5103,
                            "p1x": 0.1157,
                            "p1y": 0.3543,
                            "p2x": 0,
                            "p2y": 0.5103,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.5103,
                            "p2x": 0,
                            "p2y": 0.9903
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.1631,
                            "cy": 0.9903,
                            "p1x": 0,
                            "p1y": 0.9903,
                            "p2x": 0.1157,
                            "p2y": 1.1464,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": -6.7075,
                            "p1x": 0.1157,
                            "p1y": 1.1464,
                            "p2x": 4.8843,
                            "p2y": 1.1464,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.8369,
                            "cy": 0.9903,
                            "p1x": 4.8843,
                            "p1y": 1.1464,
                            "p2x": 5,
                            "p2y": 0.9903,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config16 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 5,
                            "p1y": 0.7363,
                            "p2x": 5,
                            "p2y": 0.1285
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.872,
                            "cy": 0.1285,
                            "p1x": 5,
                            "p1y": 0.1285,
                            "p2x": 4.872,
                            "p2y": 0.0005,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 4.872,
                            "p1y": 0.0005,
                            "p2x": 0.128,
                            "p2y": 0.0005
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 0.128,
                            "cy": 0.1285,
                            "p1x": 0.128,
                            "p1y": 0.0005,
                            "p2x": 0,
                            "p2y": 0.1285,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.1285,
                            "p2x": 0,
                            "p2y": 0.7363
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.2309,
                            "cy": 0.7363,
                            "p1x": 0,
                            "p1y": 0.7363,
                            "p2x": 0.1114,
                            "p2y": 0.9339,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": -3.0136,
                            "p1x": 0.1114,
                            "p1y": 0.9339,
                            "p2x": 4.8886,
                            "p2y": 0.9339,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.7691,
                            "cy": 0.7363,
                            "p1x": 4.8886,
                            "p1y": 0.9339,
                            "p2x": 5,
                            "p2y": 0.7363,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 54,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "surface",
                        "gap": 0.1,
                        "lowering": 0,
                        "rows": 1,
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 1,
                        "middleShape": {
                            "offset": 2.5
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "rubbed"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 5,
                            "p1y": 0.7363,
                            "p2x": 5,
                            "p2y": 0.1285
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.872,
                            "cy": 0.1285,
                            "p1x": 5,
                            "p1y": 0.1285,
                            "p2x": 4.872,
                            "p2y": 0.0005,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 4.872,
                            "p1y": 0.0005,
                            "p2x": 0.128,
                            "p2y": 0.0005
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "arc": {
                            "cx": 0.128,
                            "cy": 0.1285,
                            "p1x": 0.128,
                            "p1y": 0.0005,
                            "p2x": 0,
                            "p2y": 0.1285,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.1285,
                            "p2x": 0,
                            "p2y": 0.7363
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.2309,
                            "cy": 0.7363,
                            "p1x": 0,
                            "p1y": 0.7363,
                            "p2x": 0.1114,
                            "p2y": 0.9339,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": -3.0136,
                            "p1x": 0.1114,
                            "p1y": 0.9339,
                            "p2x": 4.8886,
                            "p2y": 0.9339,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.7691,
                            "cy": 0.7363,
                            "p1x": 4.8886,
                            "p1y": 0.9339,
                            "p2x": 5,
                            "p2y": 0.7363,
                            "dir": "CW"
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config17 = {
    "shapeRingScene": {
        "ringModels": [
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.8275,
                            "cy": 0.3303,
                            "p1x": 5,
                            "p1y": 0.3303,
                            "p2x": 4.8507,
                            "p2y": 0.1594,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": 17.4514,
                            "p1x": 4.8507,
                            "p1y": 0.1594,
                            "p2x": 0.1493,
                            "p2y": 0.1594,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.1725,
                            "cy": 0.3303,
                            "p1x": 0.1493,
                            "p1y": 0.1594,
                            "p2x": 0,
                            "p2y": 0.3303,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.3303,
                            "p2x": 0,
                            "p2y": 1.1703
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.1725,
                            "cy": 1.1703,
                            "p1x": 0,
                            "p1y": 1.1703,
                            "p2x": 0.1493,
                            "p2y": 1.3413,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": -15.9508,
                            "p1x": 0.1493,
                            "p1y": 1.3413,
                            "p2x": 4.8507,
                            "p2y": 1.3413,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.8275,
                            "cy": 1.1703,
                            "p1x": 4.8507,
                            "p1y": 1.3413,
                            "p2x": 5,
                            "p2y": 1.1703,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 5,
                            "p1y": 1.1703,
                            "p2x": 5,
                            "p2y": 0.3303
                        }
                    }
                ],
                "circumference": 54,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [
                    {
                        "orientation": "surface",
                        "gap": 0.1,
                        "lowering": 0,
                        "rows": 1,
                        "shiftAngleOnSurface": -0.006718192700065,
                        "stonePerRow": 1,
                        "middleShape": {
                            "offset": 2.5
                        },
                        "stone": {
                            "cut": "brilliant",
                            "color": "white",
                            "rotationAngle": 0,
                            "width": 1.5,
                            "height": 1.5
                        },
                        "setting": "rubbed"
                    }
                ],
                "configProperties": {
                    "facetIndexes": []
                }
            },
            {
                "outerProfileShapes": [
                    {
                        "arc": {
                            "cx": 4.8275,
                            "cy": 0.3303,
                            "p1x": 5,
                            "p1y": 0.3303,
                            "p2x": 4.8507,
                            "p2y": 0.1594,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": 17.4514,
                            "p1x": 4.8507,
                            "p1y": 0.1594,
                            "p2x": 0.1493,
                            "p2y": 0.1594,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.1725,
                            "cy": 0.3303,
                            "p1x": 0.1493,
                            "p1y": 0.1594,
                            "p2x": 0,
                            "p2y": 0.3303,
                            "dir": "CW"
                        }
                    }
                ],
                "innerProfileShapes": [
                    {
                        "segment": {
                            "p1x": 0,
                            "p1y": 0.3303,
                            "p2x": 0,
                            "p2y": 1.1703
                        }
                    },
                    {
                        "arc": {
                            "cx": 0.1725,
                            "cy": 1.1703,
                            "p1x": 0,
                            "p1y": 1.1703,
                            "p2x": 0.1493,
                            "p2y": 1.3413,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 2.5,
                            "cy": -15.9508,
                            "p1x": 0.1493,
                            "p1y": 1.3413,
                            "p2x": 4.8507,
                            "p2y": 1.3413,
                            "dir": "CW"
                        }
                    },
                    {
                        "arc": {
                            "cx": 4.8275,
                            "cy": 1.1703,
                            "p1x": 4.8507,
                            "p1y": 1.3413,
                            "p2x": 5,
                            "p2y": 1.1703,
                            "dir": "CW"
                        }
                    },
                    {
                        "segment": {
                            "p1x": 5,
                            "p1y": 1.1703,
                            "p2x": 5,
                            "p2y": 0.3303
                        }
                    }
                ],
                "circumference": 60,
                "profileWidth": 5,
                "profileHeight": 1.5,
                "segments": [
                    {
                        "start": 0,
                        "end": 1,
                        "slices": [],
                        "disks": [
                            {
                                "outerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                },
                                "innerMaterial": {
                                    "surface": "polished",
                                    "gradient": "yellowgold"
                                }
                            }
                        ],
                        "grooves": []
                    }
                ],
                "engravingLayouts": [
                    {
                        "type": "vertical",
                        "verticalAlign": "middle",
                        "startAngle": 0.5,
                        "gap": 0,
                        "children": [
                            {
                                "type": "text",
                                "font": "arial",
                                "carveType": "diamond",
                                "height": 1.5,
                                "text": "18k",
                                "paddingTop": 1,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            },
                            {
                                "type": "stamp",
                                "stampForm": "logo",
                                "height": 1.5,
                                "paddingTop": 0.5,
                                "paddingRight": 0,
                                "paddingBottom": 0,
                                "paddingLeft": 0
                            }
                        ]
                    }
                ],
                "diamondGroups": [],
                "configProperties": {
                    "facetIndexes": []
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
const config18 = {
    "shapeRingScene": {
        "ringModels": [
            {
                outerProfileShapes: [
                    {
                        arc: {
                            cx: 4.4722,
                            cy: 0.5278,
                            p1x: 5,
                            p1y: 0.5278,
                            p2x: 4.3215,
                            p2y: 0.0219,
                            dir: "CW",
                        },
                    },
                    {
                        arc: {
                            cx: 2.5,
                            cy: -6.0951,
                            p1x: 4.3215,
                            p1y: 0.0219,
                            p2x: 0.6785,
                            p2y: 0.0219,
                            dir: "CCW",
                        },
                    },
                    {
                        arc: {
                            cx: 0.5278,
                            cy: 0.5278,
                            p1x: 0.6785,
                            p1y: 0.0219,
                            p2x: 0,
                            p2y: 0.5278,
                            dir: "CW",
                        },
                    },
                ],
                innerProfileShapes: [
                    {
                        segment: {
                            p1x: 0,
                            p1y: 0.5278,
                            p2x: 0,
                            p2y: 0.9073,
                        },
                    },
                    {
                        arc: {
                            cx: 0.404,
                            cy: 0.9073,
                            p1x: 0,
                            p1y: 0.9073,
                            p2x: 0.3291,
                            p2y: 1.3043,
                            dir: "CW",
                        },
                    },
                    {
                        arc: {
                            cx: 2.5,
                            cy: -10.2018,
                            p1x: 0.3291,
                            p1y: 1.3043,
                            p2x: 4.6709,
                            p2y: 1.3043,
                            dir: "CW",
                        },
                    },
                    {
                        arc: {
                            cx: 4.596,
                            cy: 0.9073,
                            p1x: 4.6709,
                            p1y: 1.3043,
                            p2x: 5,
                            p2y: 0.9073,
                            dir: "CW",
                        },
                    },
                    {
                        segment: {
                            p1x: 5,
                            p1y: 0.9073,
                            p2x: 5,
                            p2y: 0.5278,
                        },
                    },
                ],
                circumference: 68.02,
                profileWidth: 5,
                profileHeight: 1.5,
                segments: [
                    {
                        start: 0,
                        end: 1,
                        slices: [
                            {
                                orientation: "vertical",
                                middleShape: {
                                    offset: 2.5,
                                    sine: {
                                        amplitude: 0.75,
                                        shiftAngle: 0,
                                        numberOfCycles: 6,
                                    },
                                },
                                derivative: 0,
                            },
                        ],
                        disks: [
                            {
                                outerMaterial: {
                                    surface: "polished",
                                    gradient: "yellowgold",
                                },
                                innerMaterial: {
                                    surface: "polished",
                                    gradient: "yellowgold",
                                },
                            },
                            {
                                outerMaterial: {
                                    surface: "polished",
                                    gradient: "whitegold",
                                },
                                innerMaterial: {
                                    surface: "polished",
                                    gradient: "whitegold",
                                },
                            },
                        ],
                        grooves: [
                            {
                                type: "v",
                                width: 0.2,
                                depth: 0.1,
                                angle: 90,
                                orientation: "vertical",
                                middleShape: {
                                    offset: 2.5,
                                    sine: {
                                        amplitude: 0.75,
                                        shiftAngle: 0,
                                        numberOfCycles: 6,
                                    },
                                },
                                materialOverride: {
                                    surfaceOverride: "polished",
                                },
                            },
                            {
                                type: "rect",
                                width: 0.4,
                                depth: 0.2,
                                orientation: "vertical",
                                middleShape: {
                                    offset: 0,
                                },
                                materialOverride: {
                                    surfaceOverride: "polished",
                                },
                            },
                            {
                                type: "rect",
                                width: 0.4,
                                depth: 0.2,
                                orientation: "vertical",
                                middleShape: {
                                    offset: 5,
                                },
                                materialOverride: {
                                    surfaceOverride: "polished",
                                },
                            },
                        ],
                    },
                ],
                engravingLayouts: [
                    {
                        type: "vertical",
                        verticalAlign: "middle",
                        startAngle: 0.5,
                        gap: 0,
                        children: [
                            {
                                type: "text",
                                text: "Ring",
                                carveType: "laser",
                                font: "arial",
                                height: 2,
                                width: 2,
                                paddingRight: 0,
                                paddingLeft: 0,
                                paddingBottom: 0,
                                paddingTop: 0,
                            },
                            {
                                type: "text",
                                font: "arial",
                                carveType: "laser",
                                height: 1.5,
                                text: "18k",
                                paddingTop: 1,
                                paddingRight: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                            },
                            {
                                type: "stamp",
                                stampForm: "logo",
                                height: 1.5,
                                paddingTop: 0.5,
                                paddingRight: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                            },
                        ],
                    },
                ],
                diamondGroups: [
                    {
                        orientation: "surface",
                        gap: 0.5,
                        lowering: 0,
                        rows: 1,
                        shiftAngleOnSurface: -0.006718192700065,
                        stonePerRow: 2,
                        middleShape: {
                            offset: 2.5,
                        },
                        stone: {
                            cut: "brilliant",
                            color: "white",
                            rotationAngle: 0,
                            width: 1.5,
                            height: 1.5,
                        },
                        setting: "rubbed",
                    },
                ],
                configProperties: {
                    facetIndexes: [],
                }
            },
            {
                outerProfileShapes: [
                    {
                        arc: {
                            cx: 4.356,
                            cy: 0.33,
                            p1x: 4.5598,
                            p1y: 0.196,
                            p2x: 4.3785,
                            p2y: 0.0872,
                            dir: "CW",
                        },
                    },
                    {
                        arc: {
                            cx: 2.5041,
                            cy: 20.2722,
                            p1x: 4.3785,
                            p1y: 0.0872,
                            p2x: 0.6297,
                            p2y: 0.0872,
                            dir: "CW",
                        },
                    },
                    {
                        arc: {
                            cx: 0.6522,
                            cy: 0.33,
                            p1x: 0.6297,
                            p1y: 0.0872,
                            p2x: 0.4485,
                            p2y: 0.196,
                            dir: "CW",
                        },
                    },
                ],
                innerProfileShapes: [
                    {
                        segment: {
                            p1x: 0.4485,
                            p1y: 0.196,
                            p2x: 0.0669,
                            p2y: 0.7761,
                        },
                    },
                    {
                        arc: {
                            cx: 0.407,
                            cy: 0.9997,
                            p1x: 0.0669,
                            p1y: 0.7761,
                            p2x: 0.3707,
                            p2y: 1.405,
                            dir: "CW",
                        },
                    },
                    {
                        arc: {
                            cx: 2.5041,
                            cy: -22.4247,
                            p1x: 0.3707,
                            p1y: 1.405,
                            p2x: 4.6376,
                            p2y: 1.405,
                            dir: "CW",
                        },
                    },
                    {
                        arc: {
                            cx: 4.6013,
                            cy: 0.9997,
                            p1x: 4.6376,
                            p1y: 1.405,
                            p2x: 4.9413,
                            p2y: 0.7761,
                            dir: "CW",
                        },
                    },
                    {
                        segment: {
                            p1x: 4.9413,
                            p1y: 0.7761,
                            p2x: 4.5598,
                            p2y: 0.196,
                        },
                    },
                ],
                circumference: 60,
                profileWidth: 5,
                profileHeight: 1.5,
                segments: [
                    {
                        start: 0,
                        end: 1,
                        slices: [
                            {
                                orientation: "vertical",
                                middleShape: {
                                    offset: 2.5,
                                    sine: {
                                        amplitude: 0.75,
                                        shiftAngle: 0,
                                        numberOfCycles: 6,
                                    },
                                },
                                derivative: 0,
                            },
                        ],
                        disks: [
                            {
                                outerMaterial: {
                                    surface: "polished",
                                    gradient: "yellowgold",
                                },
                                innerMaterial: {
                                    surface: "polished",
                                    gradient: "yellowgold",
                                },
                            },
                            {
                                outerMaterial: {
                                    surface: "polished",
                                    gradient: "whitegold",
                                },
                                innerMaterial: {
                                    surface: "polished",
                                    gradient: "whitegold",
                                },
                            },
                        ],
                        grooves: [
                            {
                                type: "v",
                                width: 0.2,
                                depth: 0.1,
                                angle: 90,
                                orientation: "vertical",
                                middleShape: {
                                    offset: 2.5,
                                    sine: {
                                        amplitude: 0.75,
                                        shiftAngle: 0,
                                        numberOfCycles: 6,
                                    },
                                },
                                materialOverride: {
                                    surfaceOverride: "polished",
                                },
                            },
                            {
                                type: "rect",
                                width: 0.7,
                                depth: 0.2,
                                orientation: "vertical",
                                middleShape: {
                                    offset: 0,
                                },
                                materialOverride: {
                                    surfaceOverride: "polished",
                                },
                            },
                            {
                                type: "rect",
                                width: 0.7,
                                depth: 0.2,
                                orientation: "vertical",
                                middleShape: {
                                    offset: 5,
                                },
                                materialOverride: {
                                    surfaceOverride: "polished",
                                },
                            },
                        ],
                    },
                ],
                engravingLayouts: [
                    {
                        type: "vertical",
                        verticalAlign: "middle",
                        startAngle: 0.5,
                        gap: 0,
                        children: [
                            {
                                type: "text",
                                text: "Ring",
                                carveType: "laser",
                                font: "arial",
                                height: 2,
                                width: 2,
                                paddingRight: 0,
                                paddingLeft: 0,
                                paddingBottom: 0,
                                paddingTop: 0,
                            },
                            {
                                type: "text",
                                font: "arial",
                                carveType: "laser",
                                height: 1.5,
                                text: "18k",
                                paddingTop: 1,
                                paddingRight: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                            },
                            {
                                type: "stamp",
                                stampForm: "logo",
                                height: 1.5,
                                paddingTop: 0.5,
                                paddingRight: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                            },
                        ],
                    },
                ],
                diamondGroups: [],
                configProperties: {
                    facetIndexes: [],
                }
            }
        ]
    },
    "modelRingScene": {
        "ringModels": []
    }
}
class TestConfig {
    constructor(config) {
        if (config == null) config = defaultConfig;
        this.configs = new Array(0);
        for (var i = 0; i < config.shapeRingScene.ringModels.length; i++)
            this.configs.push(ShapeRingConfigParser.get_instance().parseSingleRing(config.shapeRingScene.ringModels[i]));
    }
    static testConfigArray = [
        config1, config2, config3, config4, config5, config6, config7, config8, config9, config10, config11,
        config12, config13, config14, config15, config16, config17, config18
    ];
}
export {
    TestConfig
};