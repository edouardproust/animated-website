<style>    
    <?php include_once APP_DIR . '/css/slide-style'.$this->getStyle().'.css' ?>
</style>
<div class="ss1 slide <?= $this->getPageName() ?>" id="<?= $this->getId() ?>">
    <div class="ss1 slide__image">
        <div class="ss1 slide__image--container">
            <img src="<?= $this->getImage() ?>" alt="<?= $this->getTitle() ?>">
        </div>
    </div>
    <div class="ss1 slide__content">
        <h2 class="ss1 slide__content--title"><?= $this->getTitle() ?></h2>
        <div class="ss1 slide_content--text"><?= $this->getParagraph() ?></div>
        <button class="ss1 slide__content--button">
            <a href="<?= $this->getLink() ?>" class="ss1 slide__content--btn-in"><?= $this->getLinkText() ?></a>
        </button>
    </div>
</div>