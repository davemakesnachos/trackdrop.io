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

Local File Setup
================

Ensure the required deploy key is under ``devops/keys/deploy-key``. If no
key is present or it is not up to date, handle generating a new one using
Gitlab.

Additionally, a ``private_config.php`` file must exist containing all private config that
is kept out of source control. Required API keys are:

MAILGUN_API_KEY                 API Key for Mailgun API

Ansible Provisioning
====================

Use

.. code::

   $ ansible-playbook  -i hosts iterate-deploy.yml

Ensure that the branch name within the script matches the branch that should
be checked out.