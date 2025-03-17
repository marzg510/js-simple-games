import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Firebase 設定（自分のプロジェクトの情報を入力）
const firebaseConfig = {
    apiKey: "AIzaSyDOFYIn_PQSDHRgdjaSIk3uSK50UeYFyIk",
    authDomain: "my-web-game-f7504.firebaseapp.com",
    databaseURL: "https://my-web-game-f7504-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "my-web-game-f7504",
    storageBucket: "my-web-game-f7504.firebasestorage.app",
    messagingSenderId: "855871162021",
    appId: "1:855871162021:web:29fadb3c0d20ca4f7a2f4c",
};

// Firebase 初期化
const firebase = initializeApp(firebaseConfig);
const db = getDatabase(firebase);

export async function getHighScore() {
    console.log("getHighScore");
    const highScoreRef = ref(db, "ball/highScore");
    const snapshot = await get(highScoreRef);
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return 0;
    }
}

export function saveHighScore(score) {
    set(ref(db, 'ball'), {
        highScore: score
    });
}