const object = 
{
    //usecase id
    150 : {
        //순서대로 실행되는 api 리스트 목록이 떠야 해서 순서정보 있어야겠는데
        //linkedlist 방식을 채용하자(중간에 삭제 될 수도 있으니까)
        //api-root
        "rootApiId" : 1,
        //같은 api가 여러번 실행될 수 있다는 조건 추가해야됨
        //10개 이상이 안되게 하는게 맛다.
        //api-id

        // step 1 : pathvar를 통해 usename 입력, params를 통해 param 전송 -> user저장 + 주소 저장 + 주문목록 저장 + access token 리턴
        "1" : {
            "additional_url" : "/api/tmp/user/:userName",
            "order" : 1,
            "child" : 2,
            "request" : {
                "headers" : {
                    "Content-Type": {
                        "type" : "String",
                        "desc" : "Define request data type",
                        "mapped": false,
                        "value" : "application/json"
                    },
                    "Authorization" : {
                        "Type" : "String",
                        "Desc" : "access token",
                        "mapped": false,
                        "Value" : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODM1OTE4MzEsInN1YiI6ImFjY2Vzcy10b2tlbiIsImVtYWlsIjoiY2hvaHllb245NzA4QGdtYWlsLmNvbSJ9.BYh9Ka9IL4S-njcMBgOi9azQI9ExzLHmovJ3j3mQIqXYRTI7S4_H9beawA2fbq9Zn2Bk9-Y5gJFoDH5Dk634nA"
                    }
                },
                "pathVars" : {
                    "userName":{
                        "type" : "String",
                        "desc" : "패스 벨류 보내기",
                        "itera" : false,
                        "constraints" : [
                            "NotEmpty"
                        ],
                        "mapped": false,
                        "value" : "민초현"
                    }
                },
                "params" : {
                    "pTest":{
                        "type" : "String",
                        "desc" : "쿼리 파람 보내기",
                        "itera" : false,
                        "constraints" : [
                            "NotEmpty"
                        ],
                        "mapped": false,
                        "value" : "쿼리 파람 데이터"
                    }
                },
                "body" : {
                    "fields" : {
                        "name": {
                            "type" : "String",
                            "desc" : "사람 이름",
                            "itera" : false,
                            "constraints" : [
                                "NotEmpty"
                            ],
                            "mapped": false,
                            "value" : "1.request.pathVars.userName"
                        },
                        "age": {
                            "type" : "int",
                            "desc" : "사람 나이",
                            "itera" : false,
                            "constraints" : [
                                "NotNull"
                            ],
                            "mapped": false,
                            "value" : 27
                        }
                    },
                    "nestedDtos" : {
                        "address": {
                            "itera" : false,
                            "field" : {
                                "street": {
                                    "type" : "String",
                                    "desc" : "길",
                                    "itera" : false,
                                    "constraints" : [
                                        "NotEmpty"
                                    ],
                                    "mapped": false,
                                    "value" : "테헤란로"
                                },
                                "city": {
                                    "type" : "String",
                                    "desc" : "시군구",
                                    "itera" : false,
                                    "constraints" : [
                                        "NotEmpty"
                                    ],
                                    "mapped": false,
                                    "value" : "서울"
                                },
                                "state": {
                                    "type" : "String",
                                    "desc" : "주",
                                    "itera" : false,
                                    "constraints" : [
                                        "NotEmpty"
                                    ],
                                    "mapped": false,
                                    "value" : "서울"
                                }
                            }
                        },
                        "orderList": {
                            "itera" : true,
                            "fieldsList" : [
                                {
                                    "num": {
                                        "type" : "String",
                                        "desc" : "주문번호",
                                        "itera" : false,
                                        "constraints" : [
                                            "NotEmpty"
                                        ],
                                        "mapped": false,
                                        "value" : "202305081445861"
                                    }
                                },
                                {
                                    "num": {
                                        "type" : "String",
                                        "desc" : "주문번호",
                                        "itera" : false,
                                        "constraints" : [
                                            "NotEmpty"
                                        ],
                                        "mapped": false,
                                        "value" : "11111111111111"
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            "response" : {
                //status code
                "200" : {
                    "headers" : {
                        "Authorization" : {
                            "type" : "String",
                            "desc" : "access token"
                        }

                    },
                    "body": {
                        "user": {
                            "itera": false,
                            "fields" : {
                                "id": {
                                    "type" : "long",
                                    "desc" : "user pk",
                                    "itera" : false
                                },
                                "name": {
                                    "type" : "String",
                                    "desc" : "사람 이름",
                                    "itera" : false
                                },
                                "age": {
                                    "type" : "int",
                                    "desc" : "사람 나이",
                                    "itera" : false
                                },
                                "pTest":  {
                                    "type" : "String",
                                    "desc" : "쿼리 파람 테스트",
                                    "itera" : false
                                }
                            },
                            "nestedDtos" : {
                                "address": {
                                    "itera" : false,
                                    "field" : {
                                        "id": {
                                            "type" : "long",
                                            "desc" : "address pk",
                                            "itera" : false
                                        },
                                        "street": {
                                            "type" : "String",
                                            "desc" : "길",
                                            "itera" : false
                                        },
                                        "city": {
                                            "type" : "String",
                                            "desc" : "시군구",
                                            "itera" : false
                                        },
                                        "state": {
                                            "type" : "String",
                                            "desc" : "주",
                                            "itera" : false
                                        }
                                    },
                                },
                                "orderList": {
                                    "itera" : true,
                                    "fieldsList" : [
                                        {
                                            "id": {
                                                "type" : "long",
                                                "desc" : "order의 ok",
                                                "itera" : false
                                            },
                                            "userId": {
                                                "type" : "long",
                                                "desc" : "주문자ㅏid",
                                                "itera" : false
                                            },
                                            "num": {
                                                "type" : "String",
                                                "desc" : "주문번호",
                                                "itera" : false
                                            }
                                        },
                                        {
                                            "id": {
                                                "type" : "long",
                                                "desc" : "order의 ok",
                                                "itera" : false
                                            },
                                            "userId": {
                                                "type" : "long",
                                                "desc" : "주문자ㅏid",
                                                "itera" : false
                                            },
                                            "num": {
                                                "type" : "String",
                                                "desc" : "주문번호",
                                                "itera" : false
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        },


        // step 2 : 2번 api의 res의, headers를 통해 헤더 토큰 설정 &
        //          2번 api의 res의, body의 user의 address street 통해 params(userAddressStreet) 설정
        //          2번 api의 res의, body의 user의 orderList의 첫번째 항목의 id를 통해 order의 item 생성
        "2" : {
            "additional_url" : "/api/tmp/order/:orderId",
            "order" : 2,
            "parent" : 1,
            "child" : 3,
            "request" : {
                "headers" : {
                    "Content-Type" : {
                        "Type" : "String",
                        "Desc" : "Define request data type",
                        "mapped": false,
                        "Value" : "application/json",
                    },
                    "Authorization" : {
                        "Type" : "String",
                        "Desc" : "access token",
                        "mapped": true,
                        "Value" : "1.response.200.headers.Authorization"
                    }
                },
                // "pathVars" : {},
                "params" : {
                    "userAddressStreet":{
                        "type" : "String",
                        "desc" : "주문자 주소 길",
                        "itera" : false,
                        "constraints" : [
                            "NotEmpty"
                        ],
                        "mapped": true,
                        "value" : "1.response.200.body.user.nestedDtos.address.field.street"
                    }
                },
                "body" : {
                    "nestedDtos" : {
                        "orderItemList" : {
                            "itera": true,
                            "fieldsList": [
                                {
                                    "orderId": {
                                        "type" : "long",
                                        "desc" : "주문 pk",
                                        "itera" : false,
                                        "constraints" : [
                                            "NotNull"
                                        ],
                                        "mapped": true,
                                        "value" : "1.response.200.body.user.nestedDtos.orderList.fieldsList.id"
                                    },
                                    "name": {
                                        "type" : "String",
                                        "desc" : "주문 아이템 이름",
                                        "itera" : false,
                                        "constraints" : [
                                            "NotEmpty"
                                        ],
                                        "mapped": false,
                                        "value" : "모나미 볼펜"
                                    },
                                    "price":  {
                                        "type" : "double",
                                        "desc" : "가격",
                                        "itera" : false,
                                        "constraints" : [
                                            "NotNull"
                                        ],
                                        "mapped": false,
                                        "value" : 5000
                                    }
                                },
                                {
                                    "orderId": {
                                        "type" : "long",
                                        "desc" : "주문 pk",
                                        "itera" : false,
                                        "constraints" : [
                                            "NotNull"
                                        ],
                                        "mapped": true,
                                        "value" : "1.response.200.body.user.nestedDtos.orderList.fieldsList.id"
                                    },
                                    "name": {
                                        "type" : "String",
                                        "desc" : "주문 아이템 이름",
                                        "itera" : false,
                                        "constraints" : [
                                            "NotEmpty"
                                        ],
                                        "mapped": false,
                                        "value" : "우럭"
                                    },
                                    "price":  {
                                        "type" : "double",
                                        "desc" : "가격",
                                        "itera" : false,
                                        "constraints" : [
                                            "NotNull"
                                        ],
                                        "mapped": false,
                                        "value" : 1545450
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            "response" : {
                //status code
                "200" : {
                    "headers" : {
                        "Authorization" : {
                            "Type" : "String",
                            "Desc" : "access token"
                        }
                    },
                    "body":{
                        "orderItemList" : {
                            "itera": true,
                            "fieldsList": [
                                {
                                    "id": {
                                        "type" : "long",
                                        "desc" : "주문 item pk",
                                        "itera" : false
                                    },
                                    "orderId": {
                                        "type" : "long",
                                        "desc" : "주문 pk",
                                        "itera" : false
                                    },
                                    "name": {
                                        "type" : "String",
                                        "desc" : "주문 아이템 이름",
                                        "itera" : false
                                    },
                                    "price":  {
                                        "type" : "double",
                                        "desc" : "가격",
                                        "itera" : false
                                    }
                                },
                                {
                                    "id": {
                                        "type" : "long",
                                        "desc" : "주문 item pk",
                                        "itera" : false
                                    },
                                    "orderId": {
                                        "type" : "long",
                                        "desc" : "주문 pk",
                                        "itera" : false
                                    },
                                    "name": {
                                        "type" : "String",
                                        "desc" : "주문 아이템 이름",
                                        "itera" : false
                                    },
                                    "price":  {
                                        "type" : "double",
                                        "desc" : "가격",
                                        "itera" : false
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },

        // step3 : item 단건 조회
        "3" : {
            "additional_url" : "/api/tmp/item/:itemId",
            "order" : 3,
            "parent" : 2,
            "request" : {
                "headers" : {
                    "Content-Type" : {
                        "Type" : "String",
                        "Desc" : "Define request data type",
                        "Value" : "application/json",
                    },
                    "Authorization" : {
                        "Type" : "String",
                        "Desc" : "access token",
                        "mapped": true,
                        "Value" : "1.response.200.headers.Authorization"
                    }
                },
                "pathVars" : {
                    "itemId" : {
                        "Type" : "long",
                        "Desc" : "item id",
                        "Constraints" : [
                            "NotNull"
                        ],
                        "Value" : "2.response.200.body.orderItemList.fieldList.id"
                    }
                }
                // "params" : {}
                // "body" : {}
    
            },
            "response" : {
                //status code
                "200" : {
                    "headers" : {
                        "Authorization" : {
                            "Type" : "String",
                            "Desc" : "access token"
                        }
                    },
                    "body":{
                        "orderItem": {
                            "itera": false,
                            "fields": {
                                "id": {
                                    "type" : "long",
                                    "desc" : "주문 item pk",
                                    "itera" : false
                                },
                                "orderId": {
                                    "type" : "long",
                                    "desc" : "주문 pk",
                                    "itera" : false
                                },
                                "name": {
                                    "type" : "String",
                                    "desc" : "주문 아이템 이름",
                                    "itera" : false
                                },
                                "price":  {
                                    "type" : "double",
                                    "desc" : "가격",
                                    "itera" : false
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}