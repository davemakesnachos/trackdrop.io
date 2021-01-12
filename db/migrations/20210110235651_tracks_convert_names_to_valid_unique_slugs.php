<?php

use Phinx\Migration\AbstractMigration;

class TracksConvertNamesToValidUniqueSlugs extends AbstractMigration
{
    public function up()
    {
        $stmt = $this->query('SELECT * FROM tracks'); // returns PDOStatement
        $tracks = $stmt->fetchAll(); // returns the result as an array
        foreach($tracks as $track)
        {

            $track_id = $track['id'];

            $withoutExt = preg_replace('/\\.[^.\\s]{3,4}$/', '', $track['name']);

            $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $withoutExt)));
            $slug = rtrim($slug, "-");

            $idx = 1;
            $original_slug = $slug;

            while (isset($hash_map[$slug])) {
                $slug = $original_slug . '-' . $idx;
                $idx++;
            }

            $hash_map[$slug] = True;
            $this->execute("UPDATE tracks SET `slug` = \"$slug\" WHERE `id` = \"$track_id\"");
        }
    }

    public function down()
    {
        /* Empty */
    }
}
