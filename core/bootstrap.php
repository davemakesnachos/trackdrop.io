<?php

require_once('../config/config.php');
require_once(APP_ROOT.'/core/autoload.class.php');

spl_autoload_register('Autoload::loader');
require APP_ROOT . '/vendor/autoload.php';

require_once(APP_ROOT.'/config/routes/web.php');