<?php

require_once('../config/config.php');
require_once(APP_ROOT.'/core/autoload.class.php');

spl_autoload_register('Autoload::loader');
require APP_ROOT . '/vendor/autoload.php';

require_once(APP_ROOT.'/config/routes/web.php');

$api_route_files = scandir(APP_ROOT.'/config/routes/api/');
$api_route_files = array_diff($api_route_files, array('.', '..'));

foreach($api_route_files as $file){
    require_once(APP_ROOT . '/config/routes/api/' . $file);
}

require_once(APP_ROOT . '/lib/json_helpers.php');
require_once(APP_ROOT . '/lib/mail_helpers.php');
