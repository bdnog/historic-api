# REST API responsible for storing historical data
This API is intended to provide a secure way to store historical data into a NOSQL database.

### When to use?
When it doesn't make sense to keep information in a relational database, for instance, data regarding an inactive client.
If you are running out of space in your RDBMS, you might move to another place the data you don't fetch often.

### Pre-requirements
1. Start a secured MongoDB container
```bash
docker volume create mongodb
docker run -it -d \
        --name mongodb \
        -p 27017:27017 \
        -v mongodb:/data/db \
        -e MONGO_INITDB_ROOT_USERNAME=mongo_admin \
        -e MONGO_INITDB_ROOT_PASSWORD=mongo_password \
        mongo:latest \
        mongod --auth
```

2. Configure a new user/password in your MongoDB container
```bash
docker exec -it mongodb mongo -u "mongo_admin" -p "mongo_password"
> use historic
> db.createUser({
...  user: "historic",
...  pwd: "example",
...  roles: [{role: "readWrite", db: "historic"}]
...})
> exit
exit
```

_When running the commands above, do not include the prefixes `>` and `...`_

If you want to test the connection through the command line, you can use:
```bash
docker exec -it mongodb mongo -u "historic" -p "example" --authenticationDatabase "historic"
```

3. Create a secret key for your application and store it in an environment variable. It will be used by JWT. Example:
```bash
# If you are a Windows user, just use `set` instead of `export`
export APP_SECRET=21cbc8be848603d0f603604b1ed519a8
```

4. Create environment variables for authenticating on the API. Example:
```bash
export AUTH_USERNAME=admin
export AUTH_PASSWORD=example
```

5. Create environment variables for connecting to the MongoDB. Example:
```bash
export MONGODB_HOSTNAME=localhost
export MONGODB_DATABASE=historic
export MONGODB_USERNAME=historic
export MONGODB_PASSWORD=example
```

_Note: if you are going to run the API as a container, instead of creating the environment variables as explained in the steps 3, 4, and 5, you have to inform them as part of the `docker run` command_

### Run the API
1. In order to run it in development mode, just use the following command in the root folder:
```bash
npm run dev
```

_Make sure you have the Node.JS installed in your environment_

2. Build a Docker image by using the `Dockerfile` located in the root folder
```bash
docker build -t historic-api .
```

3. Run the container
```bash
docker run -it -d \
        --name historic-api \
        --link mongodb:mongodb \
        -p 3000:3000 \
        -e APP_SECRET=21cbc8be848603d0f603604b1ed519a8 \
        -e AUTH_USERNAME=admin \
        -e AUTH_PASSWORD=example \
        -e MONGODB_HOSTNAME=mongodb \
        -e MONGODB_DATABASE=historic \
        -e MONGODB_USERNAME=historic \
        -e MONGODB_PASSWORD=example \
        historic-api
```

### Test out the API

Login
```bash
curl -X POST \
  http://localhost:3000/auth/login \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=admin&password=example'
```

Insert data
```bash
curl -X POST \
  http://localhost:3000/historics/COMPANY_1/CUSTOMER_2 \
  -H 'Authorization: Bearer PASTE_YOUR_TOKEN_HERE' \
  -H 'Content-Type: application/json' \
  -d '{"text":"This is historical data"}'
```

Retrieve data
```bash
curl -X GET \
  http://localhost:3000/historics/COMPANY_1/CUSTOMER_2 \
  -H 'Authorization: Bearer PASTE_YOUR_TOKEN_HERE' \
  -H 'Content-Type: application/json'
```
