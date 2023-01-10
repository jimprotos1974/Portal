export let calculation = {
  extra: {
    path: 'rating',
    func: function (calculator: any, rule: any, params: any, meta: any) {
      let price = params.form.control.get('price').value || 0,
        discount = params.form.control.get('discountPercentage').value || 0;

      params.form.control.patchValue({
        "rating": price * (1 - (discount * 0.01))
      });
    },
    dependencies: ['price', 'discountPercentage'],
  },
}