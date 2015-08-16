var abcChecklistScript = {

    textBoxDisabling: function (obj, id) {
        var textBox = $('#' + id);
        if ($(obj).is(":checked")) {
            textBox.prop("disabled", false);
        } else {
            textBox.val('');
            textBox.prop("disabled", true);
        }
    },

    setup: function () {
        $('#now').click(function () {
            var date = new Date();
            $('#dateTime').html(date.toLocaleString());
        });
        $('input:radio[name=antecedent]').click(function (event) {
            var antecedentOther = $('#antecedentOther');
            if ($(this).val() === "Other") {
                antecedentOther.prop("disabled", false);
            } else {
                antecedentOther.val('');
                antecedentOther.prop("disabled", true);
            }
        });
        $('input:checkbox[name=behavior][value=Other]').click(function (event) {
            abcChecklistScript.textBoxDisabling($(this), 'behaviorOther');
        });
        $('input:checkbox[name=people][value=Other]').click(function (event) {
            abcChecklistScript.textBoxDisabling($(this), 'peopleOther');
        });
        $('input:checkbox[name=consequence][value=Other]').click(
            function (event) {
                abcChecklistScript.textBoxDisabling($(this),
                    'consequenceOther');
            });
        $('#save').click(function (event) {
            event.preventDefault();
            abcChecklistScript.save();
        });
    },

    save: function () {
        if (abcChecklistScript.validSave()) {
            var abcChecklist = {};
            // checkboxes
            abcChecklist.people = abcChecklistScript.processArray($(
                'input:checkbox[name=people]:checked').get());
            abcChecklist.behavior = abcChecklistScript.processArray($(
                'input:checkbox[name=behavior]:checked').get());
            abcChecklist.consequence = abcChecklistScript.processArray($(
                'input:checkbox[name=consequence]:checked').get());
            // radios
            abcChecklist.antecedent = $("input:radio[name=antecedent]:checked")
                .val();
            abcChecklist.location = $("input:radio[name=location]:checked")
                .val();
            abcChecklist.duration = $("input:radio[name=duration]:checked")
                .val();
            abcChecklist.intensity = $("input:radio[name=intensity]:checked")
                .val();
            // text boxes
            abcChecklist.antecedentOther = $("#antecedentOther").val();
            abcChecklist.peopleOther = $("#peopleOther").val();
            abcChecklist.behaviorOther = $("#behaviorOther").val();
            abcChecklist.consequenceOther = $("#consequenceOther").val();
            // date
            abcChecklist.when = $("#dateTime").html();
            abcChecklistScript.ajaxToPhp(abcChecklist);
        }
    },

    validSave: function () {
        var i = 0;
        var html = "";
        if ($('input:checkbox[name=people]:checked').length === 0) {
            html += "At least one Person is required to save.<br>";
            i += 1;
        }
        if ($('input:checkbox[name=behavior]:checked').length === 0) {
            html += "At least one Behavior is required to save.<br>";
            i += 1;
        }
        if ($('input:checkbox[name=consequence]:checked').length === 0) {
            html += "At least one Consequence is required to save.<br>";
            i += 1;
        }
        if ($('input:radio[name=antecedent]:checked').length === 0) {
            html += "An Antecedent is required to save.<br>";
            i += 1;
        }
        if ($('input:radio[name=location]:checked').length === 0) {
            html += "A Location is required to save.<br>";
            i += 1;
        }
        if ($('input:radio[name=duration]:checked').length === 0) {
            html += "A Duration is required to save.<br>";
            i += 1;
        }
        if ($('input:radio[name=intensity]:checked').length === 0) {
            html += "An Intensity is required to save.<br>";
            i += 1;
        }
        if ($('#dateTime').html().length === 0) {
            html += "The date and time of the ABC is required to save.<br>";
            i += 1;
        }
        if ($('input:radio[name=antecedent][value=Other]').is(':checked')) {
            if ($('#antecedentOther').val() === '') {
                html += "For Antecedent - Other, the text description of Other must be entered.<br>";
                i += 1;
            }
        }
        if ($('input:checkbox[name=people][value=Other]').is(':checked')) {
            if ($('#peopleOther').val() === '') {
                html += "For People - Other, the text description of Other must be entered.<br>";
                i += 1;
            }
        }
        if ($('input:checkbox[name=behavior][value=Other]').is(':checked')) {
            if ($('#behaviorOther').val() === '') {
                html += "For Behavior - Other, the text description of Other must be entered.<br>";
                i += 1;
            }
        }
        if ($('input:checkbox[name=consequence][value=Other]').is(':checked')) {
            if ($('#consequenceOther').val() === '') {
                html += "For Consequence - Other, the text description of Other must be entered.";
                i += 1;
            }
        }

        if (i === 0) {
            return true;
        } else {
            abcChecklistScript.showModal('<strong>Error!</strong><br>' + html,
                false);
            return false;
        }

    },

    ajaxToPhp: function (dataToPost) {
        $.ajax({
            url: 'abc.php',
            type: 'post',
            data: JSON.stringify(dataToPost),
            success: function (data, status) {
                abcChecklistScript.showModal(data, true);
            },
            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log("Details: " + desc + "\nError:" + err);
            }
        });
    },

    processArray: function (array) {
        var valueArray = [ ];
        for (i = 0; i < array.length; i++) {
            valueArray[i] = array[i].value;
        }
        return valueArray;
    },

    showModal: function (message, reload) {
        var messageModal = $('#messageModal');
        messageModal.modal();
        messageModal.on('shown.bs.modal', function () {
            $('#messageModal .modal-body').html(message);
            $('a.controls').trigger('click');
        });
        messageModal.on('hidden.bs.modal', function () {
            $('#messageModal .modal-body').html('');
            if (reload) {
                location.reload();
            }
        });
    }

};

$(document).ready(abcChecklistScript.setup());