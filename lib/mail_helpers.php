<?php

use Mailgun\Mailgun;
# Instantiate the client.

function send_email($to, $from, $subject, $text)
{
    $mgDomain = "mg.trackdrop.io";
    $mgClient = new Mailgun(get_config('MAILGUN_API_KEY'));
    $result = $mgClient->sendMessage($mgDomain, array(
        'from'	=> $from,
        'to'	=> $to,
        'subject' => $subject,
        'text'	=> $text
    ));

    return $result;
}

function send_email_forgot_password($to, $username, $passwordResetLink)
{
    $subject = "Trackdrop.io Password Reset Request";
    $from = "Trackdrop.io Support <support@trackdrop.io>";
    $text =
    "Hi @$username,\n" .
    "We recently received a request to reset your password. If you need to choose a new password, please follow the link below:\n" .
    "\n" .
    "$passwordResetLink\n" .
    "\n" .
    "This password reset link is only valid for the next 60 minutes.\n" .
    "\n" .
    "If you don't need to reset your password or did not request this, please ignore this email.\n" .
    "\n" .
    "Thanks,\n" .
    "The Trackdrop Team\n";

    return send_email($to, $from, $subject, $text);
}