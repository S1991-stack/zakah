// الوظيفة لحساب الزكاة وعرض النتيجة
function calculateZaka() {
    let zaka = document.getElementById('zaka').value;

    // التأكد من إدخال قيمة صحيحة
    if (zaka === '' || zaka <= 0) {
        document.getElementById('result').innerText = "يرجى إدخال مبلغ صحيح.";
        return;
    }

    let result = 0.025 * zaka;
    document.getElementById('result').innerText = `مقدار الزكاة: ${result} دينار عراقي`;
}

// إضافة حدث عند الضغط على زر "Enter" في حقل الإدخال
document.getElementById('zaka').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // منع الإجراء الافتراضي للزر Enter
        calculateZaka();
    }
});
