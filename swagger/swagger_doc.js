const swagger_doc = {
  "openapi": "3.0.0",
  "info": {
    "title": "Learning Analytics",
    "description": "Api to to feych data",
    "version": "1.0"
  },
  "tags": [
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
      "url": "http://localhost:5000/",
      "description": "Local Development Environment"
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
          "401":{"description": "Unauthorised Access",
          "content": {
            "application/json": {
              "example" : {
                "error": "Unauthorized: JsonWebTokenError: jwt audience invalid. expected: jwt_audience "
            }
            }
          }
        },
        "404":{"description": "Not Found",
          "content": {
            "application/json": {
              "example" : {
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
          "401":{"description": "Unauthorised Access",
          "content": {
            "application/json": {
              "example" : {
                "error": "Unauthorized: JsonWebTokenError: jwt audience invalid. expected: jwt_audience "
            }
            }
          }
        },
        "404":{"description": "Not Found",
          "content": {
            "application/json": {
              "example" : {
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
