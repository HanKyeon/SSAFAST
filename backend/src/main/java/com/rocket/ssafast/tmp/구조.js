const d = {
	"rootApiId": "처음 시작되는 api의 id" ,         // 문자열 ex. "1"
    "testDetails": {
        "API id": {                                 // 키 :  API의 id. 문자열 ex. "1"
            "additionalUrl": "baseURL 이후 ~ 쿼리 파람 전까지 URL",     // ex. /api/test/:userId
            "parent": "직전에 실행되는 API id",                         // 문자열,
            "child": "현재 API 직후에 실행되는 API id",                 // 문자열
            "request": {
                "headers": {
                    "키": {                         // 문자열 ex. Content-type 등
                        "type": "타입",             // 문자열
                        "desc": "설명",             // 문자열
                        "mapped": "이전 response에서 맵핑되는지 여부",        // bool형
                        "value": "값"               // 타입 아무거나. if mapped == true, 맵핑 형식이 있는데 나에게 물어보러 오세여..글로 쓰기 어려움
                    },
                    "키": {}
                },
                "pathVars": {
                    "키": {                         // 문자열 ex. userId 등
                        "type": "타입",             // 문자열
                        "desc": "설명",             // 문자열
                        "constraints": "제약조건들",    // 문자열 리스트 ★헤더엔 없음! ex. ["NotNull", "Email"]
                        "mapped": "이전 response에서 맵핑되는지 여부",    // bool형
                        "value": "값"               // 타입 아무거나. if mapped == true, 맵핑 형식이 있는데 나에게 물어보러 오세여..글로 쓰기 어려움
                    },
                    "키": {}
                },
                "params": {
                    "키": {                         // 문자열 ex. pgno 등
                        "type": "타입",             // 문자열
                        "desc": "설명",             // 문자열
                        "itera": "리스트 형식인지 여부",    // bool형. ★헤더와 pathVars엔 없음!
                        "constraints": "제약조건들",        // 문자열 리스트 ex. ["NotNull", "Email"]
                        "mapped": "이전 response에서 맵핑되는지 여부",      // bool형
                        "value": "값"       // 타입 아무거나 cf. itera == true라면 value는 리스트여야함 이래야함 ex. [값, 값, 값]
                    },
                    "키": {}
                },
                "body": {
                    "fields": {                     // 단순 필드. 객체 안에 있는게 아님
                        "키": {                     // 문자열. 필드 이름. ex. name 
                            "type": "타입",         // 문자열
                            "desc": "설명",         // 문자열
                            "itera": "리스트 형식인지 여부",    // bool형. ★헤더와 pathVars엔 없음!
                            "constraints": "제약조건들",        // 문자열 리스트 ex. ["NotNull", "Email"]
                            "mapped": "이전 response에서 맵핑되는지 여부",    // bool형
                            "value": "값"       // 타입 아무거나 cf. itera == true라면 value는 리스트여야함 이래야함 ex. [값, 값, 값]
                        },
                        "키": {}
                    },
                    "nestedDtos": {     // 내부 객체
                        "키": {         // 내부 객체형 필드 이름 ex. blog
                            "dtoName": "DTO 이름",                      // ex. Blog
                            "fields": {
                                "키": {                                 // 내부 객체의 필드 이름. ex. blogName 
                                    "type": "타입",                     // 문자열
                                    "desc": "설명",                     // 문자열
                                    "itera": "리스트 형식인지 여부",     // bool
                                    "constraints": "제약조건들",        // 문자열 리스트 ex. ["NotNull", "Email"]
                                    "mapped": "이전 response에서 맵핑되는지 여부",    // bool
                                    "value": "값"       // 타입 아무거나 cf. itera == true라면 value는 리스트여야함 이래야함 ex. [값, 값, 값]
                                },
                                "키": {}
                            }
                        },
                        "키": {}
                    },
                    "nestedDtoList": {      // 내부 객체 리스트
                        "키": [             // 내부 객체 리스트형 필드 이름
                            {
                                "dtoName": "DTO 이름",                      // ex. Blog
                                "fields": {
                                    "키": {                                 // 내부 객체의 필드 이름 ex. title (게시글의 제목)
                                        "type": "타입",                     // 문자열
                                        "desc": "설명",                     // 문자열
                                        "itera": "리스트 형식인지 여부",     // bool
                                        "constraints": "제약조건들",        // 문자열 리스트 ex. ["NotNull", "Email"]
                                        "mapped": "이전 response에서 맵핑되는지 여부",    // bool
                                        "value": "값"       // 타입 아무거나 cf. itera == true라면 value는 리스트여야함 이래야함 ex. [값, 값, 값]
                                    },
                                    "키": {}
                                }
                            },
                        ],
                        "키": [{}, {}]
                    }
                }
            },
            "response": {
                "headers": {
                    // response에는 value를 넣을 필요없음. 실행시켜서 값을 받아오는건 내가 할 일이니깐
                    // response에는 당연히 mapped와 constraint도 필요없음
                    "키": {                 // ex. Content-type
                        "type": "타입",     // 문자열
                        "desc": "설명"
                    },
                    "키": {}
                },
                "body": {
                    "fields": {
                        "키": {             // 필드 이름. ex. name, age 
                            "type": "타입", // 문자열
                            "desc": "설명",
                            "itera": "리스트인지 아닌지 여부"       // bool
                        }, 
                        "키": {}
                    }, 
                    "nestedDtos": {         // 내부 객체
                        "키": {             // 내부 객체형 필드 이름. ex. blog
                            "dtoName": "DTO이름",
                            "fields": {
                                "키": {                 // 내부 객체의 필드 이름. ex. 블로그이름 
                                    "type": "타입",                     // 문자열
                                    "desc": "설명",
                                    "itera": "리스트인지 아닌지 여부"    // bool
                                }, 
                                "키": {}
                            }
                        },
                        "키": {}
                    },
                    "nestedDtoLists": {     // 내부 객체 리스트
                        "키": [             // 내부 객체 리스트형 필드 이름
                            {
                                "fields": {
                                    "키": {                             // 필드 이름 ex. title (게시글의 제목)
                                        "type": "타입",                     // 문자열
                                        "desc": "설명",                     // 문자열
                                        "itera": "리스트 형식인지 여부",     // bool
                                    },
                                    "키": {}
                                }
                            },
                        ],
                        "키": [{}, {}]
                    }
                }
            }
        }
    }
}


const dd = {
    "name": "민초현", 
    "age": 27,
    "필드 리스트": [4,5,6],
    "nestedDto": {
        "address": "서울",
        "집값": "오억",
        "필드 리스트": [1, 2, 3]
    },
    "nestedDtoList": [
        {
            "address": "서울",
            "집값": "오억",
            "필드 리스트": [1, 2, 3]
        },
        {
            "address": "서울",
            "집값": "오억",
            "필드 리스트": [1, 2, 3]
        }
    ]

}