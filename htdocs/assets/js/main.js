// ハンバーガーメニューをクリックしたらクラス管理
$('.ham').on('click', () => {
    $('.gnav').toggleClass('on');
    $('.ham').toggleClass('on');
    $('.ham_bg').toggleClass('on');
});

// メニュー背景をクリックしたらクラス管理
$('.ham_bg').on('click', () => {
    $('.gnav').toggleClass('on');
    $('.ham').toggleClass('on');
    $('.ham_bg').toggleClass('on');
});

//リンクを踏んだらクラスonを外してバーガーメニュー閉じる
$('.list_item > a').on('click', () => {
    $('.gnav').removeClass('on');
    $('.ham').removeClass('on');
    $('.ham_bg').removeClass('on');
});

// メインコンテンツとメニューをヘッダーの高さ分だけずらす
var headerHeight = $('.header').outerHeight(); // headerの高さを取得して変数headerHeightへ代入
$('main').css('padding-top', headerHeight + 'px'); // mainのpadding-topをヘッダーの高さ分あける
$('.gnav').css('margin-top', headerHeight + 'px'); // gnavのmargin-topをヘッダーの高さ分あける
$('.ham_bg').css('margin-top', headerHeight + 'px'); // .ham_bgのmargin-topをヘッダーの高さ分あける