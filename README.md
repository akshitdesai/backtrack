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
pyenv install 3.9.18

# install dependencies
cd server
pyenv local 3.9.18
pyenv exec python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# To run the server
python main.py
```

