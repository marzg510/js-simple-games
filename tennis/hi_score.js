import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Firebase 設定（firebaseConfigはグローバルに定義されていると仮定）
const firebase = initializeApp(firebaseConfig);
const db = getDatabase(firebase);

/**
 * ハイスコアを保存する
 * @param {number} score - 保存するスコア
 */
window.saveHiScore = function(score) {
    set(ref(db, 'tennis'), {
        hiScore: score
    });
}

/**
 * ハイスコアを取得する
 * @returns {Promise<number>} - ハイスコアを返すPromise
 */
window.getHiScore = async function() {
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