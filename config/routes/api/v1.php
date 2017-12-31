<?php

use Core\Router;

Router::addApi([
    'url' => '/api/v1/tracks',
    'controller' => 'TrackController',
    'method' => 'allTracks',
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