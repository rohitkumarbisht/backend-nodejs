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
            "description": "Asseement Id",
            "required": true,
            "value": "163",
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
                "example": [
                  {
                    "id": 1,
                    "column1": "value1",
                    "column2": "value2"
                  },
                  {
                    "id": 2,
                    "column1": "value3",
                    "column2": "value4"
                  }
                ]
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
