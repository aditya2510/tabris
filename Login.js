const {
  Action,Page,Button, CheckBox, Composite, TextView, TextInput, Picker, RadioButton, ScrollView, Slider, Switch, ui,ImageView,NavigationView
} = require('tabris');

const  constants = require('./constants');
const BooksPageSelector = require('./BooksPageSelector');
const AboutPage = require('./AboutPage');
const ABOUT_ACTION_TITLE = 'About';


let navigationView = new NavigationView({
 left: 0, top: 0, right: 0, bottom: 0
}).appendTo(ui.contentView);

// Create a main page and add it to the navigation
//view
let mainPage = new Page({
 title: 'Main Page'
}).on('appear',validateLocalDB).appendTo(navigationView);


//TODO: Remove Hard coding and put percentage for image
let logo = new ImageView({
    left: 30,top:50,
    image: 'http://lms.tugbiz.com/css/images/tugbiz.png',
	alignment:"center",
    background: '#aaaaaa',
    scaleMode: "auto"
  }).appendTo(mainPage);
  
 let textView = new TextView({
  left: 16, top: 200,
  text: 'Login Id:'
}).appendTo(mainPage);

new TextInput({
  left: [textView, 16], right: 16, baseline: textView,
  message: 'Enter Login Id'
}).appendTo(mainPage);


 let textView2 = new TextView({
  left: 16, top: 250,
  text: 'Password:'
}).appendTo(mainPage);

new TextInput({
  left: [textView2, 16], right: 16, baseline: textView2,
  message: 'Enter Password',
  type: 'password' 
}).appendTo(mainPage);


new Button({
  id: 'reservationButton',
  text: 'Login',
  background: '#8b0000',
  textColor: 'white',
  top: 320,
}).on('select', login).appendTo(mainPage);

function validateLocalDB2(){
	console.log("Redirect");
	
			navigationView = new NavigationView({
			left: 0, top: 0, right: 0, bottom: 0,
			drawerActionVisible: true
			}).appendTo(ui.contentView);

			ui.drawer.enabled = true;
			ui.drawer.append(
			  new BooksPageSelector({
				left: 0, top: 16, right: 0, bottom: 0
			  })
			);

			new Action({
			  id: 'aboutAction',
			  title: ABOUT_ACTION_TITLE,
			  placementPriority: 'high',
			  image:  {
				src: device.platform === 'iOS' ? 'images/about-black-24dp@3x.png' : 'images/about-white-24dp@3x.png',
				scale: 3
			  }
			}).on('select', () => new AboutPage().appendTo(navigationView))
			  .appendTo(navigationView);
	
	
}

function validateLocalDB(){
	//check local userid and password
	//validateLocalDB2();
}


function login(){
	var body = { user:"rathi.aditya@gmail.com",password:"test"};
fetch(constants.loginURL, { 
    method: 'POST',
    body:    JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
})
    .then(res => res.json())
   .then(function(res) {
		
		console.log(res);
		validateLocalDB2();
		
	});
}