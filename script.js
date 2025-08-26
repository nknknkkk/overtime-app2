document.addEventListener('DOMContentLoaded', () => {
    const hourlyRateInput = document.getElementById('hourlyRate');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const overtimePaySpan = document.getElementById('overtimePay');

    let intervalId = null;
    let totalSeconds = 0;

    const startCalculation = () => {
        // すでに計算中なら何もしない
        if (intervalId !== null) {
            return;
        }

        const hourlyRate = parseFloat(hourlyRateInput.value);

        // 時給が入力されていない、または無効な値の場合は処理を停止
        if (isNaN(hourlyRate) || hourlyRate <= 0) {
            alert('有効な時給を入力してください。');
            return;
        }

        // 1秒あたりの残業代を計算
        const ratePerSecond = (hourlyRate / 60) / 60; // 時給を秒給に変換

        // 1秒ごとに残業代を更新
        intervalId = setInterval(() => {
            totalSeconds++;
            const overtimePay = totalSeconds * ratePerSecond;
            overtimePaySpan.textContent = overtimePay.toFixed(2);
        }, 1000);
    };

    const stopCalculation = () => {
        clearInterval(intervalId);
        intervalId = null;
        totalSeconds = 0;
    };

    startButton.addEventListener('click', startCalculation);
    stopButton.addEventListener('click', stopCalculation);
});