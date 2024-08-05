# Receipt Processor Challenge

To run the application:

```
docker compose up --build
```

You should see `Server is listening on port 3000`

## Tests

To run the tests run `docker exec -it <mycontainer> sh` (for reference see [docs.docker.com/reference/cli/docker/container/exec/](https://docs.docker.com/reference/cli/docker/container/exec/))

Then run the Javascript tests:

```
npm run test
```

## Language Selection

Typescript/Javascript (Express.js)

## Example Process Receipt Usage
```
curl -X POST http://127.0.0.1:3000/receipts/process -H "Content-Type: application/json" -d '{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}'
```

## Example Get Points Usage
```
curl -X GET http://127.0.0.1:3000/receipts/{id}/points
```