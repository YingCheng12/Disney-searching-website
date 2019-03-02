/**
 * Created by chengying on 2018/11/24.
 */
$(function () {
    $('#categorySelect').dropdown();

    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        autoplay: true,
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplayDisableOnInteraction: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })
})