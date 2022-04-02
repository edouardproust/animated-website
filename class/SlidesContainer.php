<?php

class SlidesContainer {

    private $slides;
    private $pageName;
    private $slidesDefaultStyle;
    private $slidesDefaultLinkText;

    public function __construct(
        array $slides, 
        string $pageName, 
        string $slidesDefaultStyle, 
        string $slidesDefaultLinkText = 'Show more'
    ) {
        $this->slides = $slides;
        $this->pageName = $pageName;
        $this->slidesDefaultStyle = $slidesDefaultStyle;
        $this->slidesDefaultLinkText = $slidesDefaultLinkText;

        $this->setSlidesProperties();    
    }

    private function setSlidesProperties() {
        $slideIndex = 0;
        foreach($this->slides as $slide) {
            // index & slug
            $slide->setIndex($slideIndex);
            $slide->setPageName($this->pageName);
            $slideIndex++;
            // style
            if($slide->getStyle() === null) {
                $slide->setStyle($this->slidesDefaultStyle);
            } 
            // button text
            if($slide->getLinkText() === null) {
                $slide->setLinkText($this->slidesDefaultLinkText);
            }          
        }
    }

    public function showAll() 
    {
        $index = 0;
        foreach($this->slides as $slide) {
            $slide->show($index);
            $index++;
        }
    }

}