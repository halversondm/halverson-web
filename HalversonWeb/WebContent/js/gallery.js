'use strict';
$(document).ready(function () {
    $('li img').on('click', function () {
        var src = $(this).attr('src');
        var img = '<img src="' + src + '" class="img-responsive"/>';

        var index = $(this).parent('li').index();
        var html = img;
        html += '<div class="modal-footer">';
        html += '<a class="controls next" href="' + (index + 2) + '">next &raquo;</a>';
        html += '<a class="controls previous" href="' + (index) + '">&laquo; prev</a>';
        html += '</div>';

        var myModal = $('#myModal').modal();
        myModal.on('shown.bs.modal', function () {
            $('#myModal .modal-body').html(html);
            $('a.controls').trigger('click');
        });
        myModal.on('hidden.bs.modal', function () {
            $('#myModal .modal-body').html('');
        });
    });

    /* inside the modal behavior */
    $(document).on('click', 'a.controls', function () {
        var index = $(this).attr('href');
        var src = $('ul.row li:nth-child(' + index + ') img').attr('src');
        $('.modal-body img').attr('src', src);

        var newPrevIndex = parseInt(index) - 1;
        var newNextIndex = parseInt(newPrevIndex) + 2;

        if ($(this).hasClass('previous')) {
            $(this).attr('href', newPrevIndex);
            $('a.next').attr('href', newNextIndex);
        } else {
            $(this).attr('href', newNextIndex);
            $('a.previous').attr('href', newPrevIndex);
        }

        var total = $('ul.row li').length + 1;
        //hide next button
        if (total === newNextIndex) {
            $('a.next').hide();
        } else {
            $('a.next').show();
        }
        //hide previous button
        if (newPrevIndex === 0) {
            $('a.previous').hide();
        } else {
            $('a.previous').show();
        }
        return false;
    });
});


var generateGallery = {
    process: function (photoDirectory, firstPhotoNumber, lastPhotoNumber, thisPage, totalPages) {
        var html = '<ul class="row">';
        for (var i = firstPhotoNumber; i <= lastPhotoNumber; i++) {
            html += '<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4"><img class="img-responsive" src="./' + photoDirectory + '/photo' + [i] + '.jpg" /></li>';
        }
        html += '</ul><hr>';
        for (var j = 1; j <= totalPages; j++) {
            if ([j] == thisPage) {
                html += '<span class="label label-success">Page ' + [j] + '</span>&nbsp;';
            } else {
                html += '<a class="btn btn-primary btn-xs" href="gallery' + [j] + '.html" role="button">Page ' + [j] + '</a>&nbsp;';
            }
        }
        $('#photoGallery').append(html);
    }
};