const swagger_doc = {
  "openapi": "3.0.0",
  "info": {
    "title": "Learning Analytics",
    "description": "Api to to feych data",
    "version": "1.0"
  },
  "tags": [
    {
      "name": "Fetch Data",
      "description": "Fetch data from db"
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
    "/analytics-report/assessment-wise": {
      "get": {
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
    },"/analytics-report/overall-progress": {
      "get": {
        "summary": "Get data from the database",
        "description": "Retrieve all records from the specified table",
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
    },
  }
};

module.exports = swagger_doc;
