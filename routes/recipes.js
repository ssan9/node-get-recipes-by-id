var recipes = require('../recipes.json');
var router = require('express').Router();

let array = [];

function findCommonElement(array1, array2) {
  console.log('funcarray1', array1, 'array2', array2);
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++ ) {
      if (array1[i] === array2[j]) {
        console.log('yppp');
        console.log('arry[i]', array[i], array[j]);
        array.push(array1[i]);
      }
    }
  }
}

const Recipes = {
	getById: recipeId => {
    let { ids } = recipeId;
    const recipeList = recipes.filter(recipe => { // filter if recipe id and ids are equal
      console.log('recipe', recipe.id, recipeId);
      // recipe.id == ids
      return recipeId.indexOf(recipe.id) > -1;
    });
    console.log('recipeList', recipeList);

    let ingredients = [];
    // function iterateRecipeList() {
      for (recipe in recipeList) {    // return object of ingredient items from recipelIst
        console.log('recipeeeeee', recipeList[recipe].ingredients);
         // iterateRecipeList(recipeList[recipe].ingredients);
         ingredients.push(recipeList[recipe].ingredients);
      }
    // }
    // iterateRecipeList();
    // return recipeList[1].ingredients;
    return ingredients;
	}
}

router.get('/shopping-list', (req, res) => {
    const {query:{ids=null}} = req;

    if (!ids) {
      return res.status(400).end();
    }

    const arr = [];
    

    const recipeId = recipes.forEach(recipe => {
      // if (recipe.id == req.query.ids) {
      //   arr.push(recipe.id);
    // }
        arr.push(recipe.id);
    });

    // const arrayList = arr.map(newArray => newArray.toString());
    const arrayList = arr.map(String);
    console.log('req.query', ids);
        console.log('arrayList',arrayList);

    const idsList = [];
    const query = ids.split(',');
    const queryId = query.forEach(id => {
      idsList.push(id);
    });

        console.log('arr', arr);


    console.log('ids', idsList);

    findCommonElement(arrayList, idsList);
    console.log('array', array);

    // if (arr == queryId) {
      console.log('lent', !array.length);
    if (array.length) {
      console.log('hi');
      // if (queryId) {
        return res.json(Recipes.getById(array));
    }
    else {
      return res.status(404).json('NOT_FOUND');
    } 
    
    // else {
    //   res.status(404).json('NOT_FOUND');
    // }
});

module.exports = router;


