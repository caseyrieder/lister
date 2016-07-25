// need to go into XCode to make API calls possible
// by default, you cant just call any old web service & expect it to work...
// ... SO ...
// IN XCode-->
    // Info.plist-->
          // App Transport Security Settings-->
            // "Exception Domains" (cross out Exception Domains)...
            // ... replace with "Allow Arbitrary Loads" : Boolean: "YES"

class Api {
  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Mashape-Key': 'UH6VTfWIwZmshGdOgexo2pW2NWAEp11vGC6jsnkELql2fDf41y',
    }
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST')
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE')
  }

  static xhr(route, params, verb) {
    const host = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com'
    const url = `${host}${route}`
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    options.headers = Api.headers()
    return fetch(url, options).then( resp => {
      let json = resp.json();
      if (resp.ok) {
        return json;
      }
      return json.then(err => {throw err});
    });
  }
}
export default Api
