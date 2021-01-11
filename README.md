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

// -webkit-overflow-scrolling: touch;는 모바일에서만 작동하는 css
// 리스트 아이템 바깥 요소에 white-space:nowrap; 로 한줄 만들기

.gnb .gnb-list-item{ position:relative; display:inline-block; vertical-align:top; height:40px; padding:0 40px; font-size:16px; line-height:40px;}
.gnb .gnb-list-item.is-active{ border-bottom:3px solid #f00; }
.gnb .gnb-list-link{ display:block; }

.design .swiper-slide{ position:relative; width:100%; height:500px; background-color:#ccc; text-align:center; }

```

## Step3 swiper 플러그인 붙이기 작업

설정

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

이벤트 추가

```
swiper.on('slideChange', function(){
	var swiperIndex = this.activeIndex;
	tabMove(swiperIndex);
});
gnbLink.on('click', function(){
	var gnbIndex = $(this).parent().index();
	tabMove(gnbIndex);
});
```

## Step4 터치이벤트 추가

```






































```
<script>

	var whiskTheRefrigerator = {
		title : '주말 냉장고 털기 PROJECT', 
		cool : ['로메인상추', '양상추', '느타리 버섯', '청경채', '배추', '깻잎', '양파', '계란', '김치', '시금치무침', '당근샐러드', '바질페스토', '씨겨자', '딸기', '요거트', '밤잼' ],
		cold :  ['샤브샤브고기', '얼음', '감태', '새우', '토르텔리니', '닭가슴살', '식빵'],
		etc : ['바나나', '그래놀라', '귤'],
	}

	var friDinner;

	var satMorning;
	var satLunch;
	var satDinner;

	var sunMorning;
	var sunLunch;
	var sunDinner;

</script>

```
