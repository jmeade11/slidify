(function( $ ) {
  $.fn.slidify = function(slides, options) {

    if (this.length === 0 || slides.length === 0) {
      return this;
    }

    const defaults = {
      height: '100vh',
      captions: true,
      captionPosition: 'bottom',
      indicatorDots: true
    };

    const slider = {};

    const el = this;

    const init = function() {
      slider.settings = $.extend({}, defaults, options);
      slider.slideIndex = 0;
      slider.slides = slides;
      slider.lastSlide = slider.slides.length - 1;
      slider.controls = {};
      slider.slideEls = {};
      slider.indicatorEls = {};
      setUp();
    }  
    
    const setUp = function() {
      let sliderhtml = '';
      let indicatorDots = '';
      
      for (let i = 0; i<=slider.lastSlide; i++) {
        sliderhtml += '<div class="slide"'+(slider.settings.indicatorDots ? ' style="height: calc(100% - 2.5rem)"' : '')+'>'+
          '<img src="'+slider.slides[i].image+'">'+
          (slider.settings.captions ? '<div class="caption">'+slider.slides[i].caption+'</div>' : '') +
          '</div>';
      }
      
      sliderhtml += '<button class="prev">&#10094;</button><button class="next">&#10095;</button>';
      
      if (slider.settings.indicatorDots) {
        for (let i = 0; i <= slider.lastSlide; i++) { 
          indicatorDots += '<span class="dot"></span>';
        }
        sliderhtml += '<div class="indicator">'+indicatorDots+'</div>';
      }
    
      el.append(sliderhtml);
      
      slider.indicatorEls = el[0].querySelectorAll('.dot');
      
      slider.slideEls = el.find('.slide');
      
      initControls();
      
      setActiveIndicator();
      
    }
    
    const initControls = function() {
      slider.controls.next = el.find('.next');
      slider.controls.next.on('click touchend', goToNext);
      slider.controls.prev = el.find('.prev');
      slider.controls.prev.on('click touchend', goToPrev);
      slider.controls.indicators = el.find('.dot');
      slider.controls.indicators.on('click touchend', goToSlide);
    }
    
    const goToNext = function(e) {
      e.preventDefault();
      
      if (slider.slideIndex !== slider.lastSlide) {
        ++slider.slideIndex;
      }

      slider.slideEls.css('transform','translateX(-'+slider.slideIndex * 100+'%)');
      
      setActiveIndicator();
    }
    
    const goToPrev = function(e) {
      e.preventDefault();
      
      if (slider.slideIndex !== 0) {
        --slider.slideIndex;
      }

      slider.slideEls.css('transform','translateX(-'+slider.slideIndex * 100+'%)');
    
      setActiveIndicator();
    }
    
    const goToSlide = function(e) {
      e.preventDefault();
      
      slider.slideIndex = $(this).index();
      
      slider.slideEls.css('transform','translateX(-'+slider.slideIndex * 100+'%)');
      
      setActiveIndicator();
    }
    
    const setActiveIndicator = function() {
      for (let i = 0; i < slider.indicatorEls.length; i++) {       
        
        slider.indicatorEls[i].classList.remove('active');
        
        if (i === slider.slideIndex) {
          slider.indicatorEls[i].classList.add('active');
        }
 
      } 
    }
    
    init();

    return this.css({
      height: slider.settings.height
    });
    
  };

}( jQuery ));
