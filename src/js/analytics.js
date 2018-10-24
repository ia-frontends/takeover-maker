const analytics = (() => {
  return {
    clickHit: () => dataLayer.push({
      'event':
        'promotionClick',
        'ecommerce': {
          'promoClick': {
            'promotions': [{
              'id': 'TO-Depredador-200918',
              'name': 'El Depredador TO',
              'creative': 'TakeOver',
            }]
          }
        }
    }),

    viewHit: () => dataLayer.push({
      'event':
        'promotionView',
        'ecommerce': {
          'promoView': {
            'promotions': [{
              'id': 'TO-Depredador-200918',
              'name': 'El Depredador TO',
              'creative': 'TakeOver',
            }]
          }
        }
    })
  }
})();

export default analytics;