# Inventory Tracking Web Application

## Introduction

Hello! Here is the documentation for my project 'Inventory2' in the field of backend. This is inventory API that covers most of CRUD features.

## How to use

1. First way : After cloning git repository in your directory with the below command, you can use the API Guide to check

```
$ git clone https://github.com/voicihojun/inventory2.git

$ cd inventory2/server
$ npm install
$ npm start
```

2. Second way : After cloning git repository in your directory with the below command, you can use web browser to create, read, update, delete and export

```
$ git clone https://github.com/voicihojun/inventory2.git

$ cd inventory2/server
$ npm install
$ npm start

$ cd inventory2/client
$ npm install
$ npm start
```

## DB

To check the database in the command line. pls go to server directory and command like below

```
$ sqlite3 db.sqlite
```

### Items

| column    | type         | description                     |
| --------- | ------------ | ------------------------------- |
| id        | INTEGER      | Primary Key, Unique id for item |
| name      | VARCHAR(255) | Item name                       |
| price     | DOUBLE       | Item price                      |
| image     | VARCHAR(255) | Image file url                  |
| createdAt | DATETIME     | Created date and time           |
| updatedAt | DATETIME     | Updated date and time           |

## API Guide

### HTTP Verbs

| Verb   | Usage                                                          |
| ------ | -------------------------------------------------------------- |
| GET    | Used to retrieve a item                                        |
| POST   | Used to create a new item                                      |
| PUT    | Used to update an existing item, not including partial updates |
| DELETE | Used to delete an existing item                                |

#### 1.`GET: /items` - Get the list of Items

Get list all of the items from the database.

###### Example request

```
$ curl -X GET http://localhost:5000/items
```

###### Example response

```
[{"id":1,"name":"iphone","price":1000,"image":"uploads/d070a39f-c655-4e76-a430-e4eca8ee1318.png","createdAt":"2022-01-20T00:01:59.810Z","updatedAt":"2022-01-20T00:01:59.812Z"},{"id":2,"name":"lamp","price":200,"image":"uploads/06a04b51-a3df-4286-b3a0-55ddfbabbda8.png","createdAt":"2022-01-20T00:03:31.230Z","updatedAt":"2022-01-20T00:03:31.231Z"},{"id":3,"name":"TV","price":899,"image":"uploads/7000a1d3-a869-4501-8e97-b337a12b50d0.png","createdAt":"2022-01-20T00:04:29.038Z","updatedAt":"2022-01-20T00:04:29.039Z"}]%
```

#### 2. `GET: /items/:id` - Get the item by unique id

| param | type | required |
| ----- | ---- | -------- |
| id    | int  | true     |

###### Example request

```
$ curl -X GET http://localhost:5000/items/1
```

###### Example response

```
{"id":1,"name":"iphone","price":1000,"image":"uploads/d070a39f-c655-4e76-a430-e4eca8ee1318.png","createdAt":"2022-01-20T00:01:59.810Z","updatedAt":"2022-01-20T00:01:59.812Z"}%
```

#### 2. `POST: '/items'` - Create an item

Create an item with given params.

###### Example request

```
$ curl -X POST \
-H "Content-Type: multipart/form-data" \
-F 'name=asian_pear' \
-F 'price=13' \
-F 'image=@/path/to/image file' \
http://localhost:5000/items
```

###### Example response

```
{"createdAt":"2022-01-20T00:25:06.756Z","updatedAt":"2022-01-20T00:25:06.757Z","id":6,"name":"asian_pear","price":"13","image":"uploads/20af961e-2604-4fc8-9469-989d6add2b12.jpeg"}%
```

#### 3. `DELETE: /items/:id` - Delete an item

| param | type | required |
| ----- | ---- | -------- |
| id    | int  | true     |

Delete an item by given id.

###### Example request

```
$ curl -X DELETE http://localhost:5000/items/5
```

###### Example response

```
Nothing to show in the command line.
But the message from server is 'Executing (default): DELETE FROM `Items` WHERE `id` = 5'
```

#### 4. `PUT: /items/:id` - Update an item

Update an item info by given id and params.

###### Example request

```
$ curl -X PUT \
-H 'Content-Type: multipart/form-data' \
-F 'name=peach' \
-F 'price=15' \
-F 'image=@/path/to/image file' \
http://localhost:5000/items/6
```

###### Example response

```
{"id":6,"name":"peach","price":"15","image":"uploads/e84e2b2a-7b87-48d9-9768-bf52dca46ca2.jpeg","createdAt":"2022-01-20T00:25:06.756Z","updatedAt":"2022-01-20T00:32:52.412Z"}%
```

#### 5. `GET: /export` - Export all items to a CSV file

Export 'items.csv' file with all items.

###### Example request

```
$ curl -X GET http://localhost:5000/export
```

###### Example response

```
"id","name","price","image"
1,"iphone",1000,"uploads/d070a39f-c655-4e76-a430-e4eca8ee1318.png"
2,"lamp",200,"uploads/06a04b51-a3df-4286-b3a0-55ddfbabbda8.png"
3,"TV",899,"uploads/7000a1d3-a869-4501-8e97-b337a12b50d0.png"
4,"pear",10,"uploads/02f04694-f04d-4c33-96b0-f5d4c562f2f2.png"
6,"peach",15,"uploads/e84e2b2a-7b87-48d9-9768-bf52dca46ca2.jpeg"%
```

### HTTP Status Code

| Status Code     | Usage                                                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 200 OK          | The request completed successfully                                                                                                                                                                     |
| 201 Created     | The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests.                                                      |
| 204 No Content  | There is no content to send for this request, but the headers may be useful. The user agent may update its cached headers for this resource with the new ones.                                         |
| 400 Bad Request | The server could not understand the request due to invalid syntax.                                                                                                                                     |
| 404 Not Found   | The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. |
| 409 Conflict    | This response is sent when a request conflicts with the current state of the server.                                                                                                                   |
