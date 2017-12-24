<?php

function json_response_success($params)
{
	$params['status'] = 'ok';

	json_encode($params);

	return $params;
}

function json_response_fail($params, $msg = "")
{
	$params['status'] = 'fail';
	$params['msg'] = $msg;

	json_encode($params);

	return $params;
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
