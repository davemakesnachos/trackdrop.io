<?php

use Core\Router;

Router::addApi([
    'url' => '/api/v1/tracks',
    'controller' => 'TrackController',
    'method' => 'allTracks',
]);

Router::addApi([
    'url' => '/api/v1/tracks/{profile}',
    'controller' => 'TrackController',
    'method' => 'allTracksForProfile',
]);

Router::addApi([
    'url' => '/api/v1/track/upload',
    'controller' => 'TrackController',
    'method' => 'upload',
]);

Router::addApi([
    'url' => '/api/v1/track/delete/{id}',
    'controller' => 'TrackController',
    'method' => 'delete',
]);

Router::addApi([
    'url' => '/api/v1/track/{profile}/{track}',
    'controller' => 'TrackController',
    'method' => 'trackFromProfileAndName',
]);

# User Routes
Router::addApi([
    'url' => '/api/v1/user/register',
    'controller' => 'UserController',
    'method' => 'register',
]);

Router::addApi([
    'url' => '/api/v1/login',
    'controller' => 'SessionController',
    'method' => 'login',
]);

Router::addApi([
    'url' => '/api/v1/logout',
    'controller' => 'SessionController',
    'method' => 'logout',
]);