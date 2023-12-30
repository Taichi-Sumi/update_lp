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
            // $('#other').prop('required', true)

        } else {
            // それ以外の場合は非表示
            $('#other').css('display', 'none')
            // 必須項目ではなくする
            // $('#other').prop('required', false)
        }
    });
});

/* ==============================
バリデーション
============================== */
// お問い合わせフォームの送信イベントを取得
$(document).ready(function () {
    // フォームが送信される前に検証を行う
    $("#contact_form").submit(function (event) {
        // 既存のエラーメッセージをクリアする
        $(".error").remove();

        // 入力項目の検証を行う
        if (!validateForm()) {
            // 検証が失敗した場合、フォームの送信を中止する
            event.preventDefault();
        }
    });

    // 入力項目の検証を行う関数
    function validateForm() {
        var isValid = true;

        // お問い合わせ内容が「その他」の場合、その他のテキストボックスが入力されているか確認する
        var selectedCategory = $("#category").val();
        if (selectedCategory === "その他" && $("#other").val().trim() === "") {
            displayErrorMessage($("#other"), "お問い合わせ内容を入力してください。");
            isValid = false;
        }

        // お名前が入力されているか確認する
        var name = $("#name").val().trim();
        if (name === "") {
            displayErrorMessage($("#name"), "お名前を入力してください。");
            isValid = false;
        }

        // メールアドレスが正しい形式で入力されているか確認する
        var email = $("#email").val().trim();
        if (email === "" || !isValidEmail(email)) {
            displayErrorMessage($("#email"), "正しいメールアドレスの形式で入力してください。");
            isValid = false;
        }

        // その他の検証ルールを追加する
        // エラーがある場合にそのフィールドにフォーカスし、自動的にスクロールする
        if (!isValid) {
            $('html, body').animate({
                scrollTop: $(".error:first").offset().top - 200
            }, {
                duration: 50,
                easing: 'linear'
            });
        }
        return isValid;
    }

    // エラーメッセージを表示する関数
    function displayErrorMessage(element, message) {
        // エラーメッセージがすでに存在する場合は追加しない
        if (!element.next().hasClass("error")) {
            // エラーメッセージを追加する
            element.after("<p class='error'>" + message + "</p>");
        }
    }

    // メールアドレスの形式を検証する関数
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
