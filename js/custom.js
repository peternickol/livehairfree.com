jQuery(document).ready(function(){
  'use strict';

  //============================== MENU SCROLL =========================
  $(window).on('load', function(){
		$('#body').each(function(){
			var header_area = $('.header');
			var main_area = header_area.find('.navbar');

			$(window).scroll(function(){
				if( main_area.hasClass('navbar-sticky') && ($(this).scrollTop() <= 100 || $(this).width() <= 750)){
					main_area.removeClass('navbar-sticky').appendTo(header_area);
					header_area.css('height', 'auto');
				}else if( !main_area.hasClass('navbar-sticky') && $(this).width() > 750 && $(this).scrollTop() > 400 ){
					header_area.css('height', header_area.height());
					main_area.css({'opacity': '0'}).addClass('navbar-sticky');
					main_area.appendTo($('body')).animate({'opacity': 1});
				}
			});

		});

		$(window).trigger('resize');
		$(window).trigger('scroll');
  });
  
  //============================== SELECT BOX =========================
  var select_drop = $(".select-drop");

  if (select_drop.length !== 0 && typeof $.fn.selectbox === 'function'){
    select_drop.selectbox();
  }

  //============================== header =========================

  $('.navbar a.dropdown-toggle').on('click', function(e) {
		var elmnt = $(this).parent().parent();
		if (!elmnt.hasClass('navbar-nav')) {
			var li = $(this).parent();
			var heightParent = parseInt(elmnt.css('height').replace('px', ''),10) / 2;
			var widthParent = parseInt(elmnt.css('width').replace('px', ''),10) - 10;

			if(!li.hasClass('show')){li.addClass('show');}
			else{ li.removeClass('show');}
			$(this).next().css('top', heightParent + 'px');
			$(this).next().css('left', widthParent + 'px');

			return false;
		}
	});

  //============================== ALL DROPDOWN ON HOVER =========================
  if($('.navbar').width() > 750){
		$('.navbar-nav .dropdown').hover(function() {
			$(this).addClass('show');
		},
		function() {
			$(this).removeClass('show');
		});
	}

  //============================== MAIN SLIDER =========================
  var $heroSlider = $( '.main-slider .inner' );
  if ( $heroSlider.length > 0 && typeof $.fn.owlCarousel === 'function' ) {
    $heroSlider.each( function () {

    var loop = $(this).parent().data('loop'),
        autoplay = $(this).parent().data('autoplay'),
        interval = $(this).parent().data('interval') || 3000;

      $(this).owlCarousel({
        items: 1,
        loop: loop,
        margin: 0,
        nav: true,
        dots: true,
        navText: [  ],
        autoplay: false,
        autoplayTimeout: interval,
        autoplayHoverPause: true,
        smartSpeed:700
      });
    });
  }

  var heroSliderRtl = $('.rtl .main-slider .inner');

  if (heroSliderRtl.length !== 0 && typeof $.fn.owlCarousel === 'function') {
    heroSliderRtl.owlCarousel({
      rtl: true
    });
  }

  //============================== MAIN SLIDER RESIZE =========================
  function resizeContentMobile() {
    var height = $(window).height() - 119;
    $('.slideResize').height(height);
  }
  resizeContentMobile();

  function resizeContent() {
    var height = $(window).height() - 159;
    $('.slideResize').height(height);
  }
  resizeContent();

  if ($(window).width() < 768) {
    resizeContentMobile();
  }
  else {
    resizeContent();
  }

  $(window).resize(function() {
    resizeContent();
    resizeContentMobile();
  });

  //============================== OWL-CAROUSEL =========================
  var owl = $('.owl-carousel.partnersLogoSlider');

  if(owl.length !== 0 && typeof $.fn.owlCarousel === 'function'){
    owl.owlCarousel({
			loop:true,
      margin:28,
      autoplay:true,
      autoplayTimeout:6000,
      autoplayHoverPause:true,
      nav:true,
      dots: false,
      smartSpeed:500,
      responsive:{
        320:{
          slideBy: 1,
          items:1
        },
        768:{
          slideBy: 1,
          items:3
        },
        992:{
          slideBy: 1,
          items:4
        }
      }
    });
  }


  var expartSlider = $('.owl-carousel.expartSlider');

  if(expartSlider.length !== 0 && typeof $.fn.owlCarousel === 'function'){
    expartSlider.owlCarousel({
			loop:true,
      margin:28,
      autoplay:false,
      autoplayTimeout:6000,
      autoplayHoverPause:true,
      nav:false,
      dots: true,
      smartSpeed:400,
      responsive:{
        320:{
          slideBy: 1,
          items:1
        },
        768:{
          slideBy: 1,
          items:3
        },
        992:{
          slideBy: 1,
          items:4
        }
      }
    });
  }

  // dotsEach: 5
  var productSlider = $('.owl-carousel.productSlider');

  if(productSlider.length !== 0 && typeof $.fn.owlCarousel === 'function'){
    productSlider.owlCarousel({
      loop:true,
      items: 1,
      margin:28,
      autoplay:false,
      autoplayTimeout:6000,
      autoplayHoverPause:true,
      nav:true,
      dots: false,
      smartSpeed:700,
    });
  }

  $( '.owl-dot' ).on( 'click', function() {
    owl.trigger('to.owl.carousel.expartSlider', [$(this).index(), 300]);
    $( '.owl-dot' ).removeClass( 'active' );
    $(this).addClass( 'active' );
  })


  //============================== EXPERT SLIDER =========================
  $('#myCarousel').carousel({
    interval: 3000,
     cycle: true
   });

   //============================== BACK TO TOP =========================
   $(window).scroll(function(){
     if ($(this).scrollTop() > 10) {
       $('.backToTop').css('opacity', 1);
     } else {
       $('.backToTop').css('opacity', 0);
     }
   });

   //============================== BACK TO TOP SMOOTH SCROLL=========================
  $('a[href="#pageTop"]').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('html, body').animate({ scrollTop: 0 }, 1500);
      return false;
  });

  //============================== SMOOTH SCROLLING TO SECTION =========================
  $('.scrolling').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var target = $(this).attr('href');
    if ($(target).length) {
      $('html, body').animate({ scrollTop: $(target).offset().top - 150 }, 800);
    }
  });

  //============================== DATE-PICKER =========================
  var datepicker = $('.datepicker');

  if (datepicker.length !== 0 && typeof $.fn.datepicker === 'function') {
    datepicker.datepicker({
      startDate: 'dateToday',
      autoclose: true
    });
  }

  //============================== COUNT DOWN =========================

  var simple_timer = $('#simple_timer');

  if (simple_timer.length !== 0 && typeof $.fn.syotimer === 'function') {
    simple_timer.syotimer({
      year: 2021,
      month: 10,
      day: 10,
      hour: 20,
      minute: 30
    });
  }

  /*======== 11.PRICE SLIDER RANGER  ========*/
  var nonLinearStepSlider = document.getElementById('slider-non-linear-step');
  if(nonLinearStepSlider && typeof noUiSlider !== 'undefined'){
    noUiSlider.create(nonLinearStepSlider, {
      connect: true,
      start: [12, 300],
      range: {
          'min': [12],
          'max': [300]
      }
    });
  }

  var sliderValue = [
    document.getElementById('lower-value'), // 0
    document.getElementById('upper-value')  // 1
  ];

  // Display the slider value and how far the handle moved
  // from the left edge of the slider.
  var priceRange = document.getElementById('price-range');
  if (priceRange) {
    nonLinearStepSlider.noUiSlider.on('update', function(values, handle) {
      sliderValue[handle].innerHTML = '$' + Math.floor(values[handle]);
    });
  }


  //============================== BOOTSTRAP CAROUSEL SWIEP =========================
  $('#productSlider, #thubmnailTeamSlider').on('touchstart', function(event){
      var xClick = event.originalEvent.touches[0].pageX;
      $(this).one('touchmove', function(event){
          var xMove = event.originalEvent.touches[0].pageX;
          if( Math.floor(xClick - xMove) < -5 ){
              $('#productSlider, #thubmnailTeamSlider').carousel('prev');
          }
          else if( Math.floor(xClick - xMove) > 5 ){
              $('#productSlider, #thubmnailTeamSlider').carousel('next');
          }
      });
      $('.carousel').on('touchend', function(){
              $(this).off('touchmove');
      });
  });

  //============================== BOOTSTRAP THUMBNAIL SLIDER =========================
  $('#thubmnailTeamSlider').carousel({
    interval: 3000
  });

  $('#productSlider').carousel({
    rtl: true
  });

  $('#thubmnailTeamSlider .carousel-item').each(function(){
      var itemToClone = $(this);
      for (var i=1;i<4;i++) {
        itemToClone = itemToClone.next();

          if (!itemToClone.length) {
              itemToClone = $(this).siblings(':first');
            }

        itemToClone.children(':first-child').clone()
        .addClass('cloneditem-'+(i))
        .appendTo($(this));
      }
  });

  //============================== SINGLE SERVICE LEFT TAB =========================
  $('#singleServiceTab a').on('click', function (e) {
    e.preventDefault();
    $(this).tab('show');
    $('.nav-stacked li a i').addClass('fa-angle-down').removeClass('fa-angle-up');
    $(this).find('i').toggleClass('fa-angle-up fa-angle-down');
  });

  $('.nav-stacked li a').on('click', function() {
    $('.tabList').removeClass('active openTab');
    $(this).parent('.tabList').addClass('active openTab');
  });

  $('.nav-stacked li .dropdown-menu li a').on('click', function (e) {
    $('.tabList').removeClass('active openTab');
    $(this).closest('.nav-stacked li.tabList').addClass('active openTab');
  });

  //============================== ACCRODION =========================
  $('.content-collapse li').on('click', function () {
      $(this).toggleClass('active').siblings().removeClass('active');
  });

});


