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

$config['db_user'] = '';
$config['db_password'] = '';

$config['web_token_cookie_name'] = 'tk';

$config ['upload_folder'] = 'uploads';

require_once('local_config.php');
//require_once('private_config.php');

function get_config($key)
{
	global $config;
	return $config[$key];
}

?>
