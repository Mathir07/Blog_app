import Post from "../components/Post";
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchPosts = async () => {
        const response = await axios.get('http://localhost:8000/api/posts')
        setPosts(response.data);
    }

	const fetchCategories = async () => {
        const response = await axios.get('http://localhost:8000/api/categories')
        setCategories(response.data);
    }


    useEffect(() => {
        fetchPosts();
		fetchCategories();
    }, [])



    return <>

	<main>
		<div class="container mt-4">
			<div class="row">
				<div class="col-lg-8">
					<h1 class="mb-4">Latest Posts</h1>
                    {
                        posts.length > 0 ? posts.map((post) => <Post post={post} />) : <h4>No posts available</h4>
                    }
				</div>
				<div class="col-lg-4">
					<div class="card mb-4">
						<div class="card-body">
							<h5 class="card-title">About Me</h5>
							<p class="card-text"><p>👋 Hi, I'm a B.E. Computer Science and Engineering student passionate about software development. Currently, I'm working on developing a blog application 📝, where I aim to create a platform for sharing ideas and thoughts easily.</p>

                            <p>💻 I'm building the blog app using technologies like React for the frontend ⚛️ and Node.js for the backend 🚀. This project is helping me to enhance my web development skills and explore new frameworks 🚧.</p>
                            </p>
						</div>
					</div>

					<div class="card mb-4">
						<div class="card-body">
							<h5 class="card-title">Categories</h5>
							<ul class="list-group">
								{categories.map(category => <li class="list-group-item"><Link to={`/posts/category/${category._id}`} class="text-black">{category.name}</Link></li>)}
							</ul>
						</div>
					</div>
				</div>
			</div>
        </div>
	</main>

    </>
}