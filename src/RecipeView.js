import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import Accordion from 'react-bootstrap/Accordion';
import {Button,Card,Toggle} from 'react-bootstrap';
import FbImageLibrary from 'react-fb-image-grid';


const RecipeView = (props) => { 
    var IMAGES = [];
    const userId = props.location.state.id;
    var selectedRecipe = JSON.parse(localStorage.getItem("recipeCollection")).find(function(recipe){
       return  recipe.id === parseInt(userId);
    });
    console.log("selectedRecipe",selectedRecipe)
    var ingredients = selectedRecipe.steps[0].ingredient,descriptionSteps=[];
    selectedRecipe.steps.forEach(element => {
         descriptionSteps.push(element.description);
         IMAGES.push(element.imgUrl);
    });
    return (
        <>
       <div className="header">
        <Link to={{pathname: `/editDesc`, state:{editRecipe:selectedRecipe}}}>
           <button className="btn" style={{float:'right',marginRight:10 +'px',marginTop:8+'px',backgroundColor: '#ffffff',border: 1 + 'px solid #d5dadf'}} >Edit</button>
        </Link>   
       </div>
       return ([
<form className="form-horizontal" style={{marginLeft:14 +'%',marginTop: 4 + '%',marginRight: 2 +'%'}}>
    <div className="row" style={{marginLeft:0 +'%'}}>
    <div className="form-group col-md-4 col">
      <div style={{height:'auto',width:90+'%',border:1 +'px solid #bcc7d0'}}>
        <FbImageLibrary images={IMAGES} countFrom={2}/>
    </div>
    </div>
    <div className="form-group col-md-6 col">
      <h5>User Name : <span className="font_color">{selectedRecipe.username}</span></h5>
      <h5>Recipe Title : <span className="font_color">{selectedRecipe.dishname}</span></h5>
      {selectedRecipe.steps[0].videoLink?(<h5>Video Link :  <a href={selectedRecipe.steps[0].videoLink}>{selectedRecipe.steps[0].videoLink}</a></h5>):''}
      <h5>Description :
      <span style={{width:600+'px',wordBreak:'break-word'}} className="font_color">{selectedRecipe.description}.</span>
      </h5>
    </div>
    </div>
    <div>
    <Accordion defaultActiveKey="0">
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
          Ingredient
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
          <ul>
      {ingredients.split("\n").map(function(ing){
          return (
              <li>{ing}</li>
          )
      })}
      </ul>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
    </div>
    <div>
    <Accordion defaultActiveKey="1">
  <Card style={{borderBottom:1 + 'px solid rgba(0,0,0,.125'}}>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="1">
          Description steps
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
       
      <Card.Body>
            <ol>
      {descriptionSteps.map(function(step){
          return (
              <li>{step}</li>
          );
      })}
      </ol>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
    </div>
    
</form>
])  
       </>
    );
};

export default RecipeView;