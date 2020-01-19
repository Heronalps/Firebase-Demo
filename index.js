// Your web app's Firebase configuration
var firebaseConfig = {
    
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  let auth = firebase.auth();
  let database = firebase.database();
  let storage = firebase.storage();


  function loginToGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
  }

  function signOut() {
      auth.signOut();
  }

  function afterLogin(user) {
      if (user) {
          console.log("User " + user.displayName + " has logged in!")
          console.log("User id : " + user.uid);
      }
  }

  auth.onAuthStateChanged(afterLogin);

  function addNameToDatabase() {
      let data = {
          "people" : "Michael Zhang"
      }
      database.ref("/").set({"person" : auth.currentUser.displayName})
      database.ref("/").update(data)
      database.ref("/people").remove();
  }

  function pushToDatabase(value) {
      database.ref("/push").push(value);
  }

  function readFromDatabase() {
      database.ref("people").once("value", function(snapshot){
        document.getElementById("database-value").innerHTML = snapshot.val();
        console.log(snapshot.val())
      });
  }

  function uploadFile() {
      let fileUpload = document.getElementById("file-upload");
      let file = fileUpload.files[0];

      storage.ref("/files/file.pdf").put(file).then(function(snapshot) {
        storage.ref("/files/file.pdf").getDownloadURL().then(function(url) {
            console.log(url);
        })  
      });
  }