# Studii
A collaborative note sharing and study platform.

## Backend
### API Endpoints
`userauth/` : User authentication app

------------

`userauth/login/`: Login api view. Accepts email & password. Returns Knox token and user instance.

###### POST Request
Body: 
```json
{
"username": "example@email.com",
"password": "examplePassword"
}
```
Response:
```json
{
    "expiry": "2019-11-06T09:34:14.408381Z",
    "token": "e29e4bbd7acf13e2c4566e6a533fefdd192261fe0f0f29d65bd1c3a8d0217a37",
    "user": {
        "url": "http://localhost:8000/userauth/users/3cf9fef0-6258-4088-955e-fb4573ce60be/",
        "id": "3ff9f4k0-2258-4088-935e-fb4343se60bc",
        "email": "example@email.com",
        "first_name": "Example",
        "last_name": "Example",
        "profile": null
    }
}
```
------------

`userauth/logout/`: Knox Logout api view. From Knox documentation ([Knox Docs](https://james1345.github.io/django-rest-knox/ "Knox Docs")): This view accepts only a post request with an empty body. It responds to Knox Token Authentication. On a successful request, the token used to authenticate is deleted from the system and can no longer be used to authenticate.

###### POST Request
Header:
Authorization: Token *Knox Token*

------------

`userauth/logoutall/`: Knox Logout api view. From Knox documentation ([Knox Docs](https://james1345.github.io/django-rest-knox/ "Knox Docs")): This view accepts only a post request with an empty body. It responds to Knox Token Authentication. On a successful request, the token used to authenticate, and all other tokens registered to the same User account, are deleted from the system and can no longer be used to authenticate.

###### POST Request

Header:
Authorization: Token *Knox Token*

------------

`userauth/users/`: API endpoint for interactiong with User database models.

###### GET Request
Lists all users in databse. Requires admin credentials.

Header:
Authorization: Token *Knox Token*

Response:
```json
[
    {
        "url": "http://localhost:8000/userauth/users/3cf9fef0-6258-4088-955e-fb4573ce60be/",
        "id": "3cf9fef0-6258-4088-955e-fb4573ce60be",
        "email": "lenover.p@gmail.com",
        "first_name": "Patrick",
        "last_name": "Lenover",
        "profile": null
    },
    {
        "url": "http://localhost:8000/userauth/users/d65c040d-4f27-4e59-bbeb-cb27a86ff126/",
        "id": "d65c040d-4f27-4e59-bbeb-cb27a86ff126",
        "email": "test@test.com",
        "first_name": "test",
        "last_name": "test",
        "profile": {
            "avatar": null,
            "university": "",
            "program": "",
            "gradYear": null
        }
    }
]
```

###### POST Request
Creates new user.

Body:
```json
{
	"email": "example@test.com",
	"password":"exampleTest",
	"first_name":"Example",
	"last_name":"Test",
	"profile":{
		"university":"Queen's",
		"program":"Testing",
		"gradYear":2020
	}
}
```
Also accepts profile picture, called avatar within profile  model.

Response:
```json
{
    "url": "http://localhost:8000/userauth/users/d5b6aa6b-15fc-48fd-972b-b57ddece8c02/",
    "id": "d5b6aa6b-15fc-48fd-972b-b57ddece8c02",
    "email": "example@test.com",
    "first_name": "Example",
    "last_name": "Test",
    "profile": {
        "avatar": null,
        "university": "Queen's",
        "program": "Testing",
        "gradYear": 2020
    }
}
```
------------
`userauth/users/**user ID**/`: API endpoint for viewing and modifying indvidual users.

###### GET Request
Gets user data.

Header:
Authorization: Token *Knox Token*

Response:
```json
{
    "url": "http://localhost:8000/userauth/users/3cg93ef0-6258-4038-455e-fb45s3ce60be/",
    "id": "3cg93ef0-6258-4038-455e-fb45s3ce60be",
    "email": "example@test.com",
    "first_name": "Example",
    "last_name": "Example",
    "profile": null
}
```

###### PUT Request
Updates user data.

Header:
Authorization: Token *Admin Knox Token*

Body:
```json
{
    "email": "newEmail@test.com",
    "first_name": "NewName",
    "last_name": "NewLastName",
    "password": "validPassword",
    "profile": {
        "university": "New University",
        "program": "New Program",
        "gradYear": 2020
    }
}
```
Note: A valid password must be provided, however the password cannot be changed from this view. The valid password provided does not need to be the users' actual password.

Response:
```json
{
    "url": "http://localhost:8000/userauth/users/d5b6aa6b-15fc-48fd-972b-b57ddece8c02/",
    "id": "d5b6aa6b-15fc-48fd-972b-b57ddece8c02",
    "email": "newEmail@test.com",
    "first_name": "Example",
    "last_name": "Test",
    "profile": {
        "avatar": null,
        "university": "New University",
        "program": "New Program",
        "gradYear": 2020
    }
}
```

###### DELETE Request
Deletes user. Requires admin credentials.

Header:
Authorization: Token *Admin Knox Token*

------------

`userauth/updatepass/`: API endpoint for updating user passwords.

###### PUT Request

Header:
Authorization: Token *Knox Token*

Body:
```json
{
	"old_password": "oldPassword",
	"new_password": "newPassword"
}
```
