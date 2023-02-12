# Tic-tac-toe
A submission as part of GovTech's Accessibility Enabling Team SWE internship technical assement. 

By Loh Kok Wee (Nigel).

# Getting Started
This part walks you through how to run the application locally. It involves two parts, (i) the Flask backend server and (ii) the React frontend application.

## Flask Backend API Server
1. Create a python [virtual environment](https://realpython.com/python-virtual-environments-a-primer/#create-it) and run it.

2. Change into [backend](./backend/).
```
    cd ./backend
```

3. Install dependencies
```
    pip install requirements.txt
```

4. [Install Redis](https://redis.io/docs/getting-started/installation/) and start redis server (for server side session handling).

5. Change directory  and run the server.
```
    python ./app.py
```

## React Frontend Web Application
1. In another terminal, change directory into [frontend](./frontend/).
```
    cd ./frontend
```

2. Install npm packages.
```
    npm i
```

3. Run frontend server.
```
    npm run start
```
