let url = "http://www.vdodovich.h1n.ru/server/request.php";

/**
 * Авторизація в адмін панель, в разі успіху - showContent()
 */
$("button.admin-password-button").on("click", function () {
    let password = $("input.admin-password-input").val();

    if (!password.length) {
        errorShow("Ви не ввели пароль");
        return false;
    }

    else {
        console.log("Request about sign.");
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            data: createRequest(password, "sign"),
            success: function (answer) {
               if (answer) {
                    console.log("Sign success");
                    showContent();
               }
               else {
                   errorShow ("Невірний пароль");
                   console.log("Invalid password. Try again!");
               }
            },
            error: function () {
                errorShow("Невдалось приєднатись до сервера");
            }
        });
    }


});

/**
 * Створити запит ( обєкт дата типу value:$, action:$ )
 */
function createRequest(value, action) {
       return data = {
            value: value,
            action: action
        };
}

/**
 * Showing errors on div.admin-form-error
 * @param error
 */
function errorShow(error) {
    $("div.admin-form-error").css("visibility", "visible");
    $("div.admin-form-error").html(error);
}

/**
 * Получає з сервера масив номерів, передає його для генерації html і виводить
 */
function showContent() {
    $("div.admin-panel-form").css("display","none");
    $("div.entered-phone-numbers").css("display", "flex");


    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        data: createRequest(undefined, "show-numbers"),
        success: function (answer) {
            if (answer.length) {
                 $("section.admin-panel").html(generateContent(answer));
                 $("div.entered-phone-numbers").css("display", "flex");
            }
            else {
                $("div.entered-phone-numbers").html("<div class='phone-number-item'><div class='number'>Номерів поки немає</div></div>");
            }

        },
    });

}

/**
 * Генерує з array[i] divи з контентом
 * @param array
 * @returns {string}
 */
function generateContent(array) {
    let content = ``;
    for (let i=0; i<array.length; i++){
        //language=HTML format=false
        content+= `
                <div class="entered-phone-numbers">
                <div class="phone-number-item">
                <div class="number">${array[i]}</div>
                <div class="close" onclick="deleteItem('${array[i]}')">x</div>
                </div>
                </div>
        `;
    }

    return content;
}

/**
 * Послати запит на сервер шоб видалити елемент по номеру з БД
 * @param item
 */
function deleteItem(item) {
    let solution = confirm(`Видалити ${item} ?`);
    if (solution) {
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            data: createRequest(item, "deleteItem"),
            success: function (answer) {
                console.log(answer);
                showContent();
            },
        });
    }
}