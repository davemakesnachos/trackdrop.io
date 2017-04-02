<?php
/*
 * public/index.php - Entry point for deatery application
 *
 * Deatery (c) 2016
 */

use Core\Router;

require_once('../core/bootstrap.php');

Router::matchRequest($_SERVER['REQUEST_URI']);

?>
