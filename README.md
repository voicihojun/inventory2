# Inventory Tracking Web Application for a logistics company

## Introduction

Hello! Here is the documentation for my project 'Inventory2' in the field of backend. This is inventory API that covers most of CRUD features.

## DB

### Items

| column    | type         | description                     |
| --------- | ------------ | ------------------------------- |
| id        | INTEGER      | Primary Key, Unique id for item |
| name      | VARCHAR(255) | Item name                       |
| price     | -=------     | Item price                      |
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

`GET` request will list all of the items in the database.

###### Example request

```
$ curl -X GET http://localhost:5000/items
```

###### Example response

```
[{"id":55,"name":"iphone","price":"1000$","image":null,"createdAt":"2022-01-19T22:19:38.278Z","updatedAt":"2022-01-19T22:19:38.278Z"},{"id":56,"name":"ipodmini","price":"1200$","image":null,"createdAt":"2022-01-19T22:20:28.571Z","updatedAt":"2022-01-19T22:20:28.571Z"}]%
```

#### 2. `GET: /items/:id` - Get the item by unique id

| param | type | required |
| ----- | ---- | -------- |
| id    | int  | true     |

###### Example request

```
$ curl -X GET http://localhost:5000/items/55
```

###### Example response

```
{"id":55,"name":"iphone","price":"1000$","image":null,"createdAt":"2022-01-19T22:19:38.278Z","updatedAt":"2022-01-19T22:19:38.278Z"}%
```

#### 2. `POST: '/items'` - Create an item

`POST` request will create an item with given params.

###### Example request

```
$ curl -d 'name=iphone&price=1000$' \
http://localhost:5000/items
```

###### Example response

```
{"createdAt":"2022-01-19T22:19:38.278Z","updatedAt":"2022-01-19T22:19:38.278Z","id":55,"name":"iphone","price":"1000$","image":null}%
```

#### 3. `DELETE: /items/:id` - Delete an item

| param | type | required |
| ----- | ---- | -------- |
| id    | int  | true     |

`DELETE` request will delete an item by given id.

###### Example request

```
$ curl -X DELETE http://localhost:5000/items/55
```

###### Example response

```
nothing to show. We should check the Database
```

#### 4. `PUT: /items/:id` - Update an item

`PUT` request will update an item info by given id and params.

###### Example request

```
$ curl -d 'name=lamp&price=200$' \
-H "Content-Type: applicationx-www-form-urlencoded" \
-X PUT http://localhost:5000/items/2
```

###### Example response

```
Response should be here
```

#### 5. `GET: /export` - Export all items to a CSV file

A '/items/export' request will make a file named 'items.csv'

###### Example request

```
$ curl -X GET http://localhost:5000/items/export
```

###### Example response

```
Response should be here
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

### Errors

### Items(/items)

The Items resources is used to create, read, update and delete items.
