const addInfo = (res) => {
  const gallery = document.querySelector(".profile");
  let html = "";
    html += `

    
        <div class="profile-image">
            <img src="${res.profile_image.medium}" alt="">
        </div>
        <div class="profile-user-settings">
           <h1 class="profile-user-name">${res.username}</h1>
            <button class="btn profile-edit-btn" onclick="show(this)" value="5">Edit Profile</button>
            <button class="btn profile-settings-btn" aria-label="profile settings"><i class="fas fa-cog" aria-hidden="true"></i></button>
        </div>

        <div class="profile-stats">

            <ul>
                <li><span class="profile-stat-count">${res.total_photos}</span> posts</li>
                <li><span class="profile-stat-count">${res.followers_count}</span> followers</li>
                <li><span class="profile-stat-count">${res.following_count}</span> following</li>
            </ul>

        </div>

        <div class="profile-bio">
            <p><span class="profile-real-name">Jane Doe</span>${res.bio}</p>
        </div>  


    `;
  gallery.innerHTML = html;
};

const callAPI = async (username) => {
  try {
    console.log("Username --> ", username);
    const response = await fetch("/api/searchUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const res = await response.json();
    //check response return from our API
    console.log("response ----> ", res);
//6. Add images to gallery
    addInfo(res);
  } catch (error) {
    console.log("message error --->", error);
  }
};
const photo = (res) => {
  const photo = document.querySelector(".gallery");
  let html = "";
  res.forEach((element) => {
    html += `
  
			<div class="gallery-item" tabindex="0">
			<img src="${element.urls.full}" class="gallery-image" alt="">
				<div class="gallery-item-info">

					<ul>
						<li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i>${element.likes}</li>
						<li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 2</li>
					</ul>

				</div>

            </div>
          

    `;
      });
  photo.innerHTML = html;
};

const callphoto = async (username) => {
  try {
    console.log("Username --> ", username);
    const response = await fetch("/api/Photo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const res = await response.json();
    //check response return from our API
    console.log("response ----> ", res);
//6. Add images to gallery
    photo(res);
  } catch (error) {
    console.log("message error --->", error);
  }
};



const main = () => {
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username')
console.log(username);
if(urlParams.has('username')){
    callAPI(username);
  callphoto(username);
}
else{
    console.log("Plase input username");
}

//console.log(queryString);
};



main();