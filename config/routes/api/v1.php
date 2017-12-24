<?php

use Core\Router;

Router::addApi([
    'url' => '/api/v1/tracks',
    'controller' => 'TrackController',
    'method' => 'allTracks',
]);