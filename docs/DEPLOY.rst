============
Deploy Guide
============

When creating a new node, several manual steps are needed:

First, log in to node and run:

.. code::

  $ sudo apt update && sudo apt install python python3-pymysql

to install python which is needed for ansible provisioning. The pymsql package
seems to be needed currently due to
https://github.com/geerlingguy/ansible-role-mysql/issues/344

If using a smaller node, a swap file may be required to get through ``npm run build``
without exhausting all available ram. Currently it seems that 2GB or greater total is
sufficent for this.

.. code::

  $ sudo fallocate -l 1G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile

Ensure the required deploy key is under ``devops/keys/deploy-key``. If no
key is present or it is not up to date, handle generating a new one using
Gitlab.
