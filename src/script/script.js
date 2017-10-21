/**
 * Закрити section.discount
 */
$("div.close-btn").on("click", function () {
    $("section.discount").css("display","none");
});


/**
 *  При кліку на a.call-btn проскролити вниз
 */
$("button.call-btn").on("click", function () {
    $.scrollTo("max", 1700);
    console.log("scroll enabled");
});


/**
 * Заборонити вводити нецифрові символ в input.phone-number
 */
$("input.phone-number").on("keyup", function () {
    let value = $("input.phone-number").val();
    let rep = /[-\.;":'a-zA-Zа-яА-Я]/;
    if (rep.test(value)) {
        value = value.replace(rep, '');
        $("input.phone-number").val(value);
    }

});


let URL="http://www.vdodovich.h1n.ru/server/request.php";
/**
 * Клік на залишити номер
 */
$("button.call-me-btn").on("click", function () {
    sayAboutErrorClean();
    sayAboutSuccessClose();
    let number = $("input.phone-number").val();
    if (checkNumber(number)) {
        //sayAboutErrorClean();

        $.ajax({
            url: URL,
            type: "POST",
            dataType: "json",
            data: data = {
                value: number,
                action: "add-number"
            },
            success: function (answer) {
                if (answer) {
                    sayAboutSuccess("Очікуйте дзвінка!");
                }
                else sayAboutError("Ви вже залишили заявку");
            },
            error: function () {
                sayAboutError("Невдалось приєднатись до сервера");
            }
        });
    }
});

/**
 * Перевіримо number на валідність
 * @param number
 * @returns {boolean}
 */
function checkNumber(number) {
    if (!number.length){
        sayAboutError("Ви не ввели номер");
        return false
    }
    else if (number.length!==10 && number.length!==12 && number.length!==13) {
        sayAboutError("Введений номер невірний (перевірте кількість цифр)");
        return false;
    }
    else if (number[0]!=="0" && number[0]!=="+" && number[0]!=="3") {
        sayAboutError("Невірний формат номеру");
        return false;
    }
    else return true;
}

function sayAboutSuccess(success) {
    $("div.call-me-result-success").html(success);
    $("div.call-me-result-success").css("display", "block");
}

function sayAboutSuccessClose () {
    $("div.call-me-result-success").css("display", "none");
}


/**
 * Виведемо помилку
 * @param error
 */
function sayAboutError(error) {
    console.log(error);
    $("div.call-me-result").html(error);
    $("div.call-me-result").css("display", "block");
}

/**
 * Очистити поле для помилки
 */
function sayAboutErrorClean() {
    $("div.call-me-result").css("display", "none");
}