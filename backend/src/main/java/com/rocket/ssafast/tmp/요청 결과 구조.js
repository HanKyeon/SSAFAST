const dd = {
    "name": "결과 이름",     // 문자열. ex. "성공" , "실패 - 비밀번호 형식 오류"
    "apiInfoId": 1,         // 숫자. api id
    "request": {            // 요청 정보
        "additionalUrl": "/api/tmp/order/:orderId",     // 문자열. baseURL뒤에 붙는 URL ex. "/api/tmp/order/:orderId
        "headers": [                                    // 헤더 정보
            {
                "keyName": "키",             // 헤더 키 이름 ex. Authorization
                "type": "타입",             // 숫자
                "desc": "헤더 키 설명",     // 문자열
                "value": "값"               // 아무타입 다 가능 ex. Bearer sf4sSDF~~
            },
            {  }
        ],
        "pathVars": [
            {
                "keyName": "키",             // 키 이름 ex. userId
                "type": "타입",              // 숫자
                "desc": "헤더 키 설명",      // 문자열
                "constrains": ["NotNull"],  // 제약조건
                "value": "값"               // 아무타입 다 가능
            },
            { }
        ],
        "params":[
            {
                "keyName": "키", 
                "type": "타입",
                "desc": "헤더 키 설명",
                "itera": true/false,        // 리스트 여부
                "constrains": ["NotNull"],  
                "value": "값"               // 아무타입 다 가능
            },
            { }
        ],
        "body": {
            "fields": [
                {
                    "keyName": "키", 
                    "type": "타입",
                    "desc": "헤더 키 설명",
                    "itera": true/false,        // 리스트 여부
                    "constrains": ["NotNull"],  
                    "value": "값"               // 아무타입 다 가능
                },
                { }
            ],
            "nestedDtos": {
                "DTO ID": [                     // dto id ex. 1
                    {                         
                        "keyName": "dto 키 이름",       // 문자열. ex. user
                        "name": "dto 이름",             // 문자열. ex. UserDto
                        "desc": "키 설명",              // 문자열
                        "fields": [                     // 단순한 필드
                            {
                                "keyName": "키", 
                                "type": "타입",
                                "desc": "헤더 키 설명",
                                "itera": true/false,        // 리스트 여부
                                "constrains": ["NotNull"],  
                                "value": "값"               // 아무타입 다 가능
                            }, 
                            { }
                        ],
                        "nestedDtos": {
                            "DTO ID": [
                                {
                                    "keyName": "dto 키 이름",
                                    "name": "dto 이름",
                                    "desc": "키 설명",
                                    "fields": [                     // 단순한 필드
                                        {
                                            "keyName": "키", 
                                            "type": "타입",
                                            "desc": "헤더 키 설명",
                                            "itera": true/false,        // 리스트 여부
                                            "constrains": ["NotNull"],  
                                            "value": "값"               // 아무타입 다 가능
                                        }, 
                                        { }
                                    ]
                                },
                                {

                                }
                            ],
                            "DTO ID": []
                        },
                        "nestedDtoLists": {
                            "DTO ID": [
                                {
                                    "keyName": "키 이름",       // 문자열 ex. userList    
                                    "name": "dto 이름",         // 문자열 ex. UserDto
                                    "desc": "키 설명",
                                    "list": [
                                        {
                                            "fields": [
                                                {
                                                    "keyName": "키", 
                                                    "type": "타입",
                                                    "desc": "헤더 키 설명",
                                                    "itera": true/false,        // 리스트 여부
                                                    "constrains": ["NotNull"],  
                                                    "value": "값"               // 아무타입 다 가능
                                                }, 
                                                { }
                                            ]
                                        },
                                        { }
                                    ]
                                }, 
                                {

                                }
                            ],
                            "DTO ID": [

                            ]
                        }
                    },
                    { 

                    }
                ],
                "DTO ID": []
            },
            "nestedDtoLists": {
                "DTO ID": [
                    {
                        "keyName": "키 이름",       // 문자열 ex. userList    
                        "name": "dto 이름",         // 문자열 ex. UserDto
                        "desc": "키 설명",
                        "list": [
                            {
                                "fields": [
                                    {
                                        "keyName": "키", 
                                        "type": "타입",
                                        "desc": "헤더 키 설명",
                                        "itera": true/false,        // 리스트 여부
                                        "constrains": ["NotNull"],  
                                        "value": "값"               // 아무타입 다 가능
                                    }, 
                                ],
                                "nestedDtos": {
                                    "DTO ID": [
                                        {
                                            "keyName": "dto 키 이름",
                                            "name": "dto 이름",
                                            "desc": "키 설명",
                                            "fields": [                     // 단순한 필드
                                                {
                                                    "keyName": "키", 
                                                    "type": "타입",
                                                    "desc": "헤더 키 설명",
                                                    "itera": true/false,        // 리스트 여부
                                                    "constrains": ["NotNull"],  
                                                    "value": "값"               // 아무타입 다 가능
                                                }, 
                                                { }
                                            ]
                                        }
                                    ],
                                    "DTO ID": [

                                    ]
                                },
                                "nestedDtoLists": {
                                    "DTO ID": [
                                        {
                                            "keyName": "키 이름",       // 문자열 ex. orderItemList    
                                            "name": "dto 이름",         // 문자열 ex. OrderItem
                                            "desc": "키 설명",
                                            "list": [
                                                {
                                                    "fields": [
                                                        {
                                                            "keyName": "키", 
                                                            "type": "타입",
                                                            "desc": "헤더 키 설명",
                                                            "itera": true/false,        // 리스트 여부
                                                            "constrains": ["NotNull"],  
                                                            "value": "값"               // 아무타입 다 가능
                                                        }, 
                                                    ]
                                                },
                                                { }
                                            ]
                                        }
                                    ],
                                    "DTO ID": [

                                    ]
                                }
                            },
                            { }
                        ]
                    },
                    {

                    }
                ],
                "DTO ID": [
                    
                ]
            }
        }
    },
    "response": {
        "headers": {
            "Vary": "Origin, Access-Control-Request-Method, Access-Control-Request-Headers",
            "X-Content-Type-Options": "nosniff",
            "X-XSS-Protection": "1; mode=block",
            "Cache-Control":  "no-cache, no-store, max-age=0, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
            "X-Frame-Options": "SAMEORIGIN",
            "Content-Type": "application/json",
            "Transfer-Encoding": "chunked",
            "Date": "Fri, 05 May 2023 09:37:38 GMT",
            "Keep-Alive": "timeout=60",
            "Connection":  "keep-alive"
        },
        "body": {
            "result": "post 성공: id: 1, userId: 111, longParams: 44, strParams:444444444444, body:User(name=John Doe, age=35, address=Address(street=123 Main St, city=Anytown, state=CA), orders=[Order(id=1, items=[Item(name=Item 1, price=10.99), Item(name=Item 2, price=5.99)]), Order(id=2, items=[Item(name=Item 3, price=7.99), Item(name=Item 4, price=2.99)])])"
        },
        "statusCode": "OK",
        "statusCodeValue": 200
    }
}