$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="popover"]').popover();

 // favourite-icon
 $('.favourite-icon .icon').on('click', function () {
  $(this).find('i').toggleClass('fa-heart');
  $(this).find('i').toggleClass('fa-heart-o');
});

//============================== fANCYMORPH =========================
var data_morphing = $('[data-morphing]');

if (data_morphing.length !== 0) {
  data_morphing.fancyMorph({
    hash : 'morphing'
  });
}

// =========================== Contact Form =========================
$('#angelContactForm').submit(function(e){
  var contactdata  =  $(this).serializeArray();
  var submiturl    =  $(this).attr('action');
  var submitbtn 	 =  $('#contact-submit-btn');
  submitbtn.val('Sending...');
  $('#angelContactForm :input').prop('disabled', true);
  $.ajax({
    url: submiturl,
    type: 'POST',
    dataType: 'json',
    data : contactdata,
    success: function(response){
      $('#alert').removeClass('alert alert-success');
      $('#alert').removeClass('alert alert-danger');
      if(response.status=== 'true'){
        $('#alert').addClass('alert alert-success');
        $('#angelContactForm :input').prop('disabled', false);
        $('#angelContactForm')[0].reset();
        submitbtn.val('Send');
      }else{
        $('#alert').addClass('alert alert-danger');
        $('#angelContactForm :input').prop('disabled', false);
        submitbtn.val('Send');
      }
      $('#alert').html(response.message).slideDown();
      window.setTimeout(function() {
        $('#alert').alert('close'); }, 3000);
      }
    });
    e.preventDefault();
  });

  // =========================== Contact Form =========================
  $('#angelContactForm').submit(function(e){
    var contactdata  =  $(this).serializeArray();
    var submiturl    =  $(this).attr('action');
    var submitbtn 	 =  $('#contact-submit-btn');
    submitbtn.val('Sending...');
    $('#angelContactForm :input').prop('disabled', true);
    $.ajax({
      url: submiturl,
      type: 'POST',
      dataType: 'json',
      data : contactdata,
      success: function(response){
        $('#alert').removeClass('alert alert-success');
        $('#alert').removeClass('alert alert-danger');
        if(response.status=== 'true'){
          $('#alert').addClass('alert alert-success');
          $('#angelContactForm :input').prop('disabled', false);
          $('#angelContactForm')[0].reset();
          submitbtn.val('Send');
        }else{
          $('#alert').addClass('alert alert-danger');
          $('#angelContactForm :input').prop('disabled', false);
          submitbtn.val('Send');
        }
        $('#alert').html(response.message).slideDown();
        window.setTimeout(function() {
          $('#alert').alert('close'); }, 3000);
        }
      });
      e.preventDefault();
    });

    // =========================== Appoinment Form =========================
  $('#appoinmentModalForm').submit(function(e){
    var contactdata  =  $(this).serializeArray();
    var submiturl    =  $(this).attr('action');
    var submitbtn 	 =  $('#appointment-submit-btn');
    submitbtn.val('Sending...');
    $('#appoinmentModalForm :input').prop('disabled', true);
    $.ajax({
      url: submiturl,
      type: 'POST',
      dataType: 'json',
      data : contactdata,
      success: function(response){
        $('#appointment-alert').removeClass('alert alert-success');
        $('#appointment-alert').removeClass('alert alert-danger');
        if(response.status=== 'true'){
          $('#appointment-alert').addClass('alert alert-success');
          $('#appoinmentModalForm :input').prop('disabled', false);
          $('#appoinmentModalForm')[0].reset();
          submitbtn.val('Send');
        }else{
          $('#appointment-alert').addClass('alert alert-danger');
          $('#appoinmentModalForm :input').prop('disabled', false);
          submitbtn.val('Send');
        }
        $('#appointment-alert').html(response.message).slideDown();
        window.setTimeout(function() {
          $('#appointment-alert').alert('close');
        }, 3000);
      }
    });
    e.preventDefault();
  });

  
  $(document).ready(function(e) {
    $(".showonhover").click(function(){
      $("#selectfile").trigger('click');
    });
  });
