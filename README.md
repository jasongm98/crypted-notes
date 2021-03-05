# Crypted notes

## Start the app using docker

Launch app running the following command:

```
cp .env.sample .env
docker-compose up --build
```

## Start app using npm

Before starting the app you will need to have:

-   NPM / NodeJs (recommended version 12.18.3)
-   MySQL

When the above steps is done, you can install de project dependencies using:

```
npm install
```

After, you can copy the environment file and change the needed variables

```
cp .env.sample .env
```

Finally, we can start our app:

```
npm start
```
