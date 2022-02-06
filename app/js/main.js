var readData = '';
var readRecord;

const toTitleCase = (str) => {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}

$(document).ready(function(){

    $.toastDefaults = {
        stackable: true,
        pauseDelayOnHover: true,
      
        style: {
            toast: '',
            info: '',
            success: '',
            warning: '',
            error: '',
        }
    };

    $.validator.setDefaults({
        errorClass: 'invalid-feedback',
        highlight: function(element) {
            $(element)
                .closest('.form-control, .custom-control-input')
                .addClass('is-invalid');
            $(element).addClass('shadow-none');
        },
        unhighlight: function(element) {
            $(element)
                .closest('.form-control, .custom-control-input')
                .removeClass('is-invalid');
            $(element).removeClass('shadow-none');
        },
        errorPlacement: function (error, element) {
            if (element.prop('type') === 'radio') {
                error.insertAfter('.female');
            }
            else {
                error.insertAfter(element);
            }
        }
    });

    $.validator.addMethod('letterOnly', function (value, element){
        var letterOnly = /^[a-zA-Z ]*$/;
        if(letterOnly.test(value)){
            return true;
        }
    }, 'Your name must be in letters only.');

    $.validator.addMethod('emailValidate', function (value, element){
        var email = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if(email.test(value)){
            return true;
        }
    }, 'Your email address must be in the format of name@domain.com.');

    $.validator.addMethod('ageValidate', function (value, element){
        var age = /^[0-9]*$/;
        if(age.test(value)){
            return true;
        }
    }, 'Your age must be in numbers only.')

    $('#tablebody').on('click', '.edit-btn', function () {
        $('#updateModal').modal('show');

        $tr = $(this).closest("tr");

        var data = $tr.children("td").map(function () {
            return $(this).text();
        }).get();

        $('#nameUpdate').val(data[0])
        $('#emailUpdate').val(data[1])
        $(`#updateForm input[value="${data[2]}`).prop('checked', true)
        $('#ageUpdate').val(data[3])
    });
})
