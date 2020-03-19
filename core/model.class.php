<?php
/*
 * core/model.class.php - Main model base class
 *
 * Trackdrop (c) 2016
 */

namespace Core;

class Model
{

    protected $table;
    protected $db;
    protected $prepared_sql;

    public function __construct()
    {
        $this->db = $this->connectToDB();
    }

    static private function connectToDB()
    {
        return new Database();
    }

    static private function createModel()
    {
        $type = get_called_class();
        return new $type();
    }

    /**
     * @brief Take an assoc array and extract it to make class vars out of each entry
     * @param array $attr Associative array
     *
     * Generally this will be used with the $row returned from a DB query to make member vars for
     * each column extracted for the class.
     *
     */
    private function setAttributes($attr)
    {
        foreach ($attr as $key => $value)
           $this->$key = $value;
    }

    public function insert($fields)
    {
        $sql = 'INSERT INTO ' . $this->table . ' (';
        foreach($fields as $key => $value) {
            $sql .= $key . ', ';
        }
        $sql = substr($sql, 0, -2);
        $sql .= ') VALUES (';
        foreach($fields as $key => $value) {
            $sql .= '"' . $value . '", ';
        }
        $sql = substr($sql, 0, -2);
        $sql .= ')';

        $this->db->exec($sql);
        return $this->db->lastInsertId();
    }

    public function update($fields, $where_clause)
    {
        $sql = 'UPDATE ' . $this->table . ' SET ';
        foreach($fields as $key => $value) {
            $sql .= $key . '= "' . $value . '", ';
        }
        $sql = substr($sql, 0, -2);
        $sql .= ' WHERE ' . $where_clause;

        $this->db->exec($sql);
        return $this->db->lastInsertId();
    }

    public function select($columns = '*')
    {
        if ($columns === '*')
            $this->prepared_sql = 'SELECT * FROM ' . $this->table;

        //TODO: Actually do something if other columns are desired

        return $this;
    }

    public function delete($where_clause = "")
    {
        if ($where_clause == "" && property_exists($this, id))
            $where_clause = "id = \"$this->id\"";
        $sql = 'DELETE FROM ' . $this->table . ' WHERE ' . $where_clause;
        return $this->db->exec($sql);
    }

    public function where($where_clause)
    {
        $this->prepared_sql .= " WHERE " . $where_clause;
        return $this;
    }

    public function or_where($where_clause)
    {
        $this->prepared_sql .= ' OR ' . $where_clause;
        return $this;
    }

    public function and_where($where_clause)
    {
        $this->prepared_sql .=  ' AND ' . $where_clause;
        return $this;
    }

    /**
     * @brief Find a single record based on id
     * @param integer $id id to look up in the database
     * @retval class Either returns NULL if no match found or a new Model matching
     *               the caller type with ccolumns as class vars.
     *
     */
    static public function find($id)
    {
        $model = self::createModel();

        $model->db->prepare('SELECT * FROM ' . $model->table . " WHERE id = :id");
        $model->db->execute(array(':id' => $id));
        $row = $model->db->fetch();

        if (!$row)
            return null;

        $model->setAttributes($row);

        return $model;
    }

    /**
     * @brief Find all records
     * @param integer $limit max number of rows to return
     * @param string $order_by SQL order_by clasue, eg "id DESC"
     * @retval class Either returns NULL if no match found or a new Model matching
     *               the caller type with ccolumns as class vars.
     *
     */
    static public function findAll($limit = 500, $order_by = "")
    {
        $model = self::createModel();

        if ($order_by != '') 
            $order_by_string = " ORDER BY " . $order_by;
        else
            $order_by_string = '';

        $model->db->prepare('SELECT * FROM ' . $model->table . $order_by_string . " LIMIT " . $limit);
        $model->db->execute([]);
        $results = $model->db->fetchAll();

        if (!$results)
            return null;

        $model_results = [];
        foreach($results as $row) {
            $this_model = self::createModel();
            $this_model->setAttributes($row);
            $model_results[] = $this_model;
        }

        return $model_results;
    }

    /**
     * @brief Find a single record based on any column values
     * @param array $values Array of key => value pairs that will match all columns named key equal to value
     * @retval class Either returns NULL if no match found or a new Model matching
     *               the caller type with columns as class vars.
     *
     */
    public function findBy($values)
    {
        $model = self::createModel();

        $sql = 'SELECT * FROM ' . $model->table . " WHERE ";

        foreach($values as $key => $value) {
            $sql .= $key . ' =  :'. $key . ' AND ';
        }
        $sql = substr($sql, 0, -5);

        $model->db->prepare($sql);
        $model->db->execute($values);
        $row = $model->db->fetch();

        if (!$row)
            return null;

        $model->setAttributes($row);

        return $model;
    }

    /**
     * @brief Finds all records record based on any column values
     * @param array $values Array of key => value pairs that will match all columns named key equal to value
     * @retval class Either returns NULL if no match found or a new Model matching
     *               the caller type with columns as class vars.
     *
     */
    public function findAllBy($values, $limit = 500, $order_by = "")
    {
        $model = self::createModel();

        if ($order_by != '')
            $order_by_string = " ORDER BY " . $order_by;
        else
            $order_by_string = '';

        $sql = 'SELECT * FROM ' . $model->table . " WHERE ";

        foreach($values as $key => $value) {
            $sql .= $key . ' =  :'. $key . ' AND ';
        }
        $sql = substr($sql, 0, -5);

        $model->db->prepare($sql . ' ' . $order_by_string . " LIMIT " . $limit);
        $model->db->execute($values);
        $results = $model->db->fetchAll();

        if (!$results)
            return null;

        $model_results = [];
        foreach($results as $row) {
            $this_model = self::createModel();
            $this_model->setAttributes($row);
            $model_results[] = $this_model;
        }

        return $model_results;
    }

	/**
     * @brief Take an assoc array and an array of keys and return array with only items matching keys
     * @param array $data Associative array
     * @param array $allowed_keys Flat array list of keys to return
     * @retval array Array containing only items with keys that match allowed_keys
	 *
	 */
    public function permit($data, $allowed_keys)
    {
        foreach ($allowed_keys as $key)
            if (isset($data[$key]))
                $arr[$key] = $data[$key];

        return $arr;
    }
}
