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


const blogSection = document.querySelector('.blogs-section');


db.collection('blogs').get().then((blogs) => {
    blogs.forEach(blog => {
       if(blog.id != decodeURI(location.pathname.split('/').pop())){
        createBlog(blog);
       }
    });
});

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
            <img src="${data.bannerImage}" class="blog-image" alt="blog-image">
            <h1 class="blog-title">${data.title.substring(0,100) + '...'}</h1>
            <p class="blog-overview">
             ${data.article.substring(0,200) + '...'}
            </p>
            <a href="/${blog.id}" class="btn dark">read</a>
        </div>
    `;
}