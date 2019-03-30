<?php

function json_response($status, $params)
{
	$params['status'] = $status;

	json_encode($params);

	header('HTTP/'.$status);

	return $params;
}

function json_response_success($params = [])
{
	return json_response(200, $params);
}

function json_response_fail($status, $params, $msg = "")
{
	$params['msg'] = $msg;
	return json_response($status, $params);
}

function raw_xml_to_json($raw_xml)
{
	$xml = simplexml_load_string($raw_xml);
	$json = json_encode($xml);

	return $json;
}

function is_json($string)
{
    $data = json_decode($string);
    return (json_last_error() == JSON_ERROR_NONE) ? TRUE : FALSE;
}
