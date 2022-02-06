$(document).ready(function(){
    $('#tablebody').on('click', '.delete-btn', function () {
        $tr = $(this).closest("tr");

        var data = $tr.children("td").map(function () {
            return $(this).text();
        }).get();

        var email = data[1]

        $.ajax({
            url: `${apiBaseUrl}/${stackStage}/delete`,
            type: 'DELETE',
            dataType: 'json',
            data: JSON.stringify({
                email: email
            }),
            success: function(data, status,xhr) {
                $.snack('success', data, 5000);
                readRecord()
            },
            error: function(jqXhr, textStatus, errorMessage) {
                $.snack('error', 'Somthing went wrong', 5000);
                console.log('Error: ', jqXhr, textStatus, errorMessage)
            }
        });
    });
})