#!/bin/sh
echo "running yarn"
yarn
if [ $? -eq 0 ]; then
  echo "edit .env file first"
  vim .env
  echo "installing systemd service..."
  sudo cp systemd.service /lib/systemd/system/example-api.service
  echo "enabling systemd service..."
  sudo systemctl enable example-api.service
  echo "starting systemd service..."
  systemctl start example-api.service
  echo "install example-api.service is complete."
else
  echo "yarn failed"
fi
