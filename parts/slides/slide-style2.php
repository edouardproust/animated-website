<style>    
    <?php include_once APP_DIR . '/css/slide-style'.$this->getStyle().'.css' ?>
</style>
<div class="ss2 slide <?= $this->getPageName() ?>" id="<?= $this->getId() ?>">
    <div class="ss2 slide__content">
        <h2 class="ss2 slide__content--title"><?= $this->getTitle() ?></h2>
        <div class="ss2 slide__content--text"><?= $this->getParagraph() ?></div>
    </div>
    <div class="ss2 slide__image">
        <div class="ss2 slide__image--container">
            <img src="<?= $this->getImage() ?>" alt="<?= $this->getTitle() ?>">
        </div>
        <div class="ss2 slide__image--number"><?= $this->getIndex() + 1 ?></div>
    </div>
</div>