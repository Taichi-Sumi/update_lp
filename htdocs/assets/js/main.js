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
$(window).on('load resize', function () {
    var winW = $(window).width();
    var devW = 767;
    if (winW <= devW) {
        //767px以下の時の処理
        // メインコンテンツとメニューをヘッダーの高さ分だけずらす
        let headerHeight = $('.header').outerHeight(); // headerの高さを取得して変数headerHeightへ代入
        $('main').css('padding-top', headerHeight + 'px'); // mainのpadding-topをヘッダーの高さ分あける
        $('.gnav').css('margin-top', headerHeight + 'px'); // gnavのmargin-topをヘッダーの高さ分あける
        $('.ham_bg').css('margin-top', headerHeight + 'px'); // .ham_bgのmargin-topをヘッダーの高さ分あける

        // メインコンテンツとメニューを固定お問合せボタンの高さ分だけずらす
        let contactHeight = $('#contact_fixed').outerHeight(); // headerの高さを取得して変数headerHeightへ代入
        $('main').css('padding-bottom', contactHeight + 'px'); // mainのpadding-bottomをコンタクトボタンエリアの高さ分あける
    } else {
        //769pxより大きい時の処理
        let headerHeight = $('.header').outerHeight(); // headerの高さを取得して変数headerHeightへ代入
        // メインコンテンツとメニューをヘッダーの高さ分だけずらす
        $('main').css('padding-top', headerHeight + 'px'); // mainのpadding-topをヘッダーの高さ分あける
        $('.gnav').css('margin-top', 0 + 'px'); // gnavのmargin-topをヘッダーの高さ分あける

        // メインコンテンツとメニューを固定お問合せボタンの高さ分だけずらす
        let contactHeight = $('#contact_fixed').outerHeight(); // headerの高さを取得して変数headerHeightへ代入
        $('main').css('padding-bottom', contactHeight + 'px'); // mainのpadding-bottomをコンタクトボタンエリアの高さ分あける
    }
});


// ==============
//アコーディオンをクリックした時の動作
// ==============
$('section:has(.acco-title)').on('click', function () {//タイトル要素をクリックしたら
    // let findElm = $(this).next(".box");//直後のアコーディオンを行うエリアを取得し
    let findElm = $(this).children(".box")
        ;//直後のアコーディオンを行うエリアを取得し
    $(findElm).slideToggle();//アコーディオンの上下動作

    if ($(this).hasClass('close')) {//タイトル要素にクラス名closeがあれば
        $(this).removeClass('close');//クラス名を除去し
    } else {//それ以外は
        $(this).addClass('close');//クラス名closeを付与
    }
});

// ==============
// ページトップアニメーション
// ==============

//スクロールした際の動きを関数でまとめる
function PageTopAnime() {

    let scroll = $(window).scrollTop(); //スクロール値を取得
    console.log(scroll);
    if (scroll >= 783) {//200pxスクロールしたら
        $('#page-top').removeClass('DownMove');		// DownMoveというクラス名を除去して
        $('#page-top').addClass('UpMove');			// UpMoveというクラス名を追加して出現
    } else {//それ以外は
        if ($('#page-top').hasClass('UpMove')) {//UpMoveというクラス名が既に付与されていたら
            $('#page-top').removeClass('UpMove');	//  UpMoveというクラス名を除去し
            $('#page-top').addClass('DownMove');	// DownMoveというクラス名を追加して非表示
        }
    }

    let wH = window.innerHeight; //画面の高さを取得
    let footerPos = $('#footer').offset().top; //footerの位置を取得
    if (scroll + wH >= (footerPos + 72)) {
        let pos = (scroll + wH) - footerPos + 12 //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
        $('#page-top').css('bottom', pos);	//#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
    } else {//それ以外は
        if ($('#page-top').hasClass('UpMove')) {//UpMoveというクラス名がついていたら
            $('#page-top').css('bottom', '96px');// 下から80pxの位置にページリンクを指定
        }
    }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
    PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

/* ==============================
Googleフォーム送信
============================== */
let submitted = false;

// categoryでその他が選ばれた時のみ、inputを表示し、必須項目にする
$(document).ready(function () {
    // カテゴリの変更を監視
    $('#category').on('change', function () {
        // 選択された値を取得
        var selectedValue = $(this).val();

        // 「その他」が選択された場合
        if (selectedValue === 'その他') {
            // id='other'のinputタグを表示
            $('#other').css('display', 'block')
            // 必須項目にする
            $('#other').prop('required', true)

        } else {
            // それ以外の場合は非表示
            $('#other').css('display', 'none')
            // 必須項目ではなくする
            $('#other').prop('required', false)
        }
    });
});

// ==============
// 下部固定お問い合わせボタンのオブザーバー
// ==============
const bg_ob_func = (entry) => {
    // htmlから#bgを取得
    const contactFixed = document.querySelector('#contact_fixed');
    // bg_ob.observe(document.querySelector('#bg_placeholder'))で監視している、画面表示されているか？の値がtrueなら.onをbg_targetに付加
    if (entry[0].isIntersecting === true) {
        contactFixed.classList.add('is_hidden');
        // そうでない場合はbg_targetからonを取り除く
    } else {
        contactFixed.classList.remove('is_hidden');
    };
};

const bg_ob_param = {
    // rootMargin: '-187px',
};

const bg_ob = new IntersectionObserver(bg_ob_func, bg_ob_param);

bg_ob.observe(document.querySelector('#mv'))
bg_ob.observe(document.querySelector('#footer'))

