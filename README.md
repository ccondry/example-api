# example-api
This is an example REST API service built on Express.js.

## Development
### Create .env file
Copy the `.env.example` file to a `.env` file here in this folder, and enter
your environment values.

### Install Dependencies
`yarn` to download node dependencies. 
Do this once the first time you clone this project.

### Start/Stop
`yarn start` to start the application in development mode

## Production

### Create .env file
Copy the `.env.example` file to a `.env` file here in this folder, and enter
your environment values.

### Installation
`./install.sh` to install onto proudction server. installs dependencies, creates
.env file, and installs systemd service in Linux.

### Uninstallation
`./uninstall.sh` to uninstall this systemd service

### Start/Stop

`systemctl start example-api.service` to start the application as a systemd service in Linux

`systemctl stop example-api.service` to stop the application systemd service in Linux

`systemctl restart example-api.service` to restart the application systemd service in Linux

### Logging

`journalctl -xef -u example-api.service` to print current logs and follow new log entries for this service