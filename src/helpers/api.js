// calls to apis go here
var api = {
	getState: function(zip) {
		let zipResultPromise = fetch(`http://maps.googleapis.com/maps/api/geocode/json?address=${zip}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				let usaStat;
				let state = data.results[0].address_components[3].long_name;

				if (data.results[0].address_components[4].long_name	== "United States") {
					usaStat	= true;
				} else { usaStat = false; }

				const info = {
					inUSA: usaStat,
					state: state
				}

				return info;
			})
			.catch(function(err){
				console.error('API error: ', err);
				return 'api error';
			});

		return zipResultPromise;
	}
}