<?php
require 'config.php';

function getStyles()
{
?>
    <link rel="stylesheet" href="<?= APP_PATH ?>/css/style.css">
    <link rel="stylesheet" href="<?= APP_PATH ?>/lib/fonts/abril-fatface/abril-fatface.css">
    <link rel="stylesheet" href="<?= APP_PATH ?>/lib/fonts/lato/lato.css">
<?php
}

function getScripts()
{
?>
    <!-- GSAP | Doc: https://greensock.com/docs/ -->
    <script src="<?= APP_PATH ?>/lib/js/gsap/scrollTrigger.min.js"></script>
    <script src="<?= APP_PATH ?>/lib/js/gsap/scrollToPlugin.min.js"></script>
    <script src="<?= APP_PATH ?>/lib/js/gsap/gsap.min.js"></script>
    <!-- Barba.js | Doc: https://barba.js.org/docs/getstarted/intro/ -->
    <script src="<?= APP_PATH ?>/lib/js/barba.min.js"></script>
    <!-- App -->
    <script src="<?= APP_PATH ?>/js/class/ConfigAnimations.js"></script>
    <script src="<?= APP_PATH ?>/js/class/SinglePageAnimation.js"></script>
    <script src="<?= APP_PATH ?>/js/class/GlobalAnimation.js"></script>
    <script src="<?= APP_PATH ?>/js/app.js"></script>
<?php
}

/**
 * Get absolute url (to use for images, links, etc.)
 *
 * @return string Absolute url 
 */
function absUrl(string $filePath)
{
    return APP_PATH . $filePath;
}


/**
 * Get relative file path  (to use for php files: include(), require(),...)
 *
 * @return string Relative file path
 */
function relPath(string $filePath)
{
    return APP_DIR . $filePath;
}
