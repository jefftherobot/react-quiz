// calls to apis go here
var api = {
	getState: function(zip) {
		let zipResultPromise = fetch(`https://api.zippopotam.us/us/${zip}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				let state = data.places[0].state;

				return state;
			})
			.catch(function(err){
				console.error('API error: ', err);
				return 'api error';
			});

		return zipResultPromise;
	}
}