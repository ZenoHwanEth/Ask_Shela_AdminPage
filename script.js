var firebaseConfig = {
    apiKey: "AIzaSyAgwbw9Pr8U8P4wuFPh5pXYLQTwa8bvc1U",
    authDomain: "askshela-4e0e2.firebaseapp.com",
    databaseURL: "https://askshela-4e0e2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "askshela-4e0e2",
    storageBucket: "askshela-4e0e2.appspot.com",
    messagingSenderId: "585895616708",
    appId: "1:585895616708:web:fce980e7f3df5a10a72991",
    measurementId: "G-9FTLSQTYSS"
};


firebase.initializeApp(firebaseConfig);

var imageStorage = firebase.storage().ref().child('AskShela_resources');
var database = firebase.database().ref();

(async()=>{
    
    await database.child("newstudentpadletlink").get().then((snapshot) =>{
        document.getElementById("padlet-new-student-link").value = snapshot.val()
    })

    await database.child("potentialstudentpadletlink").get().then((snapshot) =>{
        document.getElementById("padlet-potential-student-link").value = snapshot.val()
    })

})()

async function updatelink(path,link,status,disableinput){
    value = document.getElementById(path).value;

    if(/^https:/.test(value)){
        firebase.database().ref(link).set(value);
        await database.child(link).get().then((snapshot) =>{
            document.getElementById(disableinput).value = snapshot.val()
        })
        document.getElementById(path).value = ""
        document.getElementById(status).innerHTML="Done!!"    
    }else if(value!=""){
        alert("Make sure it is in https:/ !!");
    }
    
}


var span = document.getElementsByClassName("close_modal")[0];
span.onclick = function() {
    document.getElementById("enlarge_modal").style.display = "none";
} 

async function viewImage(imagename){
    var enlarge_modal = document.getElementById("enlarge_modal");
    var enlarge_img = document.getElementById("enlarge_img");
    enlarge_img.src="";
    enlarge_modal.style.display = "block";
    var imagepath;
    await imageStorage.child(imagename).getDownloadURL().then(
        (url)=> {
            imagepath = url
        }
    ).catch((error) =>{
        console.log(error)
    });
    enlarge_img.src =imagepath;
}

function browseFile(previewlocation,inputlocation){
  const preview = document.getElementById(previewlocation);
  const file = document.getElementById(inputlocation).files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    // convert image file to base64 string
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

function clearitem(previewlocation,inputlocation){
    document.getElementById(inputlocation).value='';
    document.getElementById(previewlocation).src='';
}

function updateImage(imagename,previewlocation,inputlocation,upprogress){

    if(document.getElementById(inputlocation).files[0] != null){
        var uploadtask = firebase.storage().ref('AskShela_resources/'+imagename).put(document.getElementById(inputlocation).files[0])

        uploadtask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred/snapshot.totalBytes)* 100;
            document.getElementById(upprogress).innerHTML = 'Upload '+ (progress).toFixed(2)+' %';
    
            if(progress==100){
                document.getElementById(inputlocation).value='';
                document.getElementById(previewlocation).src='';
                document.getElementById(upprogress).innerHTML += ' Done';
            }
        });
    }
    else{
        document.getElementById(upprogress).innerHTML="no image selected"
    }
}

var pdfStorage = firebase.storage().ref().child('AskShela_pdf');

function browseFile(previewlocation,inputlocation){
    const preview = document.getElementById(previewlocation);
    const file = document.getElementById(inputlocation).files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      preview.src = reader.result;
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
}

function clearpdf(previewlocation,inputlocation){
    document.getElementById(inputlocation).value='';
    document.getElementById(previewlocation).src='data:text/html;charset=utf-8,%3Chtml%3E%3Cbody%3eEmpty Pdf%3C/body%3E%3C/html%3E';

}

function updatePdf(pdfname,previewlocation,inputlocation,upprogress){

    if(document.getElementById(inputlocation).files[0] != null){
        var uploadtask = firebase.storage().ref('AskShela_pdf/'+pdfname).put(document.getElementById(inputlocation).files[0])

        uploadtask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred/snapshot.totalBytes)* 100;
            document.getElementById(upprogress).innerHTML = 'Upload '+ (progress).toFixed(2)+' %';
    
            if(progress==100){
                document.getElementById(inputlocation).value='';
                document.getElementById(previewlocation).src='data:text/html;charset=utf-8,%3Chtml%3E%3Cbody%3eEmpty Pdf%3C/body%3E%3C/html%3E';
                document.getElementById(upprogress).innerHTML += ' Done';
            }
        });
    }
    else{
        document.getElementById(upprogress).innerHTML="no pdf selected"
    }
}