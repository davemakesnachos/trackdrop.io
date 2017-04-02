<?php

namespace Core;

class View
{

    private $template_path = APP_ROOT . '/app/view/_templates/';

    public function render($html_template, $vars = [])
    {
        ob_start();
        extract($vars);
        require_once($this->template_path . $html_template . '.php');
        return ob_get_clean();
    }

}