<?php
require 'config/config.php';

$conf =  array(
    "paths" => array(
        "migrations" => "db/migrations"
    ),
    "environments" => array(
        "default_migration_table" => "phinxlog",
        "default_database" => "dev",
        "dev" => array(
            "adapter" => "mysql",
            "host" => $config['db_host'],
            "name" => $config['db_name'],
            "user" => $config['db_user'],
            "pass" => $config['db_password'],
            "port" => $config['db_port']
        )
    )
);

return $conf;
?>
