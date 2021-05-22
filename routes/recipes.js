const { map } = require('../app');
var recipes = require('../recipes.json');
var router = require('express').Router();

const generateRecipesMapper = ()=>{
  const map = new Map();
  for(const recipe of recipes){
    map.set(recipe.id,recipe);
  }
  return map;
}

const Recipes = {
	getById: ids => {
      const recipesAsPerId = generateRecipesMapper()
	    const selectedRecipes = [];
      for(const id of ids){
        if(recipesAsPerId.has(parseInt(id))){
          selectedRecipes.push(recipesAsPerId.get(parseInt(id)));
        }
      }
      return selectedRecipes;
  	},
  getIngredientsFromRecipes: (selectedRecipes)=>{
    return selectedRecipes.map(x=>x.ingredients).flat();
  }
}

router.get('/shopping-list', (req, res) => {
  const {query:{ids=null}} = req;
  if(!ids){
    return res.status(400).end();
  }
  const selectedRecipes = Recipes.getById(ids.split(','));
  if(selectedRecipes.length>0){
    return res.json(Recipes.getIngredientsFromRecipes(selectedRecipes));
  }
  else{
    return res.status(404).send(
      'NOT_FOUND');
  }
});

module.exports = router;


