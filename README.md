# Swiper 컨텐츠와 탭 같이 움직이기

## Step.1 마크업 작업

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

## Step.2 CSS 작업

(reset.css가 있다는 가정하에)

```
.design{ position:relative; max-width:750px; width:100%; margin:0 auto; padding-top:40px; border:1px solid #ccc; }
.design .swiper-slide{ position:relative; width:100%; height:500px; background-color:#ccc; text-align:center; }

.gnb{ overflow-x: auto; -webkit-overflow-scrolling: touch; background: #fff; }
.gnb .gnb-list{ overflow-x:auto; text-align:center; font-size:0; white-space:nowrap; -webkit-overflow-scrolling: touch; }

.gnb .gnb-list-item{ position:relative; display:inline-block; vertical-align:top; height:40px; padding:0 40px; font-size:16px; line-height:40px;}
.gnb .gnb-list-item.is-active{ border-bottom:3px solid #f00; }
.gnb .gnb-list-link{ display:block; }
```
-webkit-overflow-scrolling: touch;는 모바일에서만 작동하는 css
리스트 아이템 바깥 요소에 white-space:nowrap; 로 한줄 만들기

## Step.3 swiper 플러그인 붙이기 작업

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

![guide1](https://user-images.githubusercontent.com/20235117/104144059-41c60c00-5405-11eb-941b-94271abebf73.png)
처음 로딩된 후 화면


## Step.4 터치이벤트 추가

### 1. 탭이 가운데로 움직이는 작업

1-1. 이벤트 추가
```
// gnb 변수 선언
var gnb = $('.gnb'),  
    gnbList = $('.gnb-list'),
    gnbItem = $('.gnb-list-item'),
    gnbLink = $('.gnb-list-link');

// swiper event slide on change 작업
swiper.on('slideChange', function(){
	// 공통으로 사용하는 함수
});

// gnb link 클릭시 이벤트 작동 
gnbLink.on('click', function(){
	// 공통으로 사용하는 함수
});
```

```
swiper.on('slideChange', function(){
	var swiperIndex = this.activeIndex;
	// 기본 내장된 this.activeIndex 메소드로 index 받아온다
	tabMove(swiperIndex);
});
gnbLink.on('click', function(){
	var gnbIndex = $(this).parent().index();
	// 
	tabMove(gnbIndex);
});
```

1-2. 함수와 인자 

```
function tabMove(index){
	// 몇번째 item이 active될지 함수에서 index 인자값을 가져온다.
	
	gnbItem.removeClass('is-active');
	// .gnb-list-item 엘리먼트에서 is-active 일괄 삭제
	
	gnbItem.eq(index).addClass('is-active');
	// 인자값으로 받아온 .gnb-list-item에 is-active 추가
	
	var gnbW = gnb.width(),
	// 전체를 감싸는 gnb의 가로값
	
	scrollLeft = (function(){
		var w = 0; // w 초기화
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
	// .gnb-list에 scrollLeft 애니메이션으로 tab이동
}
```

![guide2](https://user-images.githubusercontent.com/20235117/104149801-f7e82080-541a-11eb-8233-19500b779a2f.png)

최종

![ezgif-6-bff50332b7de](https://user-images.githubusercontent.com/20235117/106103993-20934880-6185-11eb-85f2-23009ce6feef.gif)

