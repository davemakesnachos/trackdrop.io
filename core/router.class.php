<?php

namespace Core;

class Router
{

    private static $web_routes = [];
    private static $api_routes = [];

    public static function addWeb($web_url)
    {
        self::$web_routes[] = $web_url;
    }

    public static function addApi($api_url)
    {
        self::$api_routes[] = $api_url;
    }

    public static function matchRequest($current_url)
    {
        // break current URL apart
        $url_parts = parse_url($current_url);
        $current_base_route = $url_parts['path'];

        // put standard GET variables in the $params array
        $params = [];
        (isset($url_parts['query']) ? parse_str($url_parts['query'], $params) : false);

        // put standard POST variables into the $params array
        foreach($_POST as $key => $value) {
            $params[$key] = $value;
        }

        $match = false;

        // loop through our routes to see if we have a match
        $routes = array_merge(self::$web_routes, self::$api_routes);
        foreach($routes as $route) {
            if (get_config('redirect_mode'))
                if (!isset($route['bypass_redirect']))
                    continue;

            // convert the route custom vars (i.e. {custom_var}) to dynamic regex expression
            preg_match_all("/{[_a-zA-Z0-9]+}/", $route['url'], $route_custom_vars);
            $dynamic_route = preg_replace("/{[_a-zA-Z0-9]+}/", "([-_a-zA-z0-9]+)", $route['url']);
            $dynamic_route = str_replace("/", "\/", $dynamic_route);

            // does the dynamic route match the current url?
            preg_match_all("/^".$dynamic_route."$/", $current_base_route, $url_custom_vars_matches);

            // if the dynamic URL does match the current URL OR if it's an exact match, we're good!
            if(!empty($url_custom_vars_matches[1]) || $current_base_route == $route['url']) {

                // if the route has {custom vars}, convert them to the proper format for $params
                if(isset($url_custom_vars_matches[1])) {
                    foreach($route_custom_vars[0] as $key => $custom_var) {
                        $custom_var = preg_replace("/[{}]/", "", $custom_var);
                        $params[$custom_var] = $url_custom_vars_matches[(int)($key+1)][0];
                    }
                }

                // web route
                $class = 'App\Controller\Web\\'.$route['controller'];

                // api route
                if (in_array($route, self::$api_routes)) {
                    preg_match('/v([0-9]+)/', $route['url'], $version_match);
                    $major_version = $version_match[1];
                    $class = 'App\Controller\Api\\v'.$major_version.'\\'.$route['controller'];
                }

                foreach($params as &$param) {
                    if (!is_array($param)) {
                        addslashes($param);
                    }
                }

                if (!isset($route['redirect']))
                    $controller = new $class($route['method'], $params);
                else
                    $controller = new $class($route['method'], $params, $route['redirect']);
                // set json as response type if API request
                if (in_array($route, self::$api_routes)) {
                    $controller->setResponseFormat('json');
                }

                /* Allow for self formatting route */
                if (isset($route['outputRaw']) && ($route['outputRaw'] === true))
                    $controller->setResponseFormat('raw');

                $controller->run();

                $match = true;

                break;
            }
        }

        if (!$match)
            include (APP_ROOT . '/' . 'public/redirect.php');

    }

}
