$('#calculate')
		.click(
				function() {
					bootstrap_alerts.clear();
					var discount1 = $('#discount1').val();
					var discount2 = $('#discount2').val();
					var labelPrice = $('#labelPrice').val();
					var isError = false;

					if (labelPrice.length == 0 || isNaN(labelPrice)) {
						bootstrap_alerts
								.danger('Label price is required and must be a number');
						isError = true;
					}

					if (discount1.length == 0 || isNaN(discount1)) {
						bootstrap_alerts
								.danger('Discount #1 is required and must be a number');
						isError = true;
					}

					if (isNaN(discount2)) {
						bootstrap_alerts
								.danger('Discount #2 must be a number, if provided');
						isError = true;
					}

					if (!isError) {
						var finalPrice;
						var firstCalc = labelPrice
								- (labelPrice * (discount1 / 100));
						if (discount2.length == 0) {
							finalPrice = firstCalc;
						} else {
							finalPrice = firstCalc
									- (firstCalc * (discount2 / 100));
						}
						bootstrap_alerts.success('Your final price is $'
								+ finalPrice.toFixed(2) + ' plus tax');
					}
				});
$('#reset').click(function() {
	bootstrap_alerts.clear();
});
var bootstrap_alerts = {
	danger : function(message) {
		$('#alert_placeholder')
				.append(
						'<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button><strong>Error! </strong>'
								+ message + '</div>');
	},

	success : function(message) {
		$('#alert_placeholder')
				.html(
						'<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>'
								+ message + '</div>');
	},

	clear : function() {
		$('#alert_placeholder').html('');
	}
};