/*
*  api.js
*
*  Работа с внешними API
*/
const apiMixin = {

  // DATA 
  data: () => ({
    api: 'http://localhost:3000/api'
  }),

  // METHODS
  methods: {


    /**
    * Сделать запрос (vue resource)
    *
    * @param {String} url      адрес
    * @param {String} method   метод
    * @param {Object} postData данные
    * @param {Object} options  доп. опции 
    * @return {Promise} ответ
    */
    sendRequest(url = '/', method = 'get', postData = {}, options = {}) {
      return this.$http[method](url, postData)

                .then(response => (response))

                .catch(console.log);
    },

    /**
    * Сделать запрос (fetch)
    *
    * @param {String} url      адрес
    * @param {String} method   метод
    * @param {Object} postData данные
    * @return {Promise} ответ
    */
    sendRequestFetch(url = '/', method = 'GET', postData = {}) {
     let options = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {'content-type': 'application/json'}
        // headers: {'content-type': 'application/x-www-form-urlencoded'}
      }

      return fetch(url, options)
    }
  },

  // LIFECYCLE HOOKS
  created: function () {
  //  console.log('вызван хук примеси')
  //  console.log(this.$cookie.get('test'))  // GET cookie - can be passed from server and set as current language
  }
}

export default apiMixin
