FORMAT: 1A

# MEVN - Node API
This API Blueprint document a node API for a MEVN stack. If everything is okay, you can mock this.

# Group Users
This section groups system users resorces.

# Init users [/users/init]
Create the admin user.

## Init [GET]

+ Response 200 (text/plain)

      Successful user creation.

+ Response 400 (text/plain)

     E-mail Admin@admin.com is already taken.

# Users [/users/register]
Crete a new user.

## Create user [POST]

+ Request (application/json)
    * Body

     {
         "email": "your@email.com",
         "password": "your_password"
     }

+ Response 200 (text/plain)

     Successful user creation.

# Users [/users/auth]
Authenticate a user and retrive a token.

## Authenticate a user [POST]

+ Request (application/json)
    * Body

     {
        "email": "your@email.com",
        "password": "your_password"
     }

+ Response 200 (application/json)

     {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGM5OWIzZDNjOWJmOTAwMGY5ZjQ3N2UiLCJpYXQiOjE0ODk2MDc3MDV9.cCUbmCEasO-jogHy3D10spn1x-4eankVhPEL3BH7KXQ",
        "isAdmin": false
     }

+ Request A admin account (application/json)
    * Body

     {
        "email": "Admin@admin.com",
        "password": "admin"
     }

+ Response 200 (application/json)

     {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGM5OWIzZDNjOWJmOTAwMGY5ZjQ3N2UiLCJpYXQiOjE0ODk2MDc3MDV9.cCUbmCEasO-jogHy3D10spn1x-4eankVhPEL3BH7KXQ",
        "isAdmin": true
     }

# Users [users/list]
List of all users

## Get all users [GET]

+ Request
    * Headers

     Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGM5OWIzZDNjOWJmOTAwMGY5ZjQ3N2UiLCJpYXQiOjE0ODk2MDc3MDV9.cCUbmCEasO-jogHy3D10spn1x-4eankVhPEL3BH7KXQ

+ Response 200 (application/json)

     [
       {
         "_id": "58c996cf3c9bf9000f9f477c",
         "email": "Admin@admin.com",
         "admin": true,
         "created_at": "2017-03-15T19:32:31.798Z",
         "updated_at": "2017-03-15T19:32:31.798Z",
         "__v": 0
       },
       {
         "_id": "58c99b3d3c9bf9000f9f477e",
         "email": "your@mail.com",
         "admin": false,
         "created_at": "2017-03-15T19:51:25.399Z",
         "updated_at": "2017-03-15T19:51:25.399Z",
         "__v": 0
       },
       {
         "_id": "58c99f9c518037000fd34bc4",
         "email": "my@mail.com",
         "admin": false,
         "created_at": "2017-03-15T20:10:04.899Z",
         "updated_at": "2017-03-15T20:10:04.899Z",
         "__v": 0
       }
     ]

# Users [/users/{user_id}]

## Get user by id [GET]

+ Resquest
    * Headers

     Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGM5OWIzZDNjOWJmOTAwMGY5ZjQ3N2UiLCJpYXQiOjE0ODk2MDc3MDV9.cCUbmCEasO-jogHy3D10spn1x-4eankVhPEL3BH7KXQ

    * Parameters

     user_id: 58c99f9c518037000fd34bc4 (required) - Unique identifier for a user

+ Response 200 (application/json)

     {
       "_id": "58c0c2cb16ed391fda4674b1",
       "email": "your@mail.com",
       "admin": false,
       "created_at": "2017-03-09T02:49:47.274Z",
       "updated_at": "2017-03-09T02:49:47.274Z",
       "__v": 0
     }

## Update user by id [PUT]

+ Resquest
    * Headers

     Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGM5OWIzZDNjOWJmOTAwMGY5ZjQ3N2UiLCJpYXQiOjE0ODk2MDc3MDV9.cCUbmCEasO-jogHy3D10spn1x-4eankVhPEL3BH7KXQ

    * Parameters

     user_id: 58c99f9c518037000fd34bc4 (required) - Unique identifier for a user

    * Body

     {
        "email": "another@email.com",
        "password": "another_password"
     }
+ Response 200 (plain/text)

     User has been updated.

## Delete user by id [DELETE]

+ Resquest
    * Headers

     Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGM5OWIzZDNjOWJmOTAwMGY5ZjQ3N2UiLCJpYXQiOjE0ODk2MDc3MDV9.cCUbmCEasO-jogHy3D10spn1x-4eankVhPEL3BH7KXQ

    * Parameters

     user_id: 58c99f9c518037000fd34bc4 (required) - Unique identifier for a user

