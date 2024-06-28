/////////////////////// ready
$(document).ready(function() {
  /*----------------------------------------------------*/
  // Superfish menu.
  /*----------------------------------------------------*/
  $('.sf-menu').superfish();

  /*----------------------------------------------------*/
  // Superslides
  /*----------------------------------------------------*/
  var height = $(window).height();
  $('#slides_wrapper').height(height);

  var o = $('#slides');
  if (o.length > 0) {
    o.superslides({
      play: 7000,
      animation: 'fade', // slide
      pagination: true,
      inherit_height_from: '#slides_wrapper',
    });
  };


  /*----------------------------------------------------*/
  // Scroll
  /*----------------------------------------------------*/
  $(".scroll-to").bind('click',function(event){

      $("html, body").animate({
        scrollTop: $($(this).attr("href")).offset().top
      }, {
          duration: 1200,
          easing: "easeInOutExpo"
      });

      event.preventDefault();
  });

  /*----------------------------------------------------*/
  // Audio
  /*----------------------------------------------------*/
  var o = $('.audio1 audio');
  if (o.length > 0) {
    o.mediaelementplayer({
      features: ['prevtrack', 'playpause', 'nexttrack', 'progress', 'current', 'volume', 'playlistfeature']
    });
    $('.audio1 .mejs-prevtrack-button').addClass('mejs-cust1-button');
    $('.audio1 .mejs-nexttrack-button').addClass('mejs-cust2-button');
  };

  var o = $('.audio2 audio');
  if (o.length > 0) {
    o.mediaelementplayer({
      features: ['playpause','progress']
    });
  };

  var o = $('.audio3 audio');
  if (o.length > 0) {
    o.mediaelementplayer({
      features: ['playpause']
    });
  };

  var o = $('.audio4 audio');
  if (o.length > 0) {
    o.mediaelementplayer({
      features: ['playpause','progress']
    });
  };

  // Accordion.
  var o = $(".accordion");
  if (o.length > 0) {
    o.accordion({
      active: 0,
      heightStyle: "content"
    });
  };

  // Animate number.
  var o = $('.animated-number');
  if (o.length > 0) {
    o.appear(function() {
      var elem = $(this);
      var b = elem.text();
      var d = elem.data('duration');
      var animationDelay = elem.data('animation-delay');
      if ( !animationDelay ) { animationDelay = 0; }
      elem.text("0");

      setTimeout(function(){
        elem.animate({ num: b }, {
          duration: d,
          step: function (num){
            this.innerHTML = (num).toFixed(0)
          }
        });
      }, animationDelay);
    });
  };

  /*----------------------------------------------------*/
  // owlCarousel
  /*----------------------------------------------------*/
  var o = $('.owl-carousel-testimonials');
  if (o.length > 0) {
    o.owlCarousel({
      items: 1,
      loop: true,
      margin: 30
    });
  };





















});

/////////////////////// load
$(window).on('load', function () {



});