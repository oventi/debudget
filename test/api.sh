CONTENT_TYPE="Content-Type: application/json"
JSON='{"a":10, "b":10}'
ENDPOINT="http://localhost:3000"

curl -v -H "$CONTENT_TYPE" -d "$JSON" -X POST "$ENDPOINT/api/sum"; echo
