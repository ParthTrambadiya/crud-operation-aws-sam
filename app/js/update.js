$(document).ready(function(){
    const updateForm = $('#updateForm');

    updateForm.validate({
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

    updateForm.submit(function(e){
        e.preventDefault();

        if(updateForm.valid()) {
            var name = toTitleCase($('#updateForm #nameUpdate').val().trim());
            var email = $('#updateForm #emailUpdate').val().trim().toLowerCase();
            var gender = $('#updateForm input[type="radio"]:checked').val();
            var age = $('#updateForm #ageUpdate').val().trim();

            $.ajax({
                url: `${apiBaseUrl}/${stackStage}/update`,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    name: name,
                    email: email,
                    gender: gender,
                    age: age
                }),
                success: function(data, status,xhr) {
                    $('#updateModal').modal('hide')
                    updateForm.trigger('reset')
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