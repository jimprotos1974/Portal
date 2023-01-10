export let validation = {
	"rating" : {
		segments : ['rating'],
		path     : 'rating',
		rules    : [{
			text  : '"Rating" Error.',
			level : 'error',
			func  : function(validator: any, rule: any, params: any, meta: any){
				let rating = params.form.control.get('rating').value || 0;

        console.log(rating + ': Rating should be greater than 100.');
				
				return {
					valid : (rating >= 100),
					text  : 'Rating should be greater than 100.'
				}
			},
      dependencies : ['price', 'discountPercentage']
		}
  ]
	},
	};