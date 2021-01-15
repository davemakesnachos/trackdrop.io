<?php

function json_response($status, $params)
{
	$params['status'] = $status;

	json_encode($params);

	header('HTTP/'.$status, true, $status);

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

function is_valid_slug($slug)
{
    if (preg_match('/^[a-z][-a-z0-9]*$/', $slug))
        return true;

    return false;
}

function create_slug($name)
{
    $withoutExt = preg_replace('/\\.[^.\\s]{3,4}$/', '', $name);
	$slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $withoutExt)));
    $slug = rtrim($slug, "-");

    return $slug;
}