+ Response 200 (plain/text)

     User has been deleted.

# Group Items
This section groups system items resorces.

# Items [/items/register]
Crete a new item.

## Create user [POST]

+ Request (application/json)
    * Headers

     Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGM5OWIzZDNjOWJmOTAwMGY5ZjQ3N2UiLCJpYXQiOjE0ODk2MDc3MDV9.cCUbmCEasO-jogHy3D10spn1x-4eankVhPEL3BH7KXQ

    * Body

     {
         "name": "item_name",
         "solicitante": "user_name",
         "status": "Pendente",
     }

+ Response 200 (text/plain)

     Successful item creation.

# Items [items/list]
List of all items

## Get all items [GET]

+ Request
    * Headers

     Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGM5OWIzZDNjOWJmOTAwMGY5ZjQ3N2UiLCJpYXQiOjE0ODk2MDc3MDV9.cCUbmCEasO-jogHy3D10spn1x-4eankVhPEL3BH7KXQ

+ Response 200 (application/json)
     [
      {
        "_id": "58c04f7c05d029199b1530a4",
        "name": "Bolinha",
        "solicitante": "Heelo world!",
        "status": "Pendente",
        "created_at": "2017-03-08T18:37:48.182Z",
        "updated_at": "2017-03-08T18:37:48.182Z",
        "__v": 0
      },
      {
        "_id": "58c04f7c05d029199b1530a5",
        "name": "Bolão",
        "solicitante": "Hello world!",
        "status": "Pendente",
        "created_at": "2017-03-08T18:37:48.194Z",
        "updated_at": "2017-03-08T18:37:48.194Z",
        "__v": 0
      },
      {
        "_id": "58c04f7c05d029199b1530a6",
        "name": "Quadrado",
        "solicitante": "Cada um no seu!",
        "status": "Pendente",
        "created_at": "2017-03-08T18:37:48.195Z",
        "updated_at": "2017-03-08T18:37:48.195Z",
        "__v": 0
      },
      {
        "_id": "58c04fa6d8928d19acfc0d9e",
        "name": "Outra Cousa",
        "solicitante": "Heelo world!",
        "status": "Andamento",
        "created_at": "2017-03-08T18:38:30.981Z",
        "updated_at": "2017-03-08T18:38:30.981Z",
        "__v": 0
      },
      {
        "_id": "58c9a61f6f27411644698831",
        "name": "item_name",
        "solicitante": "Admin",
        "status": "Pendente",
        "created_at": "2017-03-15T20:37:51.275Z",
        "updated_at": "2017-03-15T20:37:51.275Z",
        "__v": 0
      },
      {
        "_id": "58c9a63a6f27411644698832",
        "name": "another_item",
        "solicitante": "you",
        "status": "Confirmed",
        "created_at": "2017-03-15T20:38:18.598Z",
        "updated_at": "2017-03-15T20:38:18.598Z",
        "__v": 0
      },
      {
        "_id": "58c9a6576f27411644698833",
        "name": "some_item",
        "solicitante": "another_user",
        "status": "Pending",
        "created_at": "2017-03-15T20:38:47.652Z",
        "updated_at": "2017-03-15T20:38:47.652Z",
        "__v": 0
      }
     ]

# Items [/items/{item_id}]

## Update item by id [PUT]

+ Resquest
    * Headers

     Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGM5OWIzZDNjOWJmOTAwMGY5ZjQ3N2UiLCJpYXQiOjE0ODk2MDc3MDV9.cCUbmCEasO-jogHy3D10spn1x-4eankVhPEL3BH7KXQ

    * Parameters

     item_id: 58c99f9c518037000fd34bc4 (required) - Unique identifier for a item

    * Body

     {
        "name": "another_name",
        "solicitante": "another_user",
        "status": "confirmed"
     }

+ Response 200 (plain/text)

     Item has been updated.

## Delete item by id [DELETE]

+ Resquest
    * Headers

     Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OGM5OWIzZDNjOWJmOTAwMGY5ZjQ3N2UiLCJpYXQiOjE0ODk2MDc3MDV9.cCUbmCEasO-jogHy3D10spn1x-4eankVhPEL3BH7KXQ

    * Parameters

     item_id: 58c99f9c518037000fd34bc4 (required) - Unique identifier for a item

+ Response 200 (plain/text)

     Item has been deleted.
