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

/** LOGIN **/
Router::addWeb([
    'url' => '/track/download/{id}',
    'controller' => 'TrackController',
    'method' => 'download',
]);

?>
