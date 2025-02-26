// DOM 로드 후 실행
document.addEventListener('DOMContentLoaded', () => {
    // ============ *SCRIPT: BACKGROUND ============
    // 배경 이미지 요소 선택
    const backgrounds = document.querySelectorAll('.bg');
    let currentIndex = 0;

    function changeBackground() {
        let newIndex = (currentIndex + 1) % backgrounds.length; // 다음 배경으로 이동, 순환

        // 이전 배경 제거 및 새로운 배경 추가
        backgrounds[currentIndex].classList.remove('on');
        backgrounds[newIndex].classList.add('on');

        currentIndex = newIndex; // 즉시 업데이트
    }

    // 일정 시간마다 배경을 바꿈 (1.5초마다)
    setInterval(changeBackground, 1500);

    // ============ *SCRIPT: LANGUAGE ============
    // 언어 선택 버튼 및 컨텐츠 요소 선택
    const languageButtons = document.querySelectorAll('.language button');
    const korContent = document.querySelectorAll('.content.kor');
    const engContent = document.querySelectorAll('.content.eng');

    // 초기 컨텐츠 표시 설정 (한국어 기본값)
    const initializeContent = () => {
        korContent.forEach((content) => (content.style.display = 'block'));
        engContent.forEach((content) => (content.style.display = 'none'));
    };

    // 언어 전환 함수
    const switchLanguage = (selectedLang) => {
        if (selectedLang === 'kor') {
            // 한국어 선택 시
            korContent.forEach((content) => (content.style.display = 'block'));
            engContent.forEach((content) => (content.style.display = 'none'));
        } else {
            // 영어 선택 시
            korContent.forEach((content) => (content.style.display = 'none'));
            engContent.forEach((content) => (content.style.display = 'block'));
        }

        // 언어 전환 후 애니메이션 재실행
        // 기존 애니메이션 정리 후 재실행
        resetAnimations();
        runAnimations();
    };

    // 기존 애니메이션 정리 함수
    const resetAnimations = () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // 모든 ScrollTrigger 제거
        gsap.killTweensOf('.ac_inner, .arrow_images, .core .list .item'); // 기존 트윈 제거
    };

    // 언어 버튼 클릭 이벤트 핸들러
    const handleLanguageClick = (event) => {
        const selectedLang = event.target.dataset.lang;

        // 버튼 활성화 상태 업데이트
        languageButtons.forEach((button) => {
            // 모든 버튼에서 'on' 클래스 제거
            button.classList.remove('on');
            // 선택된 버튼에만 'on' 클래스 추가
            if (button.dataset.lang === selectedLang) {
                button.classList.add('on');
            }
        });

        // 선택된 언어로 컨텐츠 전환
        switchLanguage(selectedLang);
    };

    // 언어 선택 버튼에 클릭 이벤트 리스너 추가
    languageButtons.forEach((button) => {
        button.addEventListener('click', handleLanguageClick);
    });

    // ============ GSAP ScrollTrigger 플러그인 등록 ============
    gsap.registerPlugin(ScrollTrigger);

    // ============ *SCRIPT: ANIMATIONS ============
    // 애니메이션 실행 함수
    const runAnimations = () => {
        /* ============ *SCRIPT/GSAP: ABOUT ============ */
        // ABOUT 섹션 애니메이션
        if (window.innerWidth > 900) {
            gsap.utils.toArray('.ac_inner').forEach((el) => {
                // 각 요소에서 data-offset 값을 가져와 이동 거리로 사용
                const offset = parseInt(el.getAttribute('data-offset')) || 0;

                gsap.fromTo(
                    el,
                    { x: -30, opacity: 0 },
                    {
                        x: offset, // data-offset 값에 따라 이동
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power1.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top bottom',
                            end: 'bottom center',
                            toggleActions: 'play none none none',
                            once: true,
                        },
                    }
                );
            });

            // arrow_images는 화면 너비에 따라 다르게 처리
            gsap.utils.toArray('.arrow_images').forEach((el) => {
                const offset = parseInt(el.getAttribute('data-offset')) || 0;

                if (window.innerWidth > 1550) {
                    // 1550px 초과: 이동 및 페이드인 애니메이션 적용
                    gsap.fromTo(
                        el,
                        { x: -30, opacity: 0 },
                        {
                            x: offset,
                            opacity: 1,
                            duration: 0.8,
                            ease: 'power1.out',
                            scrollTrigger: {
                                trigger: el,
                                start: 'top bottom',
                                end: 'bottom center',
                                toggleActions: 'play none none none',
                                once: true,
                            },
                        }
                    );
                } else {
                    // 1550px 이하: 이동 없이 페이드인만 적용
                    gsap.fromTo(
                        el,
                        { x: 0, opacity: 0 },
                        {
                            x: 30, // 이동 없음
                            opacity: 1,
                            duration: 0.8,
                            ease: 'power1.out',
                            scrollTrigger: {
                                trigger: el,
                                start: 'top bottom',
                                end: 'bottom center',
                                toggleActions: 'play none none none',
                                once: true,
                            },
                        }
                    );
                }
            });
        }

        /* ============ *SCRIPT/GSAP: CORE ============ */
        // CORE 섹션 애니메이션

        // item_top 요소는 위에서 아래로 내려오게
        gsap.utils.toArray('.core .list').forEach((listEl) => {
            gsap.fromTo(
                listEl.querySelectorAll('.item.item_top'),
                { y: -150, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: listEl,
                        start: 'top 70%',
                        toggleActions: 'play none none none',
                        once: true,
                        onEnter: () => {
                            listEl.querySelectorAll('.item.item_top').forEach((item) => {
                                item.classList.add('active');
                            });
                        },
                    },
                }
            );

            // item_down 요소는 아래에서 위로 올라오게
            gsap.fromTo(
                listEl.querySelectorAll('.item.item_down'),
                { y: 150, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: listEl,
                        start: 'top 70%',
                        toggleActions: 'play none none none',
                        once: true,
                        onEnter: () => {
                            listEl.querySelectorAll('.item.item_down').forEach((item) => {
                                item.classList.add('active');
                            });
                        },
                    },
                }
            );

            // item_title 요소는 따로 처리(기본에서 위로 올라오게)
            gsap.fromTo(
                listEl.querySelectorAll('.item.item_title'),
                { y: 0, opacity: 1 }, // 기본 상태
                {
                    y: -220,
                    opacity: 1,
                    duration: 0.6, // 애니메이션 없이 기본 상태 유지
                    scrollTrigger: {
                        trigger: listEl,
                        start: 'top 70%',
                        toggleActions: 'play none none none',
                        once: true,
                        onEnter: () => {
                            listEl.querySelectorAll('.item.item_title').forEach((item) => {
                                item.classList.add('active');
                            });
                        },
                    },
                }
            );
        });

        /* ============ *SCRIPT/GSAP: ROADMAP ============ */
        // ROADMAP 섹션 애니메이션
        const bars = gsap.utils.toArray('.roadmap .bar');
        const items = gsap.utils.toArray('.roadmap .item');

        // 모바일용 BAR 애니메이션 함수 (무한 반복)
        const startInfiniteBarAnimation = () => {
            // 현재 언어에 따라 BAR 요소 선택
            const currentLang = document.querySelector('.language button.on').dataset.lang;
            // 한국어 또는 영어 BAR 선택
            const bars =
                currentLang === 'kor'
                    ? document.querySelectorAll('.content.kor .bar') // 한국어 BAR
                    : document.querySelectorAll('.content.eng .bar'); // 영어 BAR

            // BAR 요소의 CSS 확인
            bars.forEach((bar, index) => {
                // console.log(`BAR ${index} 스타일:`, window.getComputedStyle(bar));
            });

            // 현재 인덱스
            let currentIndex = 0;

            const animateBar = () => {
                // 모든 bar 초기화 (흰색으로 설정)
                bars.forEach((bar) => {
                    gsap.to(bar, {
                        backgroundColor: 'white',
                        border: '0',
                        boxShadow: 'none',
                        duration: 0.3,
                        ease: 'power2.out',
                        stiffness: 80,
                        damping: 20,
                        mass: 1,
                    });
                });

                // 현재 인덱스의 bar를 초록색으로 설정
                gsap.to(bars[currentIndex], {
                    backgroundColor: '#57BCA9',
                    border: '0.5px solid #ddd',
                    boxShadow: '0 0px 9px rgb(87, 188, 169)',
                    duration: 0.3,
                    ease: 'power2.out',
                    stiffness: 80,
                    damping: 20,
                    mass: 1,
                });

                // 다음 인덱스로 이동 (무한 반복)
                currentIndex = (currentIndex + 1) % bars.length;
            };
            animateBar();
            // 1초마다 애니메이션 반복
            setInterval(animateBar, 3000); // 1초마다 animateBar 함수 실행
        };

        // PC용 BAR 애니메이션 함수
        // (한 번만 실행되고 마지막 인덱스에서 멈춤)
        const startBarAnimationForPC = () => {
            // 현재 언어에 따라 BAR 요소 선택
            const currentLang = document.querySelector('.language button.on').dataset.lang;

            // 한국어 또는 영어 BAR 선택
            const bars =
                currentLang === 'kor'
                    ? document.querySelectorAll('.content.kor .bar') // 한국어 BAR
                    : document.querySelectorAll('.content.eng .bar'); // 영어 BAR

            let currentIndex = 0;

            const animateBar = () => {
                // 모든 bar 초기화 (흰색으로 설정)
                bars.forEach((bar) => {
                    gsap.to(bar, {
                        backgroundColor: 'white',
                        border: '0',
                        boxShadow: 'none',
                        duration: 0.3,
                        ease: 'power2.out',
                        stiffness: 80,
                        damping: 20,
                        mass: 1,
                    });
                });

                // 현재 인덱스의 bar를 초록색으로 설정
                gsap.to(bars[currentIndex], {
                    backgroundColor: '#57BCA9',
                    border: '1px solid #ddd',
                    boxShadow: '0 0px 9px rgb(87, 188, 169)',
                    duration: 0.3,
                    ease: 'power2.out',
                    stiffness: 80,
                    damping: 20,
                    mass: 1,
                });

                // 다음 인덱스로 이동
                // currentIndex++;

                // 마지막 인덱스에서 멈춤
                // if (currentIndex >= bars.length) {
                //   clearInterval(intervalId); // 인터벌 종료
                // }

                // 무한 반복
                currentIndex = (currentIndex + 1) % bars.length;
            };
            animateBar();

            // 1초마다 애니메이션 반복
            const intervalId = setInterval(animateBar, 3000); // 1초마다 animateBar 함수 실행
        };

        // 로드맵 아이템 펼쳐지는 애니메이션 (PC에서만 실행)
        if (window.innerWidth > 900) {
            // 900px 이상일 때만 실행
            gsap.fromTo(
                items,
                { opacity: 1, y: 0 },
                {
                    opacity: 1,
                    y: (i) => [50, -50, -150, -250, 50, -50, -150, -250][i], // 각각 지정된 위치로 이동
                    duration: 1,
                    ease: 'power2.out',
                    delay: 0.2, // 0.2초 대기 후 시작
                    scrollTrigger: {
                        trigger: '.roadmap',
                        start: 'top top+=300px', // 📌 뷰포트 하단에서 시작
                        end: 'bottom 20%', // 📌 뷰포트 상단에서 끝
                        toggleActions: 'play none none none',
                        onEnter: () => {
                            // 아이템이 펼쳐진 후 BAR 애니메이션 시작 (PC에서는 한 번만 실행)
                            startBarAnimationForPC();
                        },
                    },
                }
            );
        } else {
            // 모바일에서는 BAR 애니메이션만 실행
            if (window.innerWidth <= 700) {
                startInfiniteBarAnimation(); // 700px 이하에서는 무한 반복
            }
        }
    };

    // 페이지 로드 시 초기 설정 실행
    // 초기 애니메이션 실행
    initializeContent();
    runAnimations();
});
