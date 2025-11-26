import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyApEm2xwo8vCY82d9351GIfi31LLKkw7QM",
  authDomain: "simple-form-17a09.firebaseapp.com",
  projectId: "simple-form-17a09",
  storageBucket: "simple-form-17a09.appspot.com", 
  messagingSenderId: "399962811953",
  appId: "1:399962811953:web:9bf86c3067b8fc5d322f10"
}; 


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const register = document.getElementById("register");

function isValidEmail(email){
  const validemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return validemail.test(email)
}

function isValidPhone(phone){
  const validphone = /^\+251\d{9}$/
  return validphone.test(phone)
}

function isValidname(name){
  const validname = /^[A-Za-z]+([ '\-][A-Za-z]+)*$/
  return validname.test(name)
}

register.addEventListener("click", (e) => {
  e.preventDefault();
  
  const firstname = document.getElementById("fname").value;
  const lastname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const department = document.getElementById("department").value;
  const imageFile = document.getElementById("u-image").value;
  const password = document.getElementById("password").value;


   if (!firstname || !lastname || !email || !password) {
    alert("Please fill in all required fields.");
    return;
  }
  if(!isValidEmail(email)){
    alert("please enter a valid email address.")
    return
  }

  if(!isValidPhone(phone)){
    alert("please enter a valid phone number.")
    return
  }
  if(!isValidname(firstname) || !isValidname(lastname)){
    alert("please enter a valid name.")
    return
  }


  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user; 

      setDoc(doc(db, "users", user.uid), {
        email,
        firstname,
        lastname,
        phone,
        department,
        imageFile
      }) 
      .then(() => {
        alert("you succesfully got registered")
        window.location.href = "main.html";
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
