<?php

$files = scandir('../uploads/');
foreach($files as $file) {
    if (strpos($file, 'mp3') == false) {
        if ($file != "." && $file != "..") {
            $file = "../uploads/" . $file;
            rename($file, $file . ".mp3");
            echo "$file => $file.mp3";
            echo "\n";
        }
    }
}