<?php

namespace Core;

use \PDO;

class Database
{
    static private $instance;
    private $prepared;

    public function __construct()
    {
        if(!self::$instance) {
            try {
                self::$instance = new PDO('mysql:host='.get_config('db_host').';dbname='.get_config('db_name').';charset=utf8', get_config('db_user'), get_config('db_password'));
		self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                die("PDO CONNECTION ERROR: " . $e->getMessage() . "<br/>");
            }
        }
        return self::$instance;
    }

    public function beginTransaction() {
        return self::$instance->beginTransaction();
    }

    public function commit() {
        return self::$instance->commit();
    }

    public function rollBack() {
        return self::$instance->rollBack();
    }

    public function errorCode() {
        return self::$instance->errorCode();
    }

    public function errorInfo() {
        return self::$instance->errorInfo();
    }

    public function prepare($statement) {
        $this->prepared = self::$instance->prepare($statement);
    }

    public function execute($statement) {
        $this->prepared->execute($statement);
    }

    public function exec($statement) {
        return self::$instance->exec($statement);
    }

    public function query($sql)
    {
        return self::$instance->query($sql);
    }

    public function lastInsertId($name = false) {
        return self::$instance->lastInsertId($name);
    }

    public function fetch() {
        return $this->prepared->fetch(PDO::FETCH_ASSOC);
    }

    public function fetchAll() {
        return $this->prepared->fetchAll();
    }

}
