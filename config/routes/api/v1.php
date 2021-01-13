<?php

use Core\Router;

/**
 * @api {get} api/v1/tracks Get all tracks in stream
 * @apiName TracksAll
 * @apiGroup Tracks
 *
 * @apiSuccess (200) {String} result 'OK'.
 */

Router::addApi([
    'url' => '/api/v1/tracks',
    'controller' => 'TrackController',
    'method' => 'allTracks',
]);

/**
 * @api {get} api/v1/tracks/{profile} Get all tracks for a profile
 * @apiName TracksProfile
 * @apiGroup Tracks
 *
 * @apiSuccess (200) {String} result 'OK'.
 */

Router::addApi([
    'url' => '/api/v1/tracks/{profile}',
    'controller' => 'TrackController',
    'method' => 'allTracksForProfile',
]);

/**
 * @api {post} api/v1/track/upload Upload a track
 * @apiName TracksUpload
 * @apiGroup Tracks
 *
 * @apiSuccess (200) {String} result 'OK'.
 */

Router::addApi([
    'url' => '/api/v1/track/upload',
    'controller' => 'TrackController',
    'method' => 'upload',
]);

/**
 * @api {post} api/v1/track/delete Delete a track
 * @apiName TracksDelete
 * @apiGroup Tracks
 *
 * @apiSuccess (200) {String} result 'OK'.
 */

Router::addApi([
    'url' => '/api/v1/track/delete',
    'controller' => 'TrackController',
    'method' => 'delete',
]);

/**
 * @api {get} api/v1/track/{profile}/{slug} Get a single track associated with profile
 * @apiName TracksProfileTrack
 * @apiGroup Tracks
 *
 * @apiSuccess (200) {String} result 'OK'.
 */

Router::addApi([
    'url' => '/api/v1/track/{profile}/{slug}',
    'controller' => 'TrackController',
    'method' => 'trackFromProfileAndName',
]);

/**
 * @api {get} api/v1/track/validate_slug Get a single track associated with profile
 * @apiName TracksProfileTrack
 * @apiGroup Tracks
 *
 * @apiSuccess (200) {String} result 'OK'.
 */

Router::addApi([
    'url' => '/api/v1/track/validate_slug',
    'controller' => 'TrackController',
    'method' => 'validateTrackSlugForUser',
]);

/**
 * @api {get} api/v1/user/register Register a new user
 * @apiName UserRegister
 * @apiGroup User
 *
 * @apiParam {String} email User's email address they will use to login.
 * @apiParam {String} name User's name for their profile.
 * @apiParam {String} password User's new password they will use to login.
 * @apiParam {String} code Invite code that is currently required to get an account.
 *
 * @apiSuccess (200) {String} result 'OK'.
 * @apiError (400) {String} result 'Invalid invite code provided!'
 */

Router::addApi([
    'url' => '/api/v1/user/register',
    'controller' => 'UserController',
    'method' => 'register',
]);

/**
 * @api {post} api/v1/user/reset_password Do a password reset
 * @apiName UserResetPassword
 * @apiGroup User
 *
 * @apiParam {String} token ID created by forgot password request that was received in email.
 * @apiParam {String} password User's new password they will use to login.
 *
 * @apiSuccess (200) {String} result 'OK'.
 * @apiError (404) {String} result 'Invalid token.'.
 * @apiError (400) {String} result 'Invalid.'.
 * @apiError (400) {String} result 'Operation Failed.'.
 */

Router::addApi([
    'url' => '/api/v1/user/reset_password',
    'controller' => 'UserController',
    'method' => 'reset_password',
]);

/**
 * @api {post} api/v1/login Login a user
 * @apiName UserLogin
 * @apiGroup User
 *
 * @apiParam {String} email User's email address they will use to login.
 * @apiParam {String} password User's password they will use to login.
 *
 * @apiSuccess (200) {String} result 'OK'.
 * @apiError (400) {String} result 'User and password combination not found in database.'
 * @apiError (400) {String} result 'Not Logged In.'
 */

Router::addApi([
    'url' => '/api/v1/login',
    'controller' => 'SessionController',
    'method' => 'login',
]);

/**
 * @api {get} api/v1/logout Logout a user
 * @apiName UserLogout
 * @apiGroup User
 *
 * @apiSuccess (200) {String} result 'OK'.
 * @apiError (404) {String} result 'Invalid session token.'.
 */

Router::addApi([
    'url' => '/api/v1/logout',
    'controller' => 'SessionController',
    'method' => 'logout',
]);

/**
 * @api {post} api/v1/invite/create Create an invite
 * @apiName InviteCreate
 * @apiGroup Invite
 *
 * @apiParam {String} email Email address to send invite to.
 *
 * @apiSuccess (200) {String} result 'OK'.
 * @apiError (401) {String} result 'Password reset request failed. Please try again later.'
 */

Router::addApi([
    'url' => '/api/v1/invite/create',
    'controller' => 'InviteController',
    'method' => 'create',
]);

/**
 * @api {post} api/v1/invite/validate Validate an invite
 * @apiName InviteValidate
 * @apiGroup Invite
 *
 * @apiParam {String} code Token generated with a call to InviteCreate that will allow access to register.
 *
 * @apiSuccess (200) {String} result 'OK'.
 */

Router::addApi([
    'url' => '/api/v1/invite/validate',
    'controller' => 'InviteController',
    'method' => 'validate',
]);

/**
 * @api {post} api/v1/forgot_password Create a forgot password request
 * @apiName PasswordResetRequestCreate
 * @apiGroup PasswordResetRequest
 *
 * @apiParam {String} email Email address associated with an account that will create a password request
 *
 * @apiSuccess (200) {String} result 'OK'.
 * @apiError (400) {String} result 'Password reset request failed. Please try again later.'
 */

Router::addApi([
    'url' => '/api/v1/forgot_password',
    'controller' => 'PasswordResetRequestController',
    'method' => 'create',
]);

/**
 * @api {post} api/v1/reset_password Validate a check password request token
 * @apiName PasswordResetRequestValidate
 * @apiGroup PasswordResetRequest
 *
 * @apiParam {String} token Token generated by a call to PasswordResetRequestCreate.
 *
 * @apiSuccess (200) {String} result 'OK'
 * @apiError (404) {String} result 'Invalid token.'
 */

Router::addApi([
    'url' => '/api/v1/reset_password',
    'controller' => 'PasswordResetRequestController',
    'method' => 'validate',
]);
