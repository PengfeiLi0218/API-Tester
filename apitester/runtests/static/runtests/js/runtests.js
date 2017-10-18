$(function() {
	function runTest(runner) {
		var testpath = runner.data('testpath');
        var configPk = $('#select-config').val();
		var url = URL_RUNTEST_BASE.
            replace('testmethod', 'get'). // hardcode get for now
            replace('testpath', encodeURIComponent(testpath)).
            replace('0', configPk);
		$.get(url, function (data) {
			if (data['success']) {
				alertType = 'success';
				msg = '';
			} else {
				alertType = 'danger';
				msg = '<ul>';
				for (var i=0; i < data['messages'].length; i++) {
					msg += `<li>${data['messages'][i]}</li>`;
				}
				msg += '</ul>';
			}
			var result = `<div class="alert alert-${alertType}">${data['config']['summary']}<br />${data['config']['urlpath']}<br />${msg}<br /><pre>${data['text']}</pre><br />Took ${data['execution_time']} ms</div>`;
			$(runner.find('.result')).append(result);
		});
	}

	$('#run').click(function() {
		$('.result').empty();
		var runners = $('.runner');
		for (var i=0; i < runners.length; i++) {
			var runner = $(runners[i]);
			if (runner.find('input').is(':checked')) {
				runTest(runner);
			}
		}
	});
	$('.runner button').click(function() {
		var runner = $(this).parent().parent().parent();
		$(runner).find('.result').empty();
		runTest(runner);
	});

	$('#checkNone').click(function() {
		$('.runner').find('input').prop('checked', false);
	});
	$('#checkAll').click(function() {
		$('.runner').find('input').prop('checked', true);
	});

    $('#select-config').change(function() {
        var configPk = $(this).val();
        if (configPk) {
            $('.config').addClass('hide');
            $('#config-' + configPk).removeClass('hide');
            $('#run-buttons').removeClass('hide');
            $('#test-list').removeClass('hide');
        }
    })

    var configPk = location.href.substr(location.href.lastIndexOf('/') + 1);
    if (configPk) {
        $('#select-config').val(configPk).trigger('change');
    }
});
