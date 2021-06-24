#!/bin/sh
echo "stopping systemd service..."
sudo sudo /bin/systemctl stop example-api.service
echo "systemd service is stopped."
echo "disabling systemd service..."
sudo systemctl disable example-api.service
echo "systemd service now disabled."
echo "removing systemd service file..."
sudo rm /lib/systemd/system/example-api.service
echo "removed systemd service file."
echo "uninstall complete. you can now remove this folder."
