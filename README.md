# Backtrack

### App to enhance productivity by monitoring body gestures

## To run a client

```bash
cd client
npm install # or yarn install
export NODE_OPTIONS=--openssl-legacy-provider
npm start # or yarn start
```

## To run a server

```bash
# install pyenv if not installed
brew install pyenv
pyenv install 3.9.18GIT

# install dependencies
cd server
pyenv install 3.9.18
pyenv local 3.9.18
pyenv exec python -m venv .venv
source .venv/bin/activate
.venv\Scripts\activate   // For Windows User
pip install -r requirements.txt
pip install "PyJWT==1.7.1"
pip install greenlet
pip install "mediapipe== 0.10.9"

# To run the server
flask run -p 8000 --debugger
```
