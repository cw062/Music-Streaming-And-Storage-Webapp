const user_label = document.querySelector(".username-label");
const user_field = document.querySelector(".username");
const pass_label = document.querySelector(".password-label");
const pass_field = document.querySelector(".pass");
const submit_button = document.querySelector('.submit-button');
const bottom_elements = document.querySelector(".bottom-elements");


function displayUsernameMessage(response) {
    if (response === true) {
        user_label.textContent = "Username already taken";
        user_label.style.color = "rgb(255, 106, 106)";
        user_field.style.borderBottom = '2px solid rgba(255, 106, 106)';
        submit_button.style.visibility = 'hidden';
        submit_button.style.opacity = 0;
        bottom_elements.style.top = '10vh';

    } else {
        user_label.textContent = "Username";
        user_label.style.color = "rgb(84, 156, 48)";
        user_field.style.borderBottom = '2px solid rgba(84, 156, 48, 1)';
    }
}


window.addEventListener('DOMContentLoaded', (event) => {
    if (user_field.value.length > 0) {
        user_field.style.borderBottom = '2px solid rgba(84, 156, 48, 1)';
        user_label.style.top = '4vh';
        user_label.style.opacity = 1;
    }
});
user_field.addEventListener('focusin', function () {
    user_label.style.top = '4vh';
    if (user_field.value.length == 0) {   
        user_field.style.borderBottom = '2px solid rgba(255, 0, 0,1)';
        user_label.style.opacity = 1;
    }
});
user_field.addEventListener('focusout', function () {
    if (user_field.value.length == 0) {
        user_label.style.top = '6.5vh';
        user_label.style.opacity = .5;
        user_field.style.borderBottom = '2px solid rgba(255, 0, 0,.2)';
        
    }     
});
pass_field.addEventListener('focusin', function () {
    pass_label.style.top = '9vh';
    if (pass_field.value.length == 0) {
        pass_field.style.borderBottom = '2px solid rgba(255, 0, 0,1)';
        pass_label.style.opacity = 1;
    }
});
pass_field.addEventListener('focusout', function () {
    if (pass_field.value.length == 0) {
        pass_label.style.top = '11.5vh';
        pass_field.style.borderBottom = '2px solid rgba(255, 0, 0,.2)';
        pass_label.style.opacity = .5;
    } 
});

user_field.addEventListener('input', function () {
    if (user_field.value.length > 0) {
        user_field.style.borderBottom = '2px solid rgba(84, 156, 48, 1)';
        if (pass_field.value.length > 0 ) {
            submit_button.style.visibility = 'visible';
            submit_button.style.opacity = 1;
            bottom_elements.style.top = '14vh';
        }
    } else {
        user_label.textContent = "Username";
        user_label.style.color = 'black';
        user_field.style.borderBottom = '2px solid rgba(255, 0, 0,1)';
    }
    if (pass_field.value.length == 0 || user_field.value.length == 0) {
        submit_button.style.visibility = 'hidden';
        submit_button.style.opacity = 0;
        bottom_elements.style.top = '10vh';
    }
});
pass_field.addEventListener('input', function () {
    if (pass_field.value.length > 0) {
        pass_field.style.borderBottom = '2px solid rgba(84, 156, 48, 1)';
        if (user_label.textContent == 'Username') {
            submit_button.style.visibility = 'visible';
            submit_button.style.opacity = 1;
            bottom_elements.style.top = '14vh';
        }
    } else {
        pass_field.style.borderBottom = '2px solid rgba(255, 0, 0,1)';
    }
    if (pass_field.value.length == 0 || user_field.value.length == 0) {
        submit_button.style.visibility = 'hidden';
        submit_button.style.opacity = 0;
        bottom_elements.style.top = '10vh';
    }
});

submit_button.addEventListener('click', () => {
    document.signup_form.submit();
});

submit_button.addEventListener('keypress', function(event) {
    if (event.key === "Enter")
        document.signup_form.submit();
});