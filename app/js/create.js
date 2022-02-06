$(document).ready(function(){
    var createForm = $('#createForm');

    createForm.validate({
        rules: {
            name: {
                required: true,
                letterOnly: true
            },
            email: {
                required: true,
                emailValidate: true
            },
            age: {
                required: true,
                ageValidate: true
            },
            gender: {
                required: true
            }
        },
        messages: {
            name: {
                required: 'Please, provide your good name.'
            },
            email: {
                required: 'Please, provide your email address.'
            },
            age: {
                required: 'Please, provider your age.'
            },
            gender: {
                required: 'Please, choose your gender.'
            }
        }
    });

    createForm.submit(function(e) {
        e.preventDefault();

        if(createForm.valid()) {
            var name = toTitleCase($('#createForm #nameCreate').val().trim());
            var email = $('#createForm #emailCreate').val().trim().toLowerCase();
            var gender = $('#createForm input[type="radio"]:checked').val();
            var age = $('#createForm #ageCreate').val().trim();

            $.ajax({
                url: `${apiBaseUrl}/${stackStage}/create`,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    name: name,
                    email: email,
                    gender: gender,
                    age: age
                }),
                success: function(data, status,xhr) {
                    $('#createModal').modal('hide')
                    createForm.trigger('reset')
                    $.snack('success', data, 5000);
                    readRecord()
                },
                error: function(jqXhr, textStatus, errorMessage) {
                    $.snack('error', 'Somthing went wrong', 5000);
                    console.log('Error: ', jqXhr, textStatus, errorMessage)
                }
            });
        }
    })
})