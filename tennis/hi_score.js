import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { firebaseConfig } from "../firebase_config.js"; // firebase_config.jsからfirebaseConfigをインポート

// Firebase 設定（firebaseConfigはグローバルに定義されていると仮定）
const firebase = initializeApp(firebaseConfig);
const db = getDatabase(firebase);

/**
 * ハイスコアを保存する
 * @param {number} score - 保存するスコア
 * @throws {Error} - 無効なスコア値の場合にエラーをスロー
 */
export function saveHiScore(score) {
    // 無効な値をチェック
    if (typeof score !== "number" || score < 0 || isNaN(score)) {
        throw new Error("Invalid score: Score must be a non-negative number.");
    }

    // Firebaseにスコアを保存
    set(ref(db, 'tennis'), {
        hiScore: score
    });
}

/**
 * ハイスコアを取得する
 * @returns {Promise<number>} - ハイスコアを返すPromise
 */
export async function getHiScore() {
    const hiScoreRef = ref(db, "tennis/hiScore");
    try {
        const snapshot = await get(hiScoreRef);
        if (snapshot.exists()) {
            return snapshot.val() || 0; // 取得した値がundefinedの場合は0を返す
        } else {
            return 0;
        }
    } catch (error) {
        console.error("Error fetching hiScore:", error);
        return 0;
    }
}