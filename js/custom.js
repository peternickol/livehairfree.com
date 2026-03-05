jQuery(function ($) {
  'use strict';

  var $window = $(window);
  var $header = $('.header');
  var $navbar = $header.find('.navbar');
  var $body = $('body');
  var $heroSlider = $('.main-slider .inner');
  var originalNavbarParent = $navbar.parent();

  function updateStickyNav() {
    if (!$navbar.length) {
      return;
    }

    var shouldStick = $window.width() > 750 && $window.scrollTop() > 400;

    if (shouldStick && !$navbar.hasClass('navbar-sticky')) {
      $header.css('height', $header.outerHeight());
      $navbar.css('opacity', '0').addClass('navbar-sticky').appendTo($body).animate({ opacity: 1 });
      return;
    }

    if (!shouldStick && $navbar.hasClass('navbar-sticky')) {
      $navbar.removeClass('navbar-sticky').appendTo(originalNavbarParent);
      $header.css('height', 'auto');
    }
  }

  function updateHeroHeight() {
    var slideHeight = $window.width() < 768 ? $window.height() - 119 : $window.height() - 159;
    $('.slideResize').height(slideHeight);
  }

  if ($heroSlider.length && typeof $.fn.owlCarousel === 'function') {
    var sliderSettings = $heroSlider.parent();

    $heroSlider.owlCarousel({
      items: 1,
      loop: String(sliderSettings.data('loop')) === 'true',
      margin: 0,
      nav: true,
      dots: true,
      navText: [],
      autoplay: String(sliderSettings.data('autoplay')) === 'true',
      autoplayTimeout: sliderSettings.data('interval') || 3000,
      autoplayHoverPause: true,
      smartSpeed: 700
    });
  }

  updateStickyNav();
  updateHeroHeight();

  $window.on('scroll', function () {
    updateStickyNav();
  });

  $window.on('resize', function () {
    updateStickyNav();
    updateHeroHeight();
  });
});
