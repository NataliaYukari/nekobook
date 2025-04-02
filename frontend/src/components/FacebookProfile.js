import React, { useEffect } from "react";
import "./FacebookProfile.css";
import { useState } from 'react';

export default function FacebookProfile() {
  const [post, setPost] = useState()
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts");
        const data = await response.json();
        setPostList(data);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, []);

  let handlePost = (e) => {
    setPost(e.target.value)
  }

  let sendPost = async () => {
    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post })
      });

      if (!response.ok) throw new Error("Erro ao enviar post");

      setPostList([...postList, post]); // Atualiza a lista no React
      setPost('');
  } catch (error) {
      console.error("Erro ao enviar post:", error);
  }

    }

  let loadPosts = () => {
    let tags = []

    postList.forEach((value, index) => {
      tags.push(
        <div className="post">
          <div className="post-header">           
            <div>
              <div className="user-name">Mochi</div>
              <div className="post-time">1 day ago</div>
            </div>
          </div>
          <p>{value}</p>
        </div>
      )          
    })

    return tags.reverse()
  }

  return (
    <div className="facebook-profile">
      {/* Cover Photo */}
      <div className="cover-photo">
        <img
          src="cat_wallpaper.jpg"
          alt="Cover"
        />
        <div className="profile-info">
          <img
            src="mochi_profilepic.jpeg"
            alt="Profile"
            className="profile-picture small-profile"
          />
          <div className="profile-name">Mochi</div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <div>Posts</div>
        <div>About</div>
        <div>Friends</div>
        <div>Photos</div>
        <div>More</div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        {/* Left Column */}
        <div className="left-column">
          <div className="intro-box">
            <h2>Intro</h2>
            <p>1.5 years old</p>
            <p>Lives comfortably near Londrina</p>
            <p>Loves Churu, cuddles and to nag his sister</p>
            <p>#LegalizeCatnip</p>
          </div>
          <div className="photos-box">
            <h2>Photos</h2>
            <div className="photo-grid">
              <img src="mochi_pic1.jpeg" alt="Two cats laying side by side" />
              <img src="mochi_pic2.jpeg" alt="Cat on a tree" />
              <img src="mochi_pic3.jpeg" alt="Cat half hiding in a bag" />  
            </div>
          </div>
        </div>

        {/* Right Column - Posts */}
        <div className="right-column">
          <div className="post-box">
            <textarea placeholder="What's on your mind, Mochi?" onChange={handlePost} value={post}></textarea>
            <button onClick={sendPost}>Post</button>
          </div>

          <div className="posts">

            {loadPosts()}

            <div className="post">
              <div className="post-header">
                <img
                  src="mochi_profilepic.jpeg"
                  alt="Mochi's profile picture"
                />
                <div>
                  <div className="user-name">Mochi</div>
                  <div className="post-time">2 hrs ago</div>
                </div>
              </div>
              <p>Mom says my face is very pretty and you all should see ^U^</p>
              <img
                src="mochi_feedpic2.jpeg"
                alt="Pretty kitty face"
              />
            </div>

            <div className="post">
              <div className="post-header">
                <img
                  src="mochi_profilepic.jpeg"
                  alt="Mochi's profile picture"
                />
                <div>
                  <div className="user-name">Mochi</div>
                  <div className="post-time">1 day ago</div>
                </div>
              </div>
              <p>Napping after a long day of work!</p>
              <img
                src="mochi_feedpic1.jpeg"
                alt="Cat napping"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
