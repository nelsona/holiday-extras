# User API

## User management API

To run the API you can use the Dockerfile, or access it here:
[Docker hub](https://hub.docker.com/r/nelsona2/users-api/)

You can obtain an image of thsi from hub.docker.com. If you are logged in to the general docker repository you can get a copy by running:
```docker pull nelsona2/users-api```

To use Postman to test the API please click the following button:
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/6ee73e64596d839eb678)

Finally, you can access the root url of the API here:
[API URL](http://users.dunfermline.coffee/users)

The following urls are available to use:
GET / -- This will return a list of the users on the system
GET /:id -- This will return the user matching the id
POST / -- This will add a user to the system (The expected fields in the request body are: forname, surname and email)
PUT /:id -- This will update the user matching the :id (The expected fields in the request body are: forname, surname and email)
DELETE /:id -- This will delete the user matching the :id

## Development

To run the site locally you need to install the packages using ```npm i```

Then you can use ```npm start``` to get the server running.

To run the tests you use ```npm test```


Things I would like to add to improve this are:
Using PM2 rather than node to run it.
More tests
A simple search, using query string parameters.
