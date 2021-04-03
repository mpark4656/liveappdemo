$('.nav-link').on("click", function() {
    let allNavLinks = $('.nav-link');
    allNavLinks.removeClass("active");
    allNavLinks.removeAttr("aria-current");
    $(this).addClass("active");
    $(this).attr("aria-current", "page");
    $('.navbar-toggler').click();
})