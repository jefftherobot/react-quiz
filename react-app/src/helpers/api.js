// calls to apis go here
var api = {
	getState: function(zip) {
		let zipResultPromise = fetch(`https://api.zippopotam.us/us/${zip}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				let state = data.places[0]['state abbreviation'];

				return state;
			})
			.catch(function(err){
				console.error('API error: ', err);
				return 'api error';
			});

		return zipResultPromise;
	},

	buildLoanCall: function(quiz) {
		console.log('results', quiz);
		let quizType = document.querySelectorAll("[data-type='purchase']").length > 0 ? 'purchase' : 'refinance';
		
		if (quizType == 'purchase') {
			let purchaseCall = "https://stagesitecore.jgwentworth.com/api/mortgage/purchase?"
				purchaseCall += "DownPayment=" + quiz['salesPrice.salesPrice3'];
				purchaseCall += "&LoanPurpose=" + quizType;
				purchaseCall += "&creditScore=" + quiz.creditScore;
				purchaseCall += "&downPaymentPercentage=" + quiz['salesPrice.salesPrice2'];
				purchaseCall += "&homeType=" + quiz.homeType;
				purchaseCall += "&homeUse=" + quiz.homeUse;
				purchaseCall += "&salesPrice=" + quiz['salesPrice.salesPrice1'];
				purchaseCall += "&serviceMember=" + quiz.ServiceMember;
				purchaseCall += "&state=" + quiz.State;
				purchaseCall += "&zip_Code=" + quiz.ZipCode;

			return purchaseCall;
		} else {
			let additionalCash = quiz.additionalCash !== undefined ? quiz.additionalCash : 0;
			let CurrentVaLoan = quiz.CurrentVaLoan !== undefined ? quiz.CurrentVaLoan : false;

			let refinanceCall = "https://stagesitecore.jgwentworth.com/api/mortgage/refinance?"
				refinanceCall += "additionalCash=" + additionalCash;
				refinanceCall += "&LoanPurpose=" + quizType;
				refinanceCall += "&creditScore=" + quiz.creditScore;
				refinanceCall += "&currentMortgageAmount=" + quiz.currentMortgageAmount;
				refinanceCall += "&homeType=" + quiz.homeType;
				refinanceCall += "&homeUse=" + quiz.homeUse;
				refinanceCall += "&homeValue=" + quiz.homeValue;
				refinanceCall += "&serviceMember=" + quiz.ServiceMember;
				refinanceCall += "&currentVaLoan=" + CurrentVaLoan;
				refinanceCall += "&state=" + quiz.State;
				refinanceCall += "&zip_Code=" + quiz.ZipCode;

			return refinanceCall;
		}
	},

	mergeObjs: function(obj1, obj2) {
		//https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
		function extend(obj, src) {
		    for (var key in src) {
		        if (src.hasOwnProperty(key)) obj[key] = src[key];
		    }
		    return obj;
		}

		let merge = extend(obj1, obj2);
		return merge;
	},

	flatten: function(data) {
		//http://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
	    var result = {};
	    function recurse (cur, prop) {
	        if (Object(cur) !== cur) {
	            result[prop] = cur;
	        } else if (Array.isArray(cur)) {
	             for(var i=0, l=cur.length; i<l; i++)
	                 recurse(cur[i], prop + "[" + i + "]");
	            if (l == 0)
	                result[prop] = [];
	        } else {
	            var isEmpty = true;
	            for (var p in cur) {
	                isEmpty = false;
	                recurse(cur[p], prop ? prop+"."+p : p);
	            }
	            if (isEmpty && prop)
	                result[prop] = {};
	        }
	    }
	    recurse(data, "");
	    return result;
	},

	editKey(obj, oldKey, newKey) {
		if (oldKey !== newKey) {
		    Object.defineProperty(obj, newKey,
		        Object.getOwnPropertyDescriptor(obj, oldKey));
		    delete obj[oldKey];
		}
	}
}