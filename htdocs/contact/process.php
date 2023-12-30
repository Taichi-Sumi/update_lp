<?php
require 'vendor/autoload.php';

// Composer を使用して Google Cloud の依存関係を組み込む
use Google\Cloud\RecaptchaEnterprise\V1\RecaptchaEnterpriseServiceClient;
use Google\Cloud\RecaptchaEnterprise\V1\Event;
use Google\Cloud\RecaptchaEnterprise\V1\Assessment;
use Google\Cloud\RecaptchaEnterprise\V1\TokenProperties\InvalidReason;

/**
 * 評価を作成して UI アクションのリスクを分析する。
 * @param string $recaptchaKey サイト / アプリに関連付けられた reCAPTCHA キー
 * @param string $token クライアントから取得した生成トークン。
 * @param string $project Google Cloud プロジェクト ID
 * @param string $action トークンに対応するアクション名。
 */
function create_assessment(
    string $recaptchaKey,
    string $token,
    string $project,
    string $action
): void {
    // reCAPTCHA クライアントを作成する。
    // TODO: クライアント生成コードをキャッシュに保存するか（推奨）、メソッドを終了する前に client.close() を呼び出す。
    $client = new RecaptchaEnterpriseServiceClient();
    $projectName = $client->projectName($project);

    // 追跡するイベントのプロパティを設定する。
    $event = (new Event())
        ->setSiteKey($recaptchaKey)
        ->setToken($token);

    // 評価リクエストを作成する。
    $assessment = (new Assessment())
        ->setEvent($event);

    try {
        $response = $client->createAssessment(
            $projectName,
            $assessment
        );

        // トークンが有効かどうかを確認する。
        if ($response->getTokenProperties()->getValid() == false) {
            printf('The CreateAssessment() call failed because the token was invalid for the following reason: ');
            printf(InvalidReason::name($response->getTokenProperties()->getInvalidReason()));
            return;
        }

        // 想定どおりのアクションが実行されたかどうかを確認する。
        if ($response->getTokenProperties()->getAction() == $action) {
            // リスクスコアと理由を取得する。
            // 評価の解釈の詳細については、以下を参照:
            // https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
            printf('The score for the protection action is:');
            printf($response->getRiskAnalysis()->getScore());
        } else {
            printf('The action attribute in your reCAPTCHA tag does not match the action you are expecting to score');
        }
    } catch (exception $e) {
        printf('CreateAssessment() call failed with the following error: ');
        printf($e);
    }
}

// TODO: サンプルを実行する前に、トークンと reCAPTCHA アクション変数を置き換えます。
create_assessment(
    '6LcsGT4pAAAAAOl2XoJo_t-XOHBq06LKHPqkd1yH',
    'YOUR_USER_RESPONSE_TOKEN',
    'triup-career-1703749730673',
    'YOUR_RECAPTCHA_ACTION'
);
