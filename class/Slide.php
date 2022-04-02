<?php
class Slide
{

    // set in SlidesContainer
    private $id;
    private $pageName;
    private $index;
    // set in SlidesCOntainer or in Slide
    private $style;
    // set in Slide
    private $title;
    private $paragraph;
    private $image;
    private $link;
    private $linkText;

    function __construct(
        $title,
        $paragraph = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ab, excepturi praesentium rerum reprehenderit in quasi similique incidunt dolores. Nostrum odit commodi voluptate temporibus harum. Maiores illo adipisci illum dignissimos!",
        $image = APP_PATH . '/img/placeholder.jpeg',
        $link = "page2.php",
        $linkText = null,
        $style = null
    ) {
        $this->title = $title;
        $this->paragraph = $paragraph;
        $this->image = absUrl($image);
        $this->link = absUrl($link);
        $this->linkText = $linkText;
        $this->style = $style;
    }

    public function show()
    {
        require APP_DIR . '/parts/slides/slide-style' . $this->getStyle() . '.php';
    }

    // getters

    public function getId(): ?string
    {
        return $this->pageName . '-' . $this->index;
    }

    public function getPageName(): ?string
    {
        return $this->pageName;
    }

    public function getIndex(): ?int
    {
        return $this->index;
    }

    public function getStyle(): ?int
    {
        return $this->style;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function getParagraph(): ?string
    {
        return $this->paragraph;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function getLinkText(): ?string
    {
        return $this->linkText;
    }

    // setters

    public function setPageName(string $pageName): void
    {
        $this->pageName = $pageName;
    }

    public function setIndex(int $index): void
    {
        $this->index = $index;
    }

    public function setStyle(?int $style): void
    {
        $this->style = $style;
    }

    public function setLinkText(?string $linkText): void
    {
        $this->linkText = $linkText;
    }
}
