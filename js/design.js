var swiper = new Swiper('.design .swiper-container', {
	slidesPerView: 'auto',
	spaceBetween: 5,
	cssWidthAndHeight: true,
	autoResize: false,
	paginationClickable: true,
	autoplayDisableOnInteraction: false,
	observer: true,
	observeParents: true,
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable:true,
		renderBullet: function (index, className) {
			if (index === 0 ){
				return '<li class="gnb-list-item ' + className + '">HOME</li>';
			} else if ( index < 10 && 0 < index)  {
				return '<li class="gnb-list-item ' + className + '">0' + index + '</li>';
			} else {
				return '<li class="gnb-list-item ' + className + '">' + index + '</li>';
			}
		}
	 },
});

var gnb = $('.gnb'),
	gnbList = $('.gnb-list'),
	gnbItem = $('.gnb-list-item'),
	gnbLink = $('.gnb-list-link');

swiper.on('slideChange', function(){
	var swiperIndex = this.activeIndex;
	tabMove(swiperIndex);
});

function tabMove(index){
	gnbItem.removeClass('swiper-pagination-bullet-active');
	gnbItem.eq(index).addClass('swiper-pagination-bullet-active');

	var gnbW = gnb.width(),
	scrollLeft = (function(){
		var w = 0;
		gnbItem.each(function(i){
			if (index > i){
				w = w + $(this).outerWidth();
			} else if (index === i){
				w = w + ( $(this).outerWidth() / 2 );
			}
		});
		return w;
	})() - ( gnbW / 2 );
	gnbList.animate({
		'scrollLeft' : scrollLeft
	}, 300);
}

/*
	var $gnbBar = $('.gnb-bar');
	if ($gnbBar.length){
		var $gnb = $gnbBar.find('.gnb'),
			$gnbItem = $gnbBar.find('.gnb-list__item'),
			$gnbLink = $gnbBar.find('.gnb-list__link'),
			headerH = $lHeader.outerHeight();

		$gnbBar
			.css({
				'top' : headerH
			})
			.aritaumSticky({
				addiHeight : headerH
			});

		var preScrollTop = $win.scrollTop(),
			gnbTop = 0;

		function gnbScroll(forceTop){
			var scrollTop = $win.scrollTop(),
				maxScrollTop = $doc.outerHeight() - $win.height(),
				minScrollTop = 0;

			if ($abbDownBnn.length && !$abbDownBnn.is(':hidden')){
				minScrollTop = $abbDownBnn.outerHeight();
			}

			if (scrollTop < 0 || forceTop === true){
				gnbTop = 0;
				if (!$gnbBar.is(':animated')){
					$gnbBar.stop().animate(
						{
							translateY: gnbTop
						},
						{
							duration : 200,
							step : function(now, fx) {
								if (fx.prop === 'translateY'){
									$(this).css({
										'-webkit-transform' : 'translateY('+now+'px) translateZ(0)',
										'transform' : 'translateY('+now+'px) translateZ(0)'
									});
								}
							}
						}
					);
					$lHeader.stop().animate(
						{
							translateY: gnbTop
						},
						{
							duration : 200,
							step : function(now, fx) {
								if (fx.prop === 'translateY'){
									$(this).css({
										'-webkit-transform' : 'translateY('+now+'px) translateZ(0)',
										'transform' : 'translateY('+now+'px) translateZ(0)'
									});
								}
							}
						}
					);
				}
			} else if (!$('html').hasClass('is-anchor-scrolling') && !$('html').is(':animated') && !$('body').is(':animated') && !$gnbBar.is(':animated') && scrollTop >= 0 && scrollTop < maxScrollTop){
				gnbTop = gnbTop + (preScrollTop - scrollTop);

				if (gnbTop > 0 || scrollTop < minScrollTop){
					gnbTop = 0;
				} else if (gnbTop < -headerH) {
					gnbTop = -headerH;
				}

				$gnbBar.stop().prop('translateY', gnbTop).css({
					'-webkit-transform' : 'translateY('+gnbTop+'px) translateZ(0)',
					'transform' : 'translateY('+gnbTop+'px) translateZ(0)'
				});
				$lHeader.stop().prop('translateY', gnbTop).css({
					'-webkit-transform' : 'translateY('+gnbTop+'px) translateZ(0)',
					'transform' : 'translateY('+gnbTop+'px) translateZ(0)'
				});

				var optionHeight = gnbHeight + (headerH + gnbTop);

				$mainFlickPage.get(0).aritaumFlickPage.options.scrollOtherHeight = optionHeight;
				$('.select-title__link').data('addi-height', optionHeight);
			}

			preScrollTop = scrollTop;
		}
		gnbScroll();

		$win.on('scroll.aritaumUIMainGNBScroll', gnbScroll);

		$doc.on('click.aritaumUIMainGNBScroll', '.js-page-top', function(e){
			gnbScroll(true);
		});

		 $mainFlickPage 
			.on('loadFlickPage.aritaumUIMain changeFlickPage.aritaumUIMain', function(e, $slide, index, name){
				$gnbItem.removeClass('is-active');
				$gnbItem.filter(function(){
					return $(this).find('[data-main-tab="'+name+'"]').length;
				}).addClass('is-active');

				var gnbW = $gnb.width(),
					scrollLeft = (function(){
						var w = 0;
						$gnbItem.each(function(i){
							if (index > i){
								w = w + $(this).outerWidth();
							} else if (index === i){
								w = w + ( $(this).outerWidth() / 2 );
							}
						});
						return w;
					})() - ( gnbW / 2 );

				if (e.type === 'loadFlickPage'){
					$gnb.scrollLeft(scrollLeft);
				} else {
					$gnb.stop().animate({
						'scrollLeft' : scrollLeft
					}, 300);
				}
			})
			.on('afterChangeFlickPage.aritaumUIMain', function(e, $slide, index, name){
				var scrollTop = $win.scrollTop(),
					maxScrollHeight = $doc.height() - $win.height(),
					optionHeight = $mainFlickPage.get(0).aritaumFlickPage.options.scrollOtherHeight;

				if (optionHeight >= maxScrollHeight){
					$mainFlickPage.get(0).aritaumFlickPage.options.scrollOtherHeight = 0;
					optionHeight = 0;
					gnbScroll(true);
				}

				$('.select-title__link').data('addi-height', optionHeight);
			});

		$gnbLink.on('click.aritaumUIMain', function(){
			var checkName = $(this).data('main-tab'),
				index = 0;

			$.each(aritaumUIMainPages, function(i){
				var name = this.name || i;
				if (name === checkName){
					index = i;
				}
			});
			$mainFlickPage.aritaumFlickPage('pageTo', index);
		});
	}
*/