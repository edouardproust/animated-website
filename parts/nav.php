<nav>
    <div class="nav-bg"></div>
    <div class="cursor-custom"></div>
    <div class="nav-content">
        <div class="logo">
            <a href="<?= APP_PATH ?>"><?= SITE_NAME ?></a>
        </div>
        <div class="menu-hamburger">
            <div class="menu-hamburger__line1"></div>
            <div class="menu-hamburger__line2"></div>
        </div>
    </div>
    <div class="menu-container">
        <div class="menu__container--links">
            <?php foreach ([
                new MenuLink('Home', absUrl('/'), false),
                new MenuLink('Top 3', absUrl('top3.php'), false, true),
                new MenuLink('LinkedIn', 'https://www.linkedin.com', true, false, 'small'),
                new MenuLink('GitHub', 'https://www.github.com', true, false, 'small'),
                new MenuLink('Twitter', 'https://www.twitter.com', true, false, 'small'),
                new MenuLink('Facebook', 'https://www.facebook.com', true, false, 'small'),
            ] as $link) : ?>
                <?php $link->show() ?>
            <?php endforeach ?>
        </div>
        <div class="menu__container--descr">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit excepturi incidunt corrupti exercitationem aperiam possimus aspernatur temporibus? Aperiam possimus necessitatibus, inventore, illum veniam voluptate ab sapiente fuga tempora aut qui.
        </div>
    </div>
</nav>

<main data-barba="container" data-barba-namespace="<?= $slug ?>">