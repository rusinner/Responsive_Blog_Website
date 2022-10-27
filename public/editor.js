
const firebaseConfig = {
    apiKey: "AIzaSyAD6uBiUiAQ8F7GXBjsOYFpLCH-1sTtBH4",
    authDomain: "blogging-project-d56c6.firebaseapp.com",
    projectId: "blogging-project-d56c6",
    storageBucket: "blogging-project-d56c6.appspot.com",
    messagingSenderId: "162818225689",
    appId: "1:162818225689:web:e4f2ac95149581d52b9c88"
  };
   const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  let db = firebaseApp.firestore();


const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');

//banner

const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector('.banner');
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change',() => {
    uploadImage(bannerImage,'banner');
});

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput,'image');
});

const  uploadImage =  (uploadFile , uploadType) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes('image')){
        const formdata = new FormData();
        formdata.append('image' , file);

      fetch  ('./upload' , {
            method: 'post',
            body:formdata
            })
            .then(res => res.json())
            .then(data => {
                if(uploadType == 'image'){
                 addImage(data ,file.name); 
                }else{
                    bannerPath = `${location.origin}/${data}`;
                    banner.style.backgroundImage = `url('${bannerPath}')`;
                }
            
        });
    }else{
        alert('upload image only');
    }
}

const addImage = (imagepath,alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert +
    articleField.value.slice(curPos);
}

let months = ['Jan','Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

publishBtn.addEventListener('click',() => {
    if(articleField.value.length && blogTitleField.value.length){
        //genarate id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(' ').join( '-');
        let id = '';
        for (let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        //setting up doc name
        let docName = `${blogTitle}-${id}`;
        let date = new Date(); // for published at info

        //acess firestore with db variable
        db.collection('blogs').doc(docName).set({
            title:blogTitleField.value,
            article:articleField.value,
            bannerImage:bannerPath,
            publishedAt:`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
        })
        .then(() => {
            location.href = `/${docName}`;
        })
        .catch((err) => {
            console.error(err); 
        })

    }
});