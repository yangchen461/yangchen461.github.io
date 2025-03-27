// 雪花特效（亮银色 + 放大）
$(function () {
  var $flake = $('<div class="snow-flake">❄</div>').css({
    'position': 'absolute',
    'top': '-50px',
    'color': '#C0C0C0', // ✅ 亮银色
    'user-select': 'none',
    'z-index': '9999',
    'pointer-events': 'none'
  });

  setInterval(function () {
    var startLeft = Math.random() * $(window).width();
    var endLeft = Math.random() * $(window).width();
    var duration = 10000 + Math.random() * 5000;

    var $clone = $flake.clone();
    $clone.css({
      'left': startLeft,
      'opacity': 0.8 + Math.random() * 0.2,
      'font-size': 24 + Math.random() * 16 // ✅ 放大字号：24px ~ 40px
    });

    $('body').append($clone);
    $clone.animate({
      'top': '100%',
      'left': endLeft,
      'opacity': 0.1
    }, duration, function () {
      $(this).remove();
    });
  }, 300); // ❄ 密度适中
});
