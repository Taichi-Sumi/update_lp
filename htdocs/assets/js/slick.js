let windowWidth = $(window).width();
let windowSm = 768;
if (windowWidth <= windowSm) {
    //横幅769px以下のとき（つまりスマホ時）に行う処理を書く
    $('#voice_container').slick({
        dots: true, //スクロール位置を示すドットを表示
        infinite: false, //無限スクロールをオフ
        slidesToShow: 1, // 表示するスライド数を設定
        slidesToScroll: 1 // スクロールするスライド数を設定 
    });
} else {
    //横幅769px超のとき（タブレット、PC）に行う処理を書く
    $('#voice_container').slick({
        dots: true, //スクロール位置を示すドットを表示
        infinite: false, //無限スクロールをオフ
        slidesToShow: 2, // 表示するスライド数を設定
        slidesToScroll: 1 // スクロールするスライド数を設定 
    });
}