<?php

use Phinx\Migration\AbstractMigration;

class CreateUsersTable extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {
        $table = $this->table('users');
        $table->addColumn('email', 'string')
              ->addColumn('password_hash', 'string', array('null' => true))
              ->addColumn('name', 'string')
              ->addColumn('created', 'timestamp', array('default' => 'CURRENT_TIMESTAMP'))
              ->addColumn('updated', 'timestamp', array('default' => 'CURRENT_TIMESTAMP', 'update' => 'CURRENT_TIMESTAMP'))
              ->addColumn('level', 'integer', array('default' => 0))
              ->addColumn('status', 'integer', array('default' => 0))
              ->addColumn('alert', 'boolean', array('default' => false))
              ->addIndex(array('email'), array('unique' => true))
              ->addIndex(array('name'), array('unique' => true))
              ->create();
    }
}
