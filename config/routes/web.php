<?php

use Core\Router;

/** HOME **/
Router::addWeb([
    'url' => '/',
    'controller' => 'HomeController',
    'method' => 'home',
]);

/** LOGIN **/
Router::addWeb([
    'url' => '/login',
    'controller' => 'LoginController',
    'method' => 'login',
]);

?>
