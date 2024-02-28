const { LA_API } = require("../config/config");

const swagger_doc = {
  "openapi": "3.0.0",
  "info": {
    "title": "Learning Analytics",
    "description": "Api to to fetch data",
    "version": "1.0"
  },
  "tags": [
    {
      "name": "Teachers View",
      "description": "Fetch Overall progress data for all the students from database"
    },
    {
      "name": "Overall Progress",
      "description": "Fetch Overall progress data from database"
    },
    {
      "name": "Individual Assessment Report",
      "description": "Fetch individual assessment data from database"
    }
  ],
  "servers": [
    {
      "url": `http://localhost:5000${LA_API}`,
      "description": "Local Development Environment"
    },
    {
      "url": `https://dev-accelerators.magicedtech.com${LA_API}`,
      "description": "Production Development Environment"
    }
  ],
  "security": [
    {
      "BearerAuth": []
    }
  ],
  "components": {
    "securitySchemes": {
      "BearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "paths": {
    "/analytics-report/teacher-view": {
      "get": {
        "tags": [
          "Teachers View"
        ],
        "summary": "Get data from the database",
        "description": "Retrieve all records for all the students from the specified table",
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "example": {
                  "total_students": "21",
                  "assessment_attempted": "124",
                  "overall_percentage": "62.91",
                  "completed_assessments": "124",
                  "in_progress_assessments": "27",
                  "total_correct_percentage": "67.64",
                  "total_incorrect_percentage": "32.36",
                  "total_correct_questions": "1762",
                  "total_incorrect_questions": "843",
                  "total_time_spent_on_correct": "33:33:37",
                  "total_time_spent_on_incorrect": "33:33:37",
                  "assessment_percentage": [
                    {
                        "assessment_id": "1",
                        "assessment_name": "GK Grade 8 (Precision)",
                        "min_percentage": "0.00",
                        "average_percentage": "58.87",
                        "max_percentage": "88.00"
                    },
                    {
                        "assessment_id": "16",
                        "assessment_name": "Adaptive Assessment Demo",
                        "min_percentage": "29.41",
                        "average_percentage": "67.04",
                        "max_percentage": "82.05"
                    },
                    {
                        "assessment_id": "163",
                        "assessment_name": "GK (G-8) 3PL- targetSkillWithPrecision",
                        "min_percentage": "84.62",
                        "average_percentage": "89.07",
                        "max_percentage": "91.67"
                    }
                  ],
                  "assessment_rank": [
                    {
                        "assessment_id": "1",
                        "assessment_name": "GK Grade 8 (Precision)",
                        "leaderboard": [
                            {
                                "assessment_name": "GK Grade 8 (Precision)",
                                "rank": "1",
                                "name": "Sara Clark",
                                "percentage": "87.50",
                                "skill": "3.2447",
                                "total_test_time": "00:02:55"
                            },
                            {
                                "assessment_name": "GK Grade 8 (Precision)",
                                "rank": "2",
                                "name": "Cindy Hayden",
                                "percentage": "82.35",
                                "skill": "2.3116",
                                "total_test_time": "00:05:41"
                            }
                          ]
                    },
                    {
                      "assessment_id": "16",
                      "assessment_name": "Adaptive Assessment Demo",
                      "leaderboard": [
                          {
                            "assessment_name": "Adaptive Assessment Demo",
                            "rank": "1",
                            "name": "Jason Scott",
                            "percentage": "82.05",
                            "skill": "-0.9277",
                            "total_test_time": "00:27:23"
                          },
                          {
                            "assessment_name": "Adaptive Assessment Demo",
                            "rank": "2",
                            "name": "Sheila Manning",
                            "percentage": "77.78",
                            "skill": "-1.6173",
                            "total_test_time": "00:08:15"
                            }
                        ]
                    }
                  ]
                }
              }
            }
          },
          "401": {
            "description": "Unauthorised Access",
            "content": {
              "application/json": {
                "example": {
                  "error": "Unauthorized: User not having permission"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "application/json": {
                "example": {
                  "error": "No data found"
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "content": {
              "application/json": {
                "example": {
                  "error": "Internal Server Error"
                }
              }
            }
          }
        }
      }
    },
    "/analytics-report/overall-progress": {
      "get": {
        "tags": [
          "Overall Progress"
        ],
        "summary": "Get data from the database",
        "description": "Retrieve all records from the specified table",
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "example": {
                  "total_assessments": "2",
                  "total_questions": "62",
                  "total_test_time": "00:04:44",
                  "average_test_time": "00:02:22",
                  "total_correct_questions": "51",
                  "total_incorrect_questions": "11",
                  "tota_time_spent_on_correct": "00:03:29",
                  "tota_time_spent_on_incorrect": "00:01:06",
                  "total_correct_percentage": "82.26",
                  "total_incorrect_percentage": "17.74",
                  "assessment_comparison": [
                    {
                      "assessment_id": "163",
                      "assessment_name": "GK (G-8) 3PL- targetSkillWithPrecision",
                      "percentage": "90.00",
                      "time_test": "0.67",
                      "average_percentage": "88.89",
                      "average_time": "0.74"
                    },
                    {
                      "assessment_id": "165",
                      "assessment_name": "GK (G8) 3PL - precision",
                      "percentage": "75.00",
                      "time_test": "1.25",
                      "average_percentage": "69.23",
                      "average_time": "1.12"
                    }
                  ],
                  "assessment_status": [
                    {
                      "assessment_id": "163",
                      "assessment_txt": "GK (G-8) 3PL- targetSkillWithPrecision",
                      "attempt_count": "1",
                      "status": "Completed"
                    },
                    {
                      "assessment_id": "165",
                      "assessment_txt": "GK (G8) 3PL - precision",
                      "attempt_count": "2",
                      "status": "In-Progress"
                    }
                  ]
                }
              }
            }
          },
          "401": {
            "description": "Unauthorised Access",
            "content": {
              "application/json": {
                "example": {
                  "error": "Unauthorized: JsonWebTokenError: jwt audience invalid. expected: jwt_audience "
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "application/json": {
                "example": {
                  "error": " No data found for user ID: user_id"
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "content": {
              "application/json": {
                "example": {
                  "error": "Internal Server Error"
                }
              }
            }
          }
        }
      }
    },
    "/analytics-report/assessment-wise": {
      "get": {
        "tags": [
          "Individual Assessment Report"
        ],
        "summary": "Get data from the database",
        "description": "Retrieve all records from the specified table",
        "parameters": [
          {
            "name": "assessment_id",
            "in": "query",
            "description": "Assessment Id",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "example": {
                  "score": 8,
                  "rank": "7",
                  "percentage": "66.67",
                  "percentile": "14.29",
                  "test_time": "00:01:02",
                  "table_graph_data": [
                    {
                      "attempt_count": "1",
                      "submit_date": "16-06-2023",
                      "correct_questions": "7",
                      "incorrect_questions": "5",
                      "percentage": "58.33",
                      "time_spent": "00:00:43",
                      "average_time_spent": "00:00:04",
                      "status": "Completed",
                      "test_minute": "0.59",
                      "attempt_status": "Previous",
                      "skill": -0.1067
                    },
                    {
                      "attempt_count": "2",
                      "submit_date": "16-06-2023",
                      "correct_questions": "8",
                      "incorrect_questions": "4",
                      "percentage": "66.67",
                      "time_spent": "00:00:59",
                      "average_time_spent": "00:00:05",
                      "status": "Completed",
                      "test_minute": "0.87",
                      "attempt_status": "Previous",
                      "skill": 1.0955
                    },
                    {
                      "attempt_count": "3",
                      "submit_date": "16-06-2023",
                      "correct_questions": "5",
                      "incorrect_questions": "2",
                      "percentage": "71.43",
                      "time_spent": "00:00:26",
                      "average_time_spent": "00:00:04",
                      "status": "Completed",
                      "test_minute": "0.38",
                      "attempt_status": "Current",
                      "skill": 1.6278
                    }
                  ],
                  "leaderboard": [
                    {
                      "rank": "1",
                      "name": "Student1",
                      "percentage": "91.67",
                      "skill": "2.2119",
                      "total_test_time": "00:01:10"
                    },
                    {
                      "rank": "2",
                      "name": "Student6",
                      "percentage": "83.33",
                      "skill": "1.5701",
                      "total_test_time": "00:00:34"
                    },
                    {
                      "rank": "2",
                      "name": "Student7",
                      "percentage": "83.33",
                      "skill": "1.4689",
                      "total_test_time": "00:00:36"
                    },
                    {
                      "rank": "4",
                      "name": "Student",
                      "percentage": "75.00",
                      "skill": "0.7877",
                      "total_test_time": "00:01:15"
                    },
                    {
                      "rank": "4",
                      "name": "Student4",
                      "percentage": "75.00",
                      "skill": "0.005",
                      "total_test_time": "00:01:00"
                    }
                  ]
                }
              }
            }
          },
          "401": {
            "description": "Unauthorised Access",
            "content": {
              "application/json": {
                "example": {
                  "error": "Unauthorized: JsonWebTokenError: jwt audience invalid. expected: jwt_audience "
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "application/json": {
                "example": {
                  "error": " No data found for user ID: user_id"
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "content": {
              "application/json": {
                "example": {
                  "error": "Internal Server Error"
                }
              }
            }
          }
        }
      }
    }
  }
};

module.exports = swagger_doc;