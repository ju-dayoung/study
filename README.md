# Swiper 컨텐츠와 탭 같이 움직이기

## Step1 마크업 작업

소스불러오기

```
/* head 안에 */
<script src="./js/jquery-1.12.4.min.js"></script>
<script src="./js/swiper.js"></script>
<link rel="stylesheet" href="./css/swiper.css">
```

컨텐츠 영역이 될 swiper 마크업

```
<div class="swiper-container">
	<div class="swiper-wrapper">
		<div class="swiper-slide"><span>HOME</span></div>
		<div class="swiper-slide"><span>01</span></div>
		<div class="swiper-slide"><span>02</span></div>
		<div class="swiper-slide"><span>03</span></div>
		<div class="swiper-slide"><span>04</span></div>
		<div class="swiper-slide"><span>05</span></div>
		<div class="swiper-slide"><span>06</span></div>
		<div class="swiper-slide"><span>07</span></div>
		<div class="swiper-slide"><span>08</span></div>
	</div>
</div>
```

탭(gnb) 작업

```
<div class="gnb">
	<ul class="gnb-list">
		<li class="gnb-list-item is-active"><a href="javascript:void(0);" class="gnb-list-link">HOME</a></li>
		<li class="gnb-list-item"><a href="javascript:void(0);" class="gnb-list-link">01</a></li>
		<li class="gnb-list-item"><a href="javascript:void(0);" class="gnb-list-link">02</a></li>
		<li class="gnb-list-item"><a href="javascript:void(0);" class="gnb-list-link">03</a></li>
		<li class="gnb-list-item"><a href="javascript:void(0);" class="gnb-list-link">04</a></li>
		<li class="gnb-list-item"><a href="javascript:void(0);" class="gnb-list-link">05</a></li>
		<li class="gnb-list-item"><a href="javascript:void(0);" class="gnb-list-link">06</a></li>
		<li class="gnb-list-item"><a href="javascript:void(0);" class="gnb-list-link">07</a></li>
		<li class="gnb-list-item"><a href="javascript:void(0);" class="gnb-list-link">08</a></li>
	</ul>
</div>
```

## Step2 CSS 작업

(reset.css가 있다는 가정하에)

```
.design{ position:relative; max-width:750px; width:100%; margin:0 auto; padding-top:40px; border:1px solid #ccc; }

.gnb{ overflow-x: auto; -webkit-overflow-scrolling: touch; background: #fff; }
.gnb .gnb-list{ overflow-x:auto; text-align:center; font-size:0; white-space:nowrap; -webkit-overflow-scrolling: touch; }

.gnb .gnb-list-item{ position:relative; display:inline-block; vertical-align:top; height:40px; padding:0 40px; font-size:16px; line-height:40px;}
.gnb .gnb-list-item.is-active{ border-bottom:3px solid #f00; }
.gnb .gnb-list-link{ display:block; }

.design .swiper-slide{ position:relative; width:100%; height:500px; background-color:#ccc; text-align:center; }

```
-webkit-overflow-scrolling: touch;는 모바일에서만 작동하는 css
리스트 아이템 바깥 요소에 white-space:nowrap; 로 한줄 만들기

## Step3 swiper 플러그인 붙이기 작업

swiper 옵션 설정

```
var swiper = new Swiper('.design .swiper-container', {
	slidesPerView: 'auto', 
	spaceBetween: 15,
	cssWidthAndHeight: true, 
	autoResize: false, 
	paginationClickable: true,
	autoplayDisableOnInteraction: false,
	observer: true,
	observeParents: true,
});
```


## Step4 터치이벤트 추가

### 1. 탭이 가운데로 움직이는 작업


이벤트 추가
```
// swiper on 초기화 후 사용으로 작업
swiper.on('slideChange', function(){
	var swiperIndex = this.activeIndex;
	tabMove(swiperIndex);
});
// gnb 
gnbLink.on('click', function(){
	var gnbIndex = $(this).parent().index();
	tabMove(gnbIndex);
});
```

swiper on 초기화 후 사용으로 작업 

최종
```

function tabMove(index){
	gnbItem.removeClass('is-active');
	gnbItem.eq(index).addClass('is-active');
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
```




