(function($, window){
    var starBucks = {
        init: function(){
            this.header();
            this.section1();
            this.section2notice();
            this.section2Slide();
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.section7();
            this.section8();
            //this.section9();
            this.goTop();
            this.quickMenu();
        },
        header: function(){

            //모바일 버튼 이벤트
            $('.berger-btn').on({
                click: function(){
                    $('#mobileNav').addClass('addMobile');
                    $('.mobile-container').stop().animate({left:0}, 400);
                }
            });

            //모바일 닫기
            $('.mobile-close').on({
                click: function(){                
                    $('.mobile-container').stop().animate({left:110+'%'}, 400, function(){
                        $('#mobileNav').removeClass('addMobile');
                    });                
                }
            });

            //모바일 메뉴버튼 이벤트 > 서브메뉴 펼치기
            $('.mobile-container li a').on({
                click: function(){
                    $(this).toggleClass('addMobile');
                    $(this).next('div').slideToggle(300);
                    $('.mobile-container li a.none-sub').removeClass('addMobile');
                }
            });
        

            //통합검색버튼 클릭이벤트
            $('.find-btn').on({
                click: function(){
                    // $('.find-box').addClass('addInput');
                    $('.find-box').toggleClass('addInput');
                }
            });

            //네비게이션 : 애니메이션 마우스이벤트
            $('.main-btn').on({
                mouseenter: function(){
                    $('.main-btn').removeClass('addCurrent');
                    $(this).addClass('addCurrent');
                    $('.sub').stop().slideUp(0);
                    $(this).next().stop().slideDown(400,'easeOutExpo');
                },
                focusin: function(){
                    $('.main-btn').removeClass('addCurrent');
                    $(this).addClass('addCurrent');
                    $('.sub').stop().slideUp(0);
                    $(this).next().stop().slideDown(600,'easeOutExpo');
                }
            });

            //네비게이션 : 마우스가 떠나면 모두 초기화
            $('#nav').on({
                mouseleave: function(){
                    $('.main-btn').removeClass('addCurrent');
                    $('.sub').stop().slideUp(400,'easeOutExpo');
                }
            });

        },
        section1: function(){
            //애니메이션 페이드인 효과
            function ani(){
                $('.img').eq(0).stop().animate({opacity:1},600, function(){
                    $('.img').eq(1).stop().animate({opacity:1},600, function(){
                        $('.img').eq(2).stop().animate({opacity:1},600, function(){
                            $('.img').eq(3).stop().animate({opacity:1},600, function(){
                                $('.img').eq(4).stop().animate({opacity:1},600);
                            });
                        });
                    });
                });
            }

            setTimeout(ani, 600);
            
        },
        section2notice: function(){
            var cnt = 0;

            //1.메인슬라이드 함수
            function mainSlide(){
                $('.notice')                   .css({zIndex:1}).stop().animate({top:24},0);
                $('.notice').eq(cnt==0?4:cnt-1).css({zIndex:2}).stop().animate({top: 0},0);
                $('.notice').eq(cnt)           .css({zIndex:3}).stop().animate({top:24},0).animate({top:0},1000);
            }
            //2. 다음카운트 함수

            function nextCount(){
                cnt++;
                if(cnt>4){cnt=0}
                mainSlide();
            }

            //3. 자동타이머(셋인터발)
            function autoTimer(){
                setInterval(nextCount, 3000);
            }

            setTimeout(autoTimer, 100);

        },
        section2Slide: function(){
            var cnt = 0;
            var setId = null;
            var winW = $(window).innerWidth()*0.9; //창너비의 90%크기

            //반응형

            function resizeFn(){
                if( $(window).innerWidth()<=819 ){
                    winW = $(window).innerWidth()*0.9;
                }
                else{
                    winW = 819;
                }
                
                $('.slide').css({ width: winW }); //슬라이드 너비
                //mainSlide(); //실시간으로 메인슬라이드 연동반응
                $('.slide-wrap').stop().animate({left:-winW*cnt}, 0);
            }
            resizeFn();

            $(window).resize(function(){
                resizeFn();
            });

            //1. 메인슬라이드 함수
            function mainSlide(){
                console.log( cnt );
                $('.slide-wrap').stop().animate({left:-winW*cnt}, 600, function(){
                    if(cnt>2){cnt=0}
                    if(cnt<0){cnt=2}
                    $('.slide-wrap').stop().animate({left:-winW*cnt}, 0);
                    //슬라이드 번호별 스타일 적용 addClass
                    $('.slide').removeClass('addCurrent');   //밝아지는 효과 삭제
                    $('.slide').eq(cnt+1).addClass('addCurrent');   //밝아지는 효과 설정
                });
                pageEvent();
            }

            //2-1. 다음카운트 함수
            function nextCount(){
                cnt++;
                mainSlide();
            }
            //2-2. 이전카운트 함수
            function prevCount(){
                cnt--;
                mainSlide();
            }

            //3. 자동타이머(셋인터발)
            function autoTimer(){
                setId = setInterval(nextCount, 3000);
            }

            //autoTimer();

            //4. 페이지버튼 이벤트 함수
            //   효과적용 : 동그라미 색상 변경 현재 슬라이드에만 적용
            //   동그라미 이미지속성 src='' 값을 변경 속성 attribute 어트리뷰트
            //   현재 슬라이드의 페이지버튼 자식요소인 이미지 src='경로/이미지' 속성변경
            function pageEvent(){
                $('.page-btn')      .children().attr('src','./images/main_prom_off.png')
                $('.page-btn').eq(cnt==3?0:cnt).children().attr('src','./images/main_prom_on.png')
            }

            //5. 

            // $('.page-btn').eq(0).on({
            //     click: function(e){
            //         e.preventDefault();
            //         cnt = 0;
            //         mainSlide();
            //     }
            // })
            // $('.page-btn').eq(1).on({
            //     click: function(){
            //         e.preventDefault();
            //         cnt = 1;
            //         mainSlide();
            //     }
            // })
            // $('.page-btn').eq(2).on({
            //     click: function(){
            //         e.preventDefault();
            //         cnt = 2;
            //         mainSlide();
            //     }
            // })

            // 배열 반복처리
            $('.page-btn').each(function(idx){
                $(this).on({
                    click: function(e){
                        e.preventDefault();
                        cnt = idx;
                        mainSlide();
                    }
                });
            });

            // 6. 일시정지와 플레이버튼 클릭이벤트
            //    클래스 활용 hasClass() 메서드 이용 : true or false 반환
            //    클릭하여 선택한 요소에 해당 클래스가 있는지 없는지 검색
            //    true이면 있다
            //    false이면 없다

            function stopFn(){
                $('.play-btn').children().attr('src', './images/main_prom_play.png');
                           $('.play-btn').removeClass('on');  //삭제
                           //$('.play-btn').addClass('off'); //꺼짐 클래스 추가
                        //슬라이드정지
                           clearInterval(setId);
            }
            function playFn(){
                $('.play-btn').children().attr('src', './images/main_prom_stop.png');
                //$('.play-btn').removeClass('off');
                $('.play-btn').addClass('on');
            //슬라이드플레이
                autoTimer(); 
            }

               $('.play-btn').on({
                   click: function(e){
                       e.preventDefault();
                       //이버튼에 on 클래스가 있니? true이면 있다
                    //    var a=1   숫자   Integer
                    //    var b='1' 문자   String
                    //     console.log( 'a===b 결과 논리값까지 정확하게 비교', a===b); false
                    //     console.log( 'a==b 결과 형태만 비교해서 불정확', a==b);     true

                    //    console.log( $(this).hasClass('on') );
                      if( $(this).hasClass('on') === true ){   //참이면
                    //    if( $(this).is('on') ){
                        stopFn();
                       }
                       else{
                        playFn();    
                       }
                       
                   }
               });


            //7-1. 다음화살버튼 클릭 이벤트

            $('.next-btn').on({
                click: function(e){
                    e.preventDefault();
                    stopFn();
                    nextCount();   
                }
            });
            //7-2. 이전화살버튼 클릭 이벤트
            
            $('.prev-btn').on({
                click: function(e){
                    e.preventDefault();
                    stopFn();
                    prevCount();
                }
            });

            //8. 프로모션 버튼
            //   클릭하면 슬라이드 박스가 부드럽게 슬라이드업

            $('.promotion-btn').on({
                click: function(e){
                    e.preventDefault();

                    if( $(this).hasClass('close') ){     //오픈
                        $('#slide').stop().slideDown(600);
                        $(this).removeClass('close');
                        playFn();
                    }
                    else{                                //닫기
                        $('#slide').stop().slideUp(600);
                        $(this).addClass('close');
                        //정지
                        stopFn();
                        cnt=0;
                        //$('.slide-wrap').stop().animate({left:-819*cnt}, 0); 이렇게 해도 됨
                        mainSlide(); //처음으로 초기화
                    }

                    
                }
            });

            
            //슬라이드 랩 박스 위에 마우스가 올라가면 슬라이드 정지
            $('.slide-wrap').on({
                mouseenter: function(){
                    stopFn();
                },
                mouseleave: function(){
                    playFn();
                }
            });



            //슬라이드 컨테이너박스 위에 마우스가 떠나면 슬라이드 정지







            // 타이머를 중지시킨다
            // 타이머를 중지하려면 반드시 타이머 변수가 필요
            // 중지되면 이미지 아이콘 모양이 삼각형 플레이모양으로 변경
            // var t = 'on'; //토글기능 t=0 t='on'
            // //버튼을 누르면 t = 1 변경 클릭상태를 표시
            // //또한번 누르면 t = 0 변경 클릭상태를 표시(플레이상태)
            // $('.play-btn').on({
            //     click: function(e){
            //         e.preventDefault();
            //         if(t=='on'){   //0이면 플레이 상테
            //             t='off';    //정지상태
            //         clearInterval(setId);
            //         $(this).children().attr('src','./images/main_prom_play.png');
            //     }
            //     else if(t=='off'){
            //         t='on';           //정지상태
            //         autoTimer();   //플레이 재실행
            //         $(this).children().attr('src','./images/main_prom_stop.png');
            //     }
            //     }
            // });

        },
        section3: function(){

        },
        section4: function(){
            $(window).scroll(function(){
                if( $(window).scrollTop() == 0 ){
                    $('#section4').removeClass('addAni');
                }
                if( $(window).scrollTop() > 500 ){
                    $('#section4').addClass('addAni');
                }
                
            });
        },
        section5: function(){
            var sec3Top = $('#section3').offset().top-300;
            //스크롤이벤트  $(window).scroll() 스크롤탑값이($(window).scrollTop()) 섹션3의 탑값에 도달하면
            //섹션5의 addfadein 클래스 추가 addClass('addfadein')

            $(window).scroll(function(){
                if( $(window).scrollTop() == 0 ){
                    $('#section5').removeClass('addfadein');
                }
                if( $(window).scrollTop() >= sec3Top ){
                    $('#section5').addClass('addfadein');
                }
            });

        },
        section6: function(){
            var sec4Top = $('#section4').offset().top;
            $(window).scroll(function(){
                if( $(window).scrollTop() == 0 ){
                    $('#section6').removeClass('addAni');
                }
                if( $(window).scrollTop() >= sec4Top ){
                    $('#section6').addClass('addAni');
                }
            });

        },
        section7: function(){
            var sec6Top = $('#section6').offset().top-600;
            $(window).scroll(function(){
                if( $(window).scrollTop() == 0 ){
                    $('#section7').removeClass('addFade');
                }
                if( $(window).scrollTop() >= sec6Top ){
                    $('#section7').addClass('addFade');
                }
            });
        },
        section8: function(){
            var sec6Top = $('#section6').offset().top+200;

                $(window).scroll(function(){

                    if( $(window).scrollTop() == 0 ){
                        $('#section8').removeClass('addAni')
                    }
                    
                    if( $(window).scrollTop() >= sec6Top ){
                        $('#section8').addClass('addAni')
                    }

                });
                var leftW = $("#section8 .left").innerWidth();

                  function resize(){
                    leftW = $("#section8 .left").innerWidth();
                      if(leftW<=366){
                        $("#section8 .left").css({ height: leftW*0.85246 });
                      }
                      else{
                        $("#section8 .left").css({ height: 312 });
                      }
                  }

                  resize();

                  $(window).resize(function(){
                    resize();
                  });

          },
        //   section9: function(){
        //     var winH = $(window).height()-95; //반응형
        //     var bottomTop = $('#footer').offset().top-winH; //반응형


        //         //반응형
        //         function resizefn(){
        //           winH = $(window).height()-95;
        //           bottomTop = $('#footer').offset().top-winH;                      
        //         }
        //         resizefn();
                
        //         $(window).resize(function(){
        //           resizefn();
        //           sec9();
        //         });


        //         // 스크롤이벤트 조건부
        //         function sec9(){
        //           if( $(window).scrollTop() > bottomTop ){
        //               $('#section9').addClass('addSec9');
        //           }
        //           else{
        //               $('#section9').removeClass('addSec9');
        //           }
        //         }
        //         sec9();

        //         $(window).scroll(function(){
        //           sec9();
        //         });

        // },
        goTop: function(){

            $('.go-top').stop().fadeOut(1000);

            $(window).scroll(function(){
                if( $(window).scrollTop() >= 100 ){
                    $('.go-top').stop().fadeIn(1000);
                }
                else{
                    $('.go-top').stop().fadeOut(1000);
                }

            });

        },
        quickMenu: function(){

            //var quickTop = (창높이 - 퀵메뉴박스높이)/2
            var quickTop1 = ($(window).height() - 96)/2;
            var quickTop2 = 150;

            function quickMenuFn(){
            $('.quick-menu').stop().animate({top: $(window).scrollTop() + quickTop2 }, 600, "easeOutExpo");
            }
            quickMenuFn();    
            
            $(window).scroll(function(){
                quickMenuFn();
            });

        }        
    }

    starBucks.init();   //스타벅스 객체 init메서드 실행

})(jQuery, window);