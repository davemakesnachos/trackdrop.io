<?php
/*
 * core/autoload.class.php - Autoloader class
 *
 * Trackdrop (c) 2016
 */

/**
 * @brief Contains autoload functionality for PHP classes.
 */
class Autoload
{
	private $include_paths;
	static private $file_types = array('.class.php', '.controller.php', '.model.php');

	/**
	 * @param string $class Name of the class to load.
	 *
	 * @retval bool true for success, false for failure.
	 */
	public static function loader($class)
	{
        $class_rebuilt = '';
        $class_parts = explode('\\', $class);
        foreach($class_parts as $part) {
            $part = lcfirst($part);
            $class_rebuilt .= $part .'/';
        }
        $class = rtrim($class_rebuilt, '/');
		$class = str_replace('_', '', $class);
		$class = preg_replace('/([_a-zA-Z0-9]+)Controller$/', '$1', $class);
		$class = preg_replace('/([_a-zA-Z0-9]+)Model$/', '$1', $class);

		foreach (self::$file_types as $type) {
			$filename = $class . $type;
			$file = APP_ROOT . '/' . $filename;

			if (file_exists($file)) {
				include($file);
				return true;
			}
		}

		return false;
	}

	/**
	 * @param string $path Path relative to APP_ROOT to search.
	 */
	public static function register_include_path($path)
	{
		if (in_array($path, $include_paths)) {
			trigger_error("Attempting to add duplicate path: ". $path, E_WARNING);
			return;
		}

		$include_paths[] = $path;
	}
}
?>
