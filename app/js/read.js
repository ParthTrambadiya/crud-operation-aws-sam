$(document).ready(function(){
    readRecord = function() {
        readData = ''
        $.ajax({
            url: `${apiBaseUrl}/${stackStage}/read`,
            type: 'GET',
            dataType: 'json',
            success: function(data, status,xhr) {
                if(data.length > 0) {
                    data.forEach(element => {
                        readData += `
                            <tr>
                                <td class="text-capitalize">${element.name}</td>
                                <td>${element.email}</td>
                                <td class="text-capitalize">${element.gender}</td>
                                <td>${element.age}</td>
                                <td><button class="edit-btn"><i class='bx bxs-edit'></i></button></td>
                                <td><button class="delete-btn"><i class='bx bx-x'></i></button></td>
                            </tr>
                        `
                    });
                    $('#tablebody').empty()
                    $('#tablebody').html(readData)
                }
                else {
                    var emptyData = '<tr><td colspan="6">No Records</td></tr>'
                    $('#tablebody').empty()
                    $('#tablebody').html(emptyData)
                }
            },
            error: function(jqXhr, textStatus, errorMessage) {
                console.log('Error: ', jqXhr, textStatus, errorMessage)
            }
        })
    }

    readRecord()
})