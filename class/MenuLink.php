<?php

class MenuLink {

    public function __construct(
        string $title, 
        string $url, 
        bool $targetBlank = false, 
        bool $bottomSeparator = false,
        string $class = ''
    ) {
        $this->title = $title;
        $this->url = $url;
        $this->targetBlank = $targetBlank;
        $this->bottomSeparator = $bottomSeparator;
        $this->class = $class;
    }

    public function show(): void
    { 
        $target = $this->targetBlank ? ' target="_blank"' : '';
        $class = !empty($this->class) ? ' class="'.$this->class.'"' : '';
        ?>
        <a href="<?= $this->url ?>"<?= $target ?><?= $class ?>>
            <?= $this->title ?>
        </a>
        <?php if($this->bottomSeparator): ?>
            <div class='menu__container--links--separator'></div>
        <?php endif ?>
        <?php
    }

}