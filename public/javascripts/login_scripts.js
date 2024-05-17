let userName = document.getElementById("username");
let password = document.getElementById("password");
let eyeL = document.querySelector(".eyeball-l");
let eyeR = document.querySelector(".eyeball-r");
let handL = document.querySelector(".hand-l");
let handR = document.querySelector(".hand-r");

let normalEye = () => {
	eyeL.style.cssText = `
    left:10px;
    top:10px;
    `;

	eyeR.style.cssText = `
    right:10px;
    top:10px;
    `;
};

let normalHand = () => {
	handL.style.cssText = `
    height: 45px;
    top: 125px;
    left:120px ;
    transform: rotate(0deg);
    `;
	handR.style.cssText = `
    height: 45px;
    top: 125px;
    right:120px ;
    transform: rotate(0deg);
    `;
};

// when clicked on username
userName.addEventListener("click", () => {
	eyeL.style.cssText = `
    left:18px;
    top:20px;
    `;

	eyeR.style.cssText = `
    left:5px;
    top:20px;
    `;
	normalHand();
});

//when clicked on password

password.addEventListener("click", () => {
	handL.style.cssText = `
    height: 105px;
    top: 50px;
    left:200px ;
    transform: rotate(-130deg);
    `;
	handR.style.cssText = `
    height: 105px;
    top: 50px;
    right:200px ;
    transform: rotate(130deg);
    `;
	normalEye();
});

// when cicked outside

document.addEventListener("click", (value) => {
	let clickedElement = value.target;
	if (clickedElement != userName && clickedElement != password) {
		normalEye();
		normalHand();
	}
});
