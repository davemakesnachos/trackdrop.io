<?php
/*
 * config/config.php - Application wide configuration
 *
 * trackdrop (c) 2016
 */

/*
 * Database Configuration
 *
 * These will get populated by deployment script in local_config.php
 */

define('SITE_URL', $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST']);

$config['db_user'] = '';
$config['db_password'] = '';

$config['web_token_cookie_name'] = 'tk';

require_once('local_config.php');
//require_once('private_config.php');

$config['redirect_mode'] = false;

$config ['upload_folder'] = APP_ROOT . '/uploads';

function get_config($key)
{
	global $config;
	return $config[$key];
}

?>
