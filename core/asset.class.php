<?php

namespace Core;

class Asset
{

    private $css_paths = [];
    private $js_paths = [];

    public function addCss($path_list)
    {
        if(is_array($path_list)) {
            foreach($path_list as $path) {
                $this->css_paths[] = '/assets/css/' . $path;
            }
        } else {
            $this->css_paths[] = '/assets/css/' . $path_list;
        }
    }

    public function addJs($path_list)
    {
        if(is_array($path_list)) {
            foreach($path_list as $path) {
                $this->js_paths[] = '/assets/js/' . $path;
            }
        } else {
            $this->js_paths[] = '/assets/js/' . $path_list;
        }
    }

    public function getCss() {
        return $this->css_paths;
    }

    public function getJs() {
        return $this->js_paths;
    }

}