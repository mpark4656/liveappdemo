$('.nav-link').on("click", function() {
    let allNavLinks = $('.nav-link');
    allNavLinks.removeClass("active");
    allNavLinks.removeAttr("aria-current");
    $(this).addClass("active");
    $(this).attr("aria-current", "page");
    $('.navbar-toggler').click();
})

$(window).scroll(function() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 100) {
        $('.scroll-section').each(function(i) {
            if ($(this).position().top <= windscroll + 100) {
                $('.navbar-nav a.active').removeAttr("aria-current");
                $('.navbar-nav a.active').removeClass('active');
                $('.navbar-nav a').eq(i).addClass('active');
                $('.navbar-nav a').eq(i).attr("aria-current", "page");
            }
        });
    } else {
        $('.navbar-nav a.active').removeAttr("aria-current");
        $('.navbar-nav a.active').removeClass('active');
        $('.navbar-nav a:first').addClass('active');
        $('.navbar-nav a:first').attr("aria-current", "page");
    }
}).scroll